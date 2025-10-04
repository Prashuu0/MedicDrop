#!/bin/bash

# 🏥 MedicDrop Setup Script
# Complete setup script for the MedicDrop healthcare platform

echo "🏥 Welcome to MedicDrop Setup!"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 16 or higher
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -ge 16 ]; then
            print_status "Node.js version is compatible (16+)"
        else
            print_error "Node.js version 16 or higher is required. Current version: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 16 or higher."
        exit 1
    fi
}

# Check if MongoDB is running
check_mongodb() {
    if command -v mongod &> /dev/null; then
        print_info "MongoDB is installed"
        
        # Try to connect to MongoDB
        if mongosh --eval "db.runCommand('ping')" &> /dev/null; then
            print_status "MongoDB is running"
        else
            print_warning "MongoDB is not running. Please start MongoDB before continuing."
            print_info "To start MongoDB: mongod"
        fi
    else
        print_warning "MongoDB is not installed. Please install MongoDB."
        print_info "Installation guide: https://docs.mongodb.com/manual/installation/"
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Install root dependencies
    print_info "Installing root dependencies..."
    npm install
    
    # Install backend dependencies
    print_info "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    # Install frontend dependencies
    print_info "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_status "All dependencies installed successfully!"
}

# Setup environment files
setup_environment() {
    print_info "Setting up environment files..."
    
    # Copy environment examples
    if [ ! -f .env ]; then
        cp env.example .env
        print_status "Created .env file"
    else
        print_warning ".env file already exists"
    fi
    
    if [ ! -f backend/.env ]; then
        cp backend/env.example backend/.env
        print_status "Created backend/.env file"
    else
        print_warning "backend/.env file already exists"
    fi
    
    if [ ! -f frontend/.env ]; then
        cp frontend/env.example frontend/.env
        print_status "Created frontend/.env file"
    else
        print_warning "frontend/.env file already exists"
    fi
    
    print_warning "Please update the environment files with your actual API keys and configuration."
}

# Create necessary directories
create_directories() {
    print_info "Creating necessary directories..."
    
    # Backend directories
    mkdir -p backend/uploads
    mkdir -p backend/logs
    mkdir -p backend/tests/unit
    mkdir -p backend/tests/integration
    mkdir -p backend/tests/fixtures
    
    # Frontend directories
    mkdir -p frontend/public/images
    mkdir -p frontend/src/assets
    mkdir -p frontend/src/hooks
    mkdir -p frontend/src/types
    
    print_status "Directories created successfully!"
}

# Setup database
setup_database() {
    print_info "Setting up database..."
    
    # Check if MongoDB is available
    if mongosh --eval "db.runCommand('ping')" &> /dev/null; then
        print_info "Creating database and collections..."
        
        # Create database and collections
        mongosh --eval "
            use medicdrop;
            db.createCollection('users');
            db.createCollection('medicines');
            db.createCollection('orders');
            db.createCollection('prescriptions');
            db.createCollection('pharmacies');
            db.createCollection('deliveries');
            db.createCollection('admins');
            
            // Create indexes
            db.users.createIndex({ email: 1 });
            db.users.createIndex({ phone: 1 });
            db.orders.createIndex({ userId: 1 });
            db.orders.createIndex({ status: 1 });
            db.medicines.createIndex({ name: 'text' });
            db.medicines.createIndex({ category: 1 });
            
            print('Database and collections created successfully!');
        "
        
        print_status "Database setup completed!"
    else
        print_warning "MongoDB is not running. Please start MongoDB and run this script again."
    fi
}

# Run tests
run_tests() {
    print_info "Running tests..."
    
    # Backend tests
    if [ -d "backend/tests" ]; then
        print_info "Running backend tests..."
        cd backend
        npm test
        cd ..
    fi
    
    # Frontend tests
    if [ -d "frontend/src" ]; then
        print_info "Running frontend tests..."
        cd frontend
        npm test -- --watchAll=false
        cd ..
    fi
    
    print_status "Tests completed!"
}

# Start development servers
start_development() {
    print_info "Starting development servers..."
    
    print_info "Starting backend server..."
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    print_info "Starting frontend server..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    print_status "Development servers started!"
    print_info "Backend: http://localhost:5000"
    print_info "Frontend: http://localhost:3000"
    print_info "Press Ctrl+C to stop all servers"
    
    # Wait for user to stop servers
    wait
}

# Main setup function
main() {
    echo "Starting MedicDrop setup..."
    echo ""
    
    # Check prerequisites
    check_node
    check_mongodb
    
    echo ""
    print_info "Prerequisites check completed!"
    echo ""
    
    # Install dependencies
    install_dependencies
    
    echo ""
    # Setup environment
    setup_environment
    
    echo ""
    # Create directories
    create_directories
    
    echo ""
    # Setup database
    setup_database
    
    echo ""
    print_status "Setup completed successfully!"
    echo ""
    
    # Ask user what to do next
    echo "What would you like to do next?"
    echo "1. Run tests"
    echo "2. Start development servers"
    echo "3. Exit"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            run_tests
            ;;
        2)
            start_development
            ;;
        3)
            print_info "Setup complete! You can now start developing."
            print_info "To start the servers manually:"
            print_info "  Backend: cd backend && npm run dev"
            print_info "  Frontend: cd frontend && npm start"
            ;;
        *)
            print_error "Invalid choice. Exiting."
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
