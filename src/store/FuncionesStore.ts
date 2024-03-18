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
        const response = await axios.get(`/api/obras/${obraId}/funcion`);
        this.funciones = response.data;
        if (response.data.length > 0) {
          this.obra = response.data[0].obra; 
        }
      } catch (error) {
        console.error('Error al cargar funciones:', error);
        throw error;
      }
    },
  },
});