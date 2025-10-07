// src/api/api.js
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

// attach token from localStorage for every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, err => Promise.reject(err));

// Auth
export const registerUser = (payload) => api.post('/register', payload);
export const loginUser = (payload) => api.post('/login', payload);

// Courses & lessons
export const getCourses = () => api.get('/courses');
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (payload) => api.post('/courses', payload);
export const updateCourse = (id, payload) => api.put(`/courses/${id}`, payload);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Enrollment
export const enrollCourse = (id) => api.post(`/courses/${id}/enroll`);

// Lessons (assumes backend supports this)
export const createLesson = (courseId, payload) => api.post(`/courses/${courseId}/lessons`, payload);
export const updateLesson = (courseId, lessonId, payload) => api.put(`/courses/${courseId}/lessons/${lessonId}`, payload);
export const deleteLesson = (courseId, lessonId) => api.delete(`/courses/${courseId}/lessons/${lessonId}`);

export default api;
