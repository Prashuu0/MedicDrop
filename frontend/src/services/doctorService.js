import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const doctorService = {
  // Onboarding / Profile
  async registerDoctor(formData) {
    const url = `${API_BASE}/doctor/register`;
    return axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async fetchProfile() {
    const url = `${API_BASE}/doctor/profile`;
    return axios.get(url);
  },

  async updateProfile(payload) {
    const url = `${API_BASE}/doctor/profile`;
    return axios.put(url, payload);
  },

  // Prescriptions
  async getPrescriptions(params = {}) {
    const url = `${API_BASE}/doctor/prescriptions`;
    return axios.get(url, { params });
  },

  async approvePrescription(prescriptionId, notes) {
    const url = `${API_BASE}/doctor/prescriptions/${prescriptionId}/approve`;
    return axios.post(url, { notes });
  },

  async rejectPrescription(prescriptionId, reason) {
    const url = `${API_BASE}/doctor/prescriptions/${prescriptionId}/reject`;
    return axios.post(url, { reason });
  },

  async suggestAlternative(prescriptionId, suggestions) {
    const url = `${API_BASE}/doctor/prescriptions/${prescriptionId}/suggest-alt`;
    return axios.post(url, { suggestions });
  },

  // Patients
  async getPatients(params = {}) {
    const url = `${API_BASE}/doctor/patients`;
    return axios.get(url, { params });
  },

  async getPatientDetails(patientId) {
    const url = `${API_BASE}/doctor/patients/${patientId}`;
    return axios.get(url);
  },

  // Digital Prescription
  async createDigitalPrescription(patientId, payload) {
    const url = `${API_BASE}/doctor/patients/${patientId}/prescriptions`;
    return axios.post(url, payload);
  },
};

export default doctorService;


