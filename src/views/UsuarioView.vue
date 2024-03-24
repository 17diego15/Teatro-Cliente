<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useAuthStore } from '@/store/LoginStore';
import { usePedidosStore } from '@/store/PedidosStore';

const authStore = useAuthStore();
const pedidosStore = usePedidosStore();
const usuario = authStore.usuario;
const pedidos = computed(() => pedidosStore.pedidos);

watch(() => authStore.usuario, async (newUser) => {
    if (newUser?.usuarioID) {
        console.log('Cargando pedidos para el usuario:', newUser);
        await pedidosStore.cargarPedidos();
    }
}, { immediate: true });

onMounted(async () => {
    if (usuario && usuario.usuarioID) { 
        console.log('Cargando pedidos...');
        await pedidosStore.cargarPedidos(); 
        console.log('Pedidos cargados:', pedidosStore.pedidos);
    }
});

</script>

<template>
    <div class="usuario_container">
        <h1>Perfil del Usuario</h1>
        <p>Nombre: {{ usuario.nombreUsuario }}</p>
        <div v-if="pedidos.length">
            <h2>Pedidos</h2>
            <ul>
                <li v-for="pedido in pedidos" :key="pedido.pedidoID">
                    Pedido #{{ pedido.pedidoID }} - Precio Total: {{ pedido.precioTotal }} - Fecha: {{ pedido.fecha }}
                </li>
            </ul>
        </div>
        <p v-else>No hay pedidos para mostrar.</p>
    </div>
</template>