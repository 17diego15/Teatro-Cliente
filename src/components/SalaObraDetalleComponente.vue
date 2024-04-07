<script lang="ts">
import { defineComponent } from 'vue';

interface Obra {
    titulo?: string;
    imagen?: string;
}

export default defineComponent({
    name: 'ObraDetalle',
    props: {
        obra: {
            type: Object as () => Obra,
            required: true,
        },
    },
});
</script>

<template>
    <div class="eleccionSala_container_div" id="eleccionSala_div1">
        <img :src="obra.imagen" alt="Imagen de la obra" v-if="obra.imagen" />
        <div class="eleccionSala_texto" v-if="obra.titulo">
            <h2>{{ obra.titulo }}</h2>
            <p>Teatro ticketon, Zaragoza</p>
        </div>
    </div>
</template>