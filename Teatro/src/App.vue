<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Cabecera from './components/Cabecera.vue'
import Pie from './components/PiePagina.vue'

</script>

<template>
  <header>
    <Cabecera />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>

  <RouterView /> 
  <Pie />
</template>