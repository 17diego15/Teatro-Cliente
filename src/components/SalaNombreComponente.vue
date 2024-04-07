<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SalaNombre',
    props: {
        nombreSala: String,
    },
});
</script>

<template>
    <div>
        <h2>Bienvenido a la {{ nombreSala }}</h2>
        <h3>Haz click en donde te quieres sentar</h3>
    </div>
</template>
