import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null,
  }),
  actions: {
    async register(userData: any) {
      try {
        const response = await axios.post('http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/usuario', userData);
        this.usuario = response.data; 
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
  },
});