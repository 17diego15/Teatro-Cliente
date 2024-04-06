<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useAuthStore } from '@/store/LoginStore';
import { usePedidosStore } from '@/store/PedidosStore';
import { useFuncionesStore } from '@/store/FuncionesStore';
import jsPDF from 'jspdf';
import { useRouter } from 'vue-router';
import Pedidos from '@/components/UsuarioPedidosComponente.vue';
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
    name: 'UsuarioView',
    components: {
        Pedidos,
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const pedidosStore = usePedidosStore();
        const funcionesStore = useFuncionesStore();

        const pedidos = ref<Pedido[]>([]);
        const usuario = ref(authStore.usuario);

        onMounted(async () => {
            if (usuario.value && usuario.value.usuarioID) {
                await pedidosStore.cargarPedidos(usuario.value.usuarioID);
                await funcionesStore.cargarFunciones();
                pedidos.value = pedidosStore.pedidos;
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
            // Formatear fecha del pedido
            doc.text(`Fecha del Pedido: ${fechaPedido.toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })} ${fechaPedido.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' })}`, 14, startY);
            startY += alturaLinea;
            doc.text(`Obra: ${funcionDelPedido.obra.titulo}`, 14, startY);
            startY += alturaLinea;
            doc.text(`Sala: ${funcionDelPedido.salaID}`, 14, startY);
            startY += alturaLinea;
            // Formatear fecha de la función
            doc.text(`Fecha de la Función: ${fechaFuncion.toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric' })} ${fechaFuncion.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit' })}`, 14, startY);
            startY += alturaLinea;
            // Asumiendo que 'hora' es la hora de inicio de la función, podría ser redundante si ya está incluida en 'fechaFuncion'
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

        const comprar = (idFuncion: number) => {
            router.push(`/sala/${idFuncion}`);
        };

        return {
            pedidos,
            usuario,
            descargarComoPDF,
            comprar,
        };
    },
});
</script>

<template>
    <div class="usuario_container">
        <h1>Perfil del Usuario</h1>
        <p>Nombre: {{ usuario.nombreUsuario }}</p>
        <Pedidos v-if="pedidos.length" :pedidos="pedidos" @descargar="descargarComoPDF" @comprar="comprar" />
        <p v-else>No hay pedidos para mostrar.</p>
    </div>
</template>