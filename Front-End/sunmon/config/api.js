import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const endpoints = {
  temperatures: '/api/sensors/temperatures',
  photos: '/api/sensors/photos',
  voltages: '/api/sensors/voltages'
};