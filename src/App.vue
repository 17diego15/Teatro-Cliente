<script lang="ts">
import { ref } from 'vue';
import Cabecera from './components/Cabecera.vue';
import Pie from './components/PiePagina.vue';

export default {
  components: {
    Cabecera,
    Pie
  },
  setup() {
    const nombreUsuario = ref('');

    return { nombreUsuario };
  }
};
</script>

<template>
  <header>
    <Cabecera />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>

  <router-view />
  <Pie />
</template>