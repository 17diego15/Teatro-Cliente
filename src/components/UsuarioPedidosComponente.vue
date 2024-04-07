<script lang="ts">
import { defineComponent, type PropType } from 'vue';
interface Reserva {
    reservaID: number;
    funcionID: number;
    numeroFila: number;
    numeroColumna: number;
    usuarioID: number;
    pedidoID: number;
}

interface Pedido {
    pedidoID: number;
    usuarioID: number;
    funcionID: number;
    precio: number;
    precioTotal: number;
    fecha: string;
    numeroDeReservas: number;
    reservas: Reserva[];
}

export default defineComponent({
    name: 'UsuarioPedidosComponente',
    props: {
        pedidos: {
            type: Array as PropType<Pedido[]>,
            required: true,
        },
    },
    emits: ['descargar', 'comprar'],
});
</script>
<template>
    <div>
        <ul>
            <li v-for="(pedido, index) in pedidos" :key="pedido.pedidoID">
                Pedido #{{ index + 1 }}
                <button class="usuario_boton" @click="$emit('descargar', pedido)">Descargar como PDF</button>
                <button class="usuario_boton" @click="$emit('comprar', pedido.funcionID)">Ir a Compra</button>
            </li>
        </ul>
    </div>
</template>