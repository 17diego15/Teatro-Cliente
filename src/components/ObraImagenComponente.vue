<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        imagen: String,
        titulo: String,
    },
});
</script>

<template>
    <div class="infoObras_section_izq">
        <img :src="imagen" :alt="'Imagen de ' + titulo" class="infoObras_section_izq_img">
    </div>
</template>