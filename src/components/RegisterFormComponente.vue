<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['registration-success']);

const nombre = ref('');
const nombreUsuario = ref('');
const contraseña = ref('');
const isAdmin = ref(false);

const validarContraseña = (contraseña: string) => {
  const tieneLongitudSuficiente = contraseña.length >= 8;
  const contieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);
  const contieneMayuscula = /[A-Z]/.test(contraseña);
  return tieneLongitudSuficiente && contieneSimbolo && contieneMayuscula;
};

const submitForm = async () => {
  if (!validarContraseña(contraseña.value)) {
    alert('La contraseña debe tener más de 8 caracteres, contener al menos un símbolo y una letra mayúscula.');
    return;
  }
  emits('registration-success', { nombre: nombre.value, nombreUsuario: nombreUsuario.value, contraseña: contraseña.value, isAdmin: isAdmin.value });
};
</script>

<template>
  <form @submit.prevent="submitForm" class="register_formulario">
    <h2>Regístrate</h2>
    <input type="text" v-model="nombre" placeholder="Nombre">
    <input type="text" v-model="nombreUsuario" placeholder="Nombre de usuario">
    <input type="password" v-model="contraseña" placeholder="Contraseña">
    <button type="submit">Enviar</button>
  </form>
</template>
