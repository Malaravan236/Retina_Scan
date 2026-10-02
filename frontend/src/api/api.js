import axios from 'axios'

const API_URL = "https://retina-scan-final.onrender.com"

const api = axios.create({
  baseURL: API_URL,
})

export const predictScan = (file, patientName) => {
  const formData = new FormData()
  formData.append('image', file)
  if (patientName) formData.append('patient_name', patientName)
  return api.post('/predict/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getHistory = (page = 1) => api.get(`/history/?page=${page}`)
export const deleteScan = (id) => api.delete(`/history/${id}/`)
export const getStats = () => api.get('/stats/')
export const getHealth = () => api.get('/health/')

export default api