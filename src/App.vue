<script lang="ts">
import { ref } from 'vue';
import Cabecera from './components/Cabecera.vue';

export default {
  components: {
    Cabecera
  },
  setup() {
    const nombreUsuario = ref('');

    return { nombreUsuario };
  }
};
</script>

<template>
  <header>
    <Cabecera :nombre-usuario="nombreUsuario" @logout="nombreUsuario = ''" />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>

  <router-view @usuario-logueado="nombreUsuario = $event" />
  <Pie />
</template>