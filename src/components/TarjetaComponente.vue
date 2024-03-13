<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Obra {
    obraID: number;
    titulo: string;
    director: string;
    sinopsis: string;
    duración: string;
    precio: number;
    imagen: string;
}

export default defineComponent({
    name: 'ObraTarjetaComponent',
    props: {
        obra: {
            type: Object as PropType<Obra>,
            required: true,
        },
    },
    emits: ['comprar'],
});
</script>

<template>
    <div class="cartelera_div_img">
        <img :src="obra.imagen" :alt="'Imagen de ' + obra.titulo">
        <button class="cartelera_boton1" @click="$emit('comprar', obra.obraID)">Comprar</button>
    </div>
</template>