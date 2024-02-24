<script lang="ts">
import { RouterLink } from 'vue-router'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Cabecera',
});

</script>



<template>
    <div class="header">
        <div class="header_izq">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="header_dcha">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/cartelera">Cartelera</RouterLink>
                <RouterLink to="/register">Crear Cuenta</RouterLink>
            </nav>
        </div>
    </div>
</template>

