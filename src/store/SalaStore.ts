import { defineStore } from 'pinia';
import axios from 'axios';

interface AsientoSeleccionado {
  funcionID: number;
  numeroFila: number;
  numeroColumna: number;
}

interface Sala {
  salaID: number;
  nombre: string;
  numeroFilas: number;
  numeroColumnas: number;
}

interface Reserva {
  reservaID: number;
  funciónID: number;
  numeroFila: number;
  numeroColumna: number;
  sala: Sala;
}

export const useSeatsStore = defineStore('seats', {
  state: () => ({
    reservas: [] as Reserva[],
    sala: null as Sala | null,
  }),
  actions: {
    async cargarSala(funcionID: number) {
      try {
        const response = await axios.get(`/api/Funcion/${funcionID}`);
        this.sala = response.data.sala;
      } catch (error) {
        console.error('Error al obtener los detalles de la sala', error);
      }
    },
    async cargarReservas(funcionID: number) {
      try {
        const response = await axios.get(`/api/reserva?funcionID=${funcionID}`);
        this.reservas = response.data;
      } catch (error) {
        console.error('Error al obtener las reservas', error);
      }
    },
    async comprarAsientos(reservasParaEnviar: AsientoSeleccionado[], usuarioID: number) {
      try {
        const response = await axios.post('/api/reserva', reservasParaEnviar.map(reserva => ({
          reservaID: 0,
          funcionID: reserva.funcionID,
          numeroFila: reserva.numeroFila,
          numeroColumna: reserva.numeroColumna,
          usuarioID,
        })));
        return response.data;
      } catch (error) {
        console.error('Error al realizar las reservas', error);
        throw error;
      }
    },
  },
});
