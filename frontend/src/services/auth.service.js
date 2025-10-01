// NEW FILE - Authentication service layer
import apiClient from './api.service';
import { API_CONFIG } from '../config/api.config';

export const authService = {
  async register(username, email, password) {
    try {
      const { data } = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        username,
        email,
        password
      });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  async login(email, password) {
    try {
      const { data } = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};