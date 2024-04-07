import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null,
  }),
  actions: {
    async register(userData: any) {
      try {
        const response = await axios.post('/api/usuario', userData);
        this.usuario = response.data; 
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
  },
});