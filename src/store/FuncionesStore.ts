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

export const useObrasStore = defineStore('obras', {
  state: () => ({
    funciones: [] as Funcion[],
    obra: null as Obra | null,
  }),
  actions: {
    async cargarFunciones(obraId: string) {
      try {
        const response = await axios.get(`/api/obras/${obraId}/funcion`);
        this.funciones = response.data;
        if (this.funciones.length > 0) {
          this.obra = this.funciones[0].obra;
        }
      } catch (error) {
        console.error(error);
        throw new Error('No se pudieron cargar las funciones');
      }
    },
  },
});