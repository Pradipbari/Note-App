import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const sendOtp = (email) =>
  axios.post(`${API_BASE}/auth/send-otp`, { email });
export const verifyOtp = (email, code) =>
  axios.post(`${API_BASE}/auth/verify-otp`, { email, code });

export const getNotes = (token) =>
  axios.get(`${API_BASE}/api/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createNote = (token, note) =>
  axios.post(`${API_BASE}/api/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNote = (token, id) =>
  axios.delete(`${API_BASE}/api/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
