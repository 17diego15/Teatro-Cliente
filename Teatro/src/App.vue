<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Cabecera from './components/Cabecera.vue'
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
</template>