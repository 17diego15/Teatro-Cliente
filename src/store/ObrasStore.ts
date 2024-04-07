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
    async crearObra(obra: Obra) {
      try {
        const response = await axios.post('/api/obra', obra);
        this.obras.push(response.data);
      } catch (error) {
        console.error('Error al crear la obra: ', error);
      }
    },
    async actualizarObra(id: number, obra: Obra) {
      try {
        const response = await axios.put(`/api/obra/${id}`, obra);
        const index = this.obras.findIndex((o) => o.obraID === id);
        if (index !== -1) {
          this.obras[index] = response.data;
        }
      } catch (error) {
        console.error(`Error al actualizar la obra con ID ${id}: `, error);
      }
    },
    async eliminarObra(id: number) {
      try {
        await axios.delete(`/api/obra/${id}`);
        this.obras = this.obras.filter((obra) => obra.obraID !== id);
      } catch (error) {
        console.error(`Error al eliminar la obra con ID ${id}: `, error);
      }
    },
  },
});