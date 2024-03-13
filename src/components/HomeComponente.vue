<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import ObraTarjeta from './TarjetaComponente.vue';

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
    name: 'ObrasRecientesComponente',
    components: {
        ObraTarjeta,
    },
    props: {
        obrasRecientes: Array as PropType<Obra[]>,
    },
    emits: ['comprar'],
});
</script>

<template>
    <div class="home_cartelera_div" id="obrasContainer">
        <ObraTarjeta v-for="obra in obrasRecientes" :key="obra.obraID" :obra="obra"
            @comprar="$emit('comprar', $event)" />
    </div>
</template>
