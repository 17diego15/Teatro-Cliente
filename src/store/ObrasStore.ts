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
        const response = await axios.get('/api/obra');
        this.obras = response.data;
      } catch (error) {
        console.error('Error al obtener las obras: ', error);
      } 
    },
    async cargarObra(id: number) {
      try {
        const response = await axios.get(`/api/obra/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error al obtener la obra con ID ${id}: `, error);
      }
    },
  },
});