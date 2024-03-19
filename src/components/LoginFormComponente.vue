<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/LoginStore';
import { useRouter } from 'vue-router';

const NombreUsuario = ref('');
const Contraseña = ref('');
const router = useRouter();
const authStore = useAuthStore();

const submitForm = async () => {
  try {
    await authStore.login(NombreUsuario.value, Contraseña.value);
    router.push('/');
  } catch (error) {
    console.error('Error al enviar formulario:', error);
  }
};
</script>

<template>
  <div class="register_container">
    <form @submit.prevent="submitForm" class="register_formulario">
      <h2>Iniciar sesión</h2>
      <input type="text" v-model="NombreUsuario" placeholder="Nombre de usuario">
      <input type="password" v-model="Contraseña" placeholder="Contraseña">
      <button type="submit">Enviar</button>
      <p>¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
      </p>
    </form>
  </div>
</template>
