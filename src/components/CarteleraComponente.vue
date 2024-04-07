<script lang="ts">
import { defineComponent, type PropType } from 'vue';
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
    name: 'CarteleraComponente',
    components: {
        ObraTarjeta,
    },
    props: {
        obras: Array as PropType<Obra[]>,
    },
    emits: ['comprar'],
});
</script>

<template>
    <div class="cartelera_section">
        <ObraTarjeta v-for="obra in obras" :key="obra.obraID" :obra="obra"
            @comprar="$emit('comprar', $event)" />
    </div>
</template>