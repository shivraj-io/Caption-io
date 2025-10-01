// NEW FILE - Post service layer
import apiClient from './api.service';
import { API_CONFIG } from '../config/api.config';

export const postService = {
  async createPost(formData) {
    try {
      const { data } = await apiClient.post(
        API_CONFIG.ENDPOINTS.POSTS.CREATE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create post' };
    }
  },

  async generateCaption(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const { data } = await apiClient.post(
        API_CONFIG.ENDPOINTS.POSTS.GENERATE_CAPTION,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate caption' };
    }
  },

  async getAllPosts() {
    try {
      const { data } = await apiClient.get(API_CONFIG.ENDPOINTS.POSTS.GET_ALL);
      return data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch posts' };
    }
  }
};