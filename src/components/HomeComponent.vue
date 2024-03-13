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
    name: 'ObrasRecientesComponent',
    props: {
        obrasRecientes: Array as PropType<Obra[]>,
    },
    emits: ['comprar'],
});
</script>

<template>
    <div class="home_cartelera_div" id="obrasContainer">
        <div v-for="obra in obrasRecientes" :key="obra.obraID" class="home_cartelera_div_img">
            <img :src="obra.imagen" :alt="'Imagen de ' + obra.titulo">
            <button class="home_cartelera_boton1" @click="$emit('comprar', obra.obraID)">Comprar</button>
        </div>
    </div>
</template>
