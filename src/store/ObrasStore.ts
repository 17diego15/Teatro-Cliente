import { defineStore } from 'pinia';
import axios from 'axios';

interface Obra {
  obraID: number;
  titulo: string;
  director: string;
  sinopsis: string;
  duración: string;
  precio: number;
  imagen: string;
}

export const useObrasStore = defineStore('obras', {
  state: () => ({
    obras: [] as Obra[],
  }),
  actions: {
    async cargarObras() {
      try {
        const response = await axios.get('/api/obras');
        this.obras = response.data;
      } catch (error) {
        console.error('Error al obtener las obras: ', error);
      }
    },
  },
});