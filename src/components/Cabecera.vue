<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const nombreUsuario = ref(localStorage.getItem('nombreUsuario'));
        const router = useRouter();

        watchEffect(() => {
            nombreUsuario.value = localStorage.getItem('nombreUsuario');
        });

        const actualizarNombreUsuario = () => {
            nombreUsuario.value = '';
            localStorage.removeItem('nombreUsuario'); 
            //router.push('/login'); 
        };

        return {
            nombreUsuario, 
            actualizarNombreUsuario,
        };
    }
});
</script>

<template>
    <div class="header">
        <div class="header_izq">
            <img src="../assets/logo.png" alt="logo">
        </div>
        <div class="header_dcha">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/cartelera">Cartelera</RouterLink>

                <RouterLink v-if="nombreUsuario" to="/perfil">{{ nombreUsuario }}</RouterLink>
                <RouterLink v-else to="/login">Iniciar Sesión</RouterLink>

                <button v-if="nombreUsuario" @click="actualizarNombreUsuario">Cerrar Sesión</button>
            </nav>
        </div>
    </div>
</template>