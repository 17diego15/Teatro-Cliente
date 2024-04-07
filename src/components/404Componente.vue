<script lang="ts">
import { defineComponent } from 'vue';
import icono from '../assets/icono.png'; 

export default defineComponent({
    name: 'NotFoundPage',
    setup() {
        return {
            icono,
        };
    },
});
</script>

<template>
    <div class="notFound_sectionContainer">
        <img class="notFound_img" :src="icono" alt="Icono">
        <h1>404</h1>
        <p>Página no encontrada</p>
    </div>
</template>