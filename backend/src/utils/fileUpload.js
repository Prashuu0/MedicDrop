const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration for local storage
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    // Create different folders based on file type
    if (file.fieldname === 'prescription') {
      uploadPath += 'prescriptions/';
    } else if (file.fieldname === 'avatar') {
      uploadPath += 'avatars/';
    } else if (file.fieldname === 'medicine') {
      uploadPath += 'medicines/';
    } else if (file.fieldname === 'documents') {
      uploadPath += 'documents/';
    } else {
      uploadPath += 'misc/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Multer memory storage for Cloudinary upload
const memoryStorage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types based on field name
  const allowedTypes = {
    prescription: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
    avatar: ['image/jpeg', 'image/jpg', 'image/png'],
    medicine: ['image/jpeg', 'image/jpg', 'image/png'],
    documents: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
    deliveryProof: ['image/jpeg', 'image/jpg', 'image/png']
  };
  
  const fieldAllowedTypes = allowedTypes[file.fieldname] || allowedTypes.documents;
  
  if (fieldAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${fieldAllowedTypes.join(', ')}`), false);
  }
};

// Multer configuration for local upload
const uploadLocal = multer({
  storage: localStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

// Multer configuration for Cloudinary upload
const uploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

// Upload single file to Cloudinary
const uploadToCloudinary = async (file, folder = 'medicdrop') => {
  try {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      };
      
      // For prescription images, apply OCR-friendly transformations
      if (folder.includes('prescription')) {
        uploadOptions.transformation = [
          { quality: 'auto:best' },
          { fetch_format: 'auto' },
          { flags: 'progressive' }
        ];
      }
      
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
              originalName: file.originalname,
              size: result.bytes,
              format: result.format
            });
          }
        }
      );
      
      uploadStream.end(file.buffer);
    });
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// Upload multiple files to Cloudinary
const uploadMultipleToCloudinary = async (files, folder = 'medicdrop') => {
  try {
    const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    throw new Error(`Multiple file upload failed: ${error.message}`);
  }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};

// Delete multiple files from Cloudinary
const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    throw new Error(`Multiple file deletion failed: ${error.message}`);
  }
};

// Middleware for single file upload
const uploadSingle = (fieldName, folder) => {
  return async (req, res, next) => {
    const upload = uploadMemory.single(fieldName);
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }
      
      try {
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(req.file, folder);
        req.uploadedFile = cloudinaryResult;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
    });
  };
};

// Middleware for multiple file upload
const uploadMultiple = (fieldName, maxCount, folder) => {
  return async (req, res, next) => {
    const upload = uploadMemory.array(fieldName, maxCount);
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }
      
      try {
        // Upload to Cloudinary
        const cloudinaryResults = await uploadMultipleToCloudinary(req.files, folder);
        req.uploadedFiles = cloudinaryResults;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
    });
  };
};

// Middleware for mixed file upload (multiple fields)
const uploadFields = (fields, folder) => {
  return async (req, res, next) => {
    const upload = uploadMemory.fields(fields);
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      try {
        const uploadedFiles = {};
        
        // Process each field
        for (const field of fields) {
          const fieldFiles = req.files[field.name];
          if (fieldFiles && fieldFiles.length > 0) {
            if (field.maxCount === 1) {
              // Single file
              uploadedFiles[field.name] = await uploadToCloudinary(fieldFiles[0], folder);
            } else {
              // Multiple files
              uploadedFiles[field.name] = await uploadMultipleToCloudinary(fieldFiles, folder);
            }
          }
        }
        
        req.uploadedFiles = uploadedFiles;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
    });
  };
};

// Generate signed URL for secure file access
const generateSignedUrl = (publicId, options = {}) => {
  try {
    return cloudinary.utils.private_download_url(publicId, 'jpg', {
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
      ...options
    });
  } catch (error) {
    throw new Error(`Signed URL generation failed: ${error.message}`);
  }
};

// Optimize image for web display
const optimizeImage = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    width: 800,
    height: 600,
    crop: 'limit'
  };
  
  return cloudinary.utils.url(publicId, {
    ...defaultOptions,
    ...options
  });
};

// Generate thumbnail
const generateThumbnail = (publicId, width = 150, height = 150) => {
  return cloudinary.utils.url(publicId, {
    width: width,
    height: height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  });
};

module.exports = {
  uploadLocal,
  uploadMemory,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  generateSignedUrl,
  optimizeImage,
  generateThumbnail
};
