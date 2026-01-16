import api from './api';

export const postService = {
  // Create post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Get feed
  getFeed: async () => {
    const response = await api.get('/posts/feed');
    return response.data;
  },

  // Get single post
  getPost: async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },

  // Like/Unlike post
  likePost: async (postId) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  // Delete post
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
};
