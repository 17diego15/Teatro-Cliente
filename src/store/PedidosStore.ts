import { defineStore } from 'pinia';
import axios from 'axios';

interface Pedido {
    pedidoID: number;
    usuarioID: number;
    funcionID: number;
    precio: number;
    precioTotal: number;
    fecha: string;
    numeroDeReservas: number;
}

export const usePedidosStore = defineStore('pedidos', {
    state: () => ({
        pedidos: [] as Pedido[],
    }),
    actions: {
        async cargarPedidos() {
            try {
                const usuarioData = JSON.parse(localStorage.getItem('usuario') || '{}');
                const usuarioId = usuarioData.usuarioID;

                if (usuarioId) {
                    const response = await axios.get(`/api/pedido?usuarioID=${usuarioId}`);
                    this.pedidos = response.data;
                } else {
                    console.error('usuarioID no está definido');
                }
            } catch (error) {
                console.error('Error al obtener los pedidos: ', error);
            }
        }
    },
});  