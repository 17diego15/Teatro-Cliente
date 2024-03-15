<script setup lang="ts">
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/RegisterFormComponente.vue'; 
import { useUserStore } from '@/store/RegisterStore'; 

const router = useRouter();
const userStore = useUserStore();

const onRegistrationSuccess = async (userData: any) => {
  await userStore.register(userData);
  router.push('/');
};
</script>

<template>
  <div class="register_container">
    <RegisterForm @registration-success="onRegistrationSuccess" />
    <p>¿Tienes una cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></p>
  </div>
</template>