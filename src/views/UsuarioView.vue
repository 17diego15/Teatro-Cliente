<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/LoginStore';
import { usePedidosStore } from '@/store/PedidosStore';
import { useFuncionesStore } from '@/store/FuncionesStore';
import jsPDF from 'jspdf';

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
const funcionesStore = useFuncionesStore();

onMounted(async () => {
    if (authStore.usuario && authStore.usuario.usuarioID) {
        await pedidosStore.cargarPedidos(authStore.usuario.usuarioID);
        await funcionesStore.cargarFunciones();
    }
});

function descargarComoPDF(pedido: any) {
    const funcionDelPedido = funcionesStore.funciones.find(f => f.funcionID === pedido.funcionID);
    if (!funcionDelPedido) {
        console.error('Función no encontrada para el pedido:', pedido.funcionID);
        alert('No se pudo encontrar la información de la función para este pedido.');
        return;
    }

    const fechaPedido = new Date(pedido.fecha);
    const fechaFuncion = new Date(funcionDelPedido.fecha);
    const anchoDocumento = 3.5 * 72;
    const alturaLinea = 20; 
    const lineasExtras = 9; 
    const margenSuperiorInferior = 40; 
    const alturaContenido = (pedido.reservas.length * alturaLinea) + (lineasExtras * alturaLinea);
    const alturaDocumento = margenSuperiorInferior + alturaContenido;

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [anchoDocumento, alturaDocumento] 
    });

    const colorPrincipal = "#000";
    const colorSecundario = "#700";
    doc.setTextColor(colorPrincipal);
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text("Ticketon", 14, 22);

    doc.setFont('times', 'normal');
    doc.setFontSize(12); 

    let startY = 34;
    doc.text(`Fecha del Pedido: ${fechaPedido.toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Obra: ${funcionDelPedido.obra.titulo}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Sala: ${funcionDelPedido.salaID}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Fecha de la Función: ${fechaFuncion.toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Hora: ${funcionDelPedido.hora}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Precio por asiento: ${funcionDelPedido.obra.precio}`, 14, startY);
    startY += alturaLinea;
    doc.text(`Asientos:`, 14, startY);
    startY += alturaLinea;

    pedido.reservas.forEach((r: Reserva) => {
        doc.text(`- Fila: ${r.numeroFila}, Asiento: ${r.numeroColumna}`, 18, startY);
        startY += alturaLinea;
    });

    doc.setFont('times', 'bold');
    doc.setTextColor(colorSecundario);
    doc.text(`Total: ${pedido.precioTotal} €`, 14, startY);

    doc.save(`pedido_${pedido.pedidoID}.pdf`);
}

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
