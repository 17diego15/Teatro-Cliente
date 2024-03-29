<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/LoginStore';
import { usePedidosStore } from '@/store/PedidosStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

const authStore = useAuthStore();
const pedidosStore = usePedidosStore();

onMounted(async () => {
    if (authStore.usuario && authStore.usuario.usuarioID) {
        await pedidosStore.cargarPedidos(authStore.usuario.usuarioID);
    }
});

const descargarComoPDF = async (pedido: Pedido) => {
    const element = document.createElement('div');
    element.innerHTML = `
    <h1>Pedido #${pedido.pedidoID}</h1>
    <p>Fecha: ${pedido.fecha}</p>
    <p>Precio Total: ${pedido.precioTotal}€</p>
    <ul>${pedido.reservas.map(r => `<li>Fila: ${r.numeroFila}, Asiento: ${r.numeroColumna}</li>`).join('')}</ul>`;

    document.body.appendChild(element);

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`pedido_${pedido.pedidoID}.pdf`);

    document.body.removeChild(element);
};

</script>

<template>
    <div class="usuario_container">
        <h1>Perfil del Usuario</h1>
        <p>Nombre: {{ authStore.usuario.nombreUsuario }}</p>
        <div v-if="pedidosStore.pedidos.length">
            <h2>Pedidos</h2>
            <ul>
                <li v-for="pedido in pedidosStore.pedidos" :key="pedido.pedidoID">
                    Pedido #{{ pedido.pedidoID }} - Precio Total: {{ pedido.precioTotal }}€ - Fecha: {{ pedido.fecha }}
                    <button @click="descargarComoPDF(pedido)">Descargar como PDF</button>
                </li>
            </ul>
        </div>
        <p v-else>No hay pedidos para mostrar.</p>
    </div>
</template>
