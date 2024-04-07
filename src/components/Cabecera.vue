<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/store/LoginStore';
import LogoCanvas from '@/components/LogoComponente.vue'; 

const authStore = useAuthStore();

function actualizarNombreUsuario() {
  authStore.logout();
}
</script>

<template>
  <div class="header">
    <div class="header_izq">
      <LogoCanvas /> 
    </div>
    <div class="header_dcha">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cartelera">Cartelera</RouterLink>
        <RouterLink v-if="authStore.estaLogueado" to="/perfil">{{ authStore.usuario?.nombreUsuario }}</RouterLink>
        <RouterLink v-else to="/login">Iniciar Sesión</RouterLink>
        <button v-if="authStore.estaLogueado" class="header_boton" @click="actualizarNombreUsuario">Cerrar
          Sesión</button>
        <RouterLink v-if="authStore.usuario?.isAdmin" to="/admin">Dashboard</RouterLink>
      </nav>
    </div>
  </div>
</template>