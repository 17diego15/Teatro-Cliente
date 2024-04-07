import { defineStore } from 'pinia';
import axios from 'axios';

interface Sala {
  salaID: number;
  nombre: string;
  numeroFilas: number;
  numeroColumnas: number;
}

export const useSalasStore = defineStore('salas', {
  state: () => ({
    salas: [] as Sala[],
  }),
  actions: {
    async cargarSalas() {
      try {
        const response = await axios.get('/api/sala');
        this.salas = response.data;
      } catch (error) {
        console.error('Error al cargar las salas:', error);
      }
    },
    async crearSala(nuevaSala: Sala) {
      try {
        const response = await axios.post('/api/sala', nuevaSala);
        this.salas.push(response.data);
      } catch (error) {
        console.error('Error al crear la sala:', error);
        throw error;
      }
    },
    async actualizarSala(salaID: number, salaActualizada: Sala) {
      try {
        await axios.put(`/api/sala/${salaID}`, salaActualizada);
        const index = this.salas.findIndex(sala => sala.salaID === salaID);
        if (index !== -1) {
          this.salas[index] = salaActualizada;
        }
      } catch (error) {
        console.error('Error al actualizar la sala:', error);
        throw error;
      }
    },
    async eliminarSala(salaID: number) {
      try {
        await axios.delete(`/api/sala/${salaID}`);
        const index = this.salas.findIndex(sala => sala.salaID === salaID);
        if (index !== -1) {
          this.salas.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar la sala:', error);
        throw error;
      }
    },
  },
});
