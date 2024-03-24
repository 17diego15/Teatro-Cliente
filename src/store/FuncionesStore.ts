import { defineStore } from 'pinia';
import axios from 'axios';

interface Obra {
  obraID: number;
  titulo: string;
  imagen: string;
}

interface Funcion {
  funcionID: number;
  obraID: number;
  salaID: number;
  fecha: string;
  hora: string;
  disponibilidad: string;
  asientosDisponibles: number;
  asientosRestantes: number;
  obra: Obra;
}

export const useFuncionesStore = defineStore('funciones', {
  state: () => ({
    funciones: [] as Funcion[],
    obra: null as Obra | null,
  }),
  actions: {
    async cargarFuncionesPorObra(obraId: number) {
      try {
        const response = await axios.get(`/api/funcion?obraID=${obraId}`);
        this.funciones = response.data;
        if (response.data.length > 0) {
          this.obra = response.data[0].obra;
        }
      } catch (error) {
        console.error('Error al cargar funciones:', error);
        throw error;
      }
    },
    async cargarFunciones() {
      try {
        const response = await axios.get('/api/funcion');
        this.funciones = response.data;
      } catch (error) {
        console.error('Error al cargar todas las funciones:', error);
      }
    },
    async crearFuncion(nuevaFuncion: Funcion) {
      try {
        const response = await axios.post('/api/funcion', nuevaFuncion);
        this.funciones.push(response.data);
      } catch (error) {
        console.error('Error al crear la función:', error);
        throw error;
      }
    },
    async actualizarFuncion(funcionID: number, funcionActualizada: Funcion) {
      try {
        await axios.put(`/api/funcion/${funcionID}`, funcionActualizada);
        const index = this.funciones.findIndex((f) => f.funcionID === funcionID);
        if (index !== -1) {
          this.funciones[index] = funcionActualizada;
        }
      } catch (error) {
        console.error('Error al actualizar la función:', error);
        throw error;
      }
    },
    async eliminarFuncion(funcionID: number) {
      try {
        await axios.delete(`/api/funcion/${funcionID}`);
        const index = this.funciones.findIndex((f) => f.funcionID === funcionID);
        if (index !== -1) {
          this.funciones.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar la función:', error);
        throw error;
      }
    },
  },
});