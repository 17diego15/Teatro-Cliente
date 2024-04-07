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
        async cargarPedidos(usuarioID: number) {
            try {
                if (usuarioID) {
                    const response = await axios.get(`http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/pedido?usuarioID=${usuarioID}`);
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