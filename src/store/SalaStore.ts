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
    async comprarAsientos(reservasParaEnviar: AsientoSeleccionado[], usuarioID: number, pedidoID: number) {
      try {
        const reservasConPedidoID = reservasParaEnviar.map(reserva => ({
          funcionID: reserva.funcionID,
          numeroFila: reserva.numeroFila,
          numeroColumna: reserva.numeroColumna,
          usuarioID,
          pedidoID,
        }));

        const response = await axios.post('/api/reserva', reservasConPedidoID);
        return response.data;
      } catch (error) {
        console.error('Error al realizar las reservas', error);
        throw error;
      }
    },
    async enviarPedido(usuarioID: number, funcionID: number, asientosSeleccionados: AsientoSeleccionado[]) {
      try {
        const funcionInfo = await axios.get(`/api/funcion/${funcionID}`);
        const precioPorAsiento = funcionInfo.data.obra.precio;
        const precioTotal = asientosSeleccionados.length * precioPorAsiento;
        const fecha = new Date().toISOString();
        const pedido = {
          usuarioID,
          funcionID,
          precio: precioPorAsiento,
          precioTotal,
          fecha,
          numeroDeReservas: asientosSeleccionados.length,
        };
        const response = await axios.post('/api/pedido', pedido);
        if (response.data && response.data.pedidoID) {
          return response.data.pedidoID;
        } else {
          throw new Error('Pedido creado, pero no se recibió un pedidoID válido.');
        }
      } catch (error) {
        console.error('Error al enviar el pedido', error);
        throw error;
      }
    },
  },
});
