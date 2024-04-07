<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useObrasStore } from '@/store/ObrasStore';
import ObraImagen from '@/components/ObraImagenComponente.vue';
import ObraDetalles from '@/components/ObraDetallesComponente.vue';
import ObraInfoAdicional from '@/components/ObraInfoAdicionalComponente.vue';

interface Actor {
    nombre: string;
}

interface Obra {
    obraID: number;
    titulo: string;
    director: string;
    sinopsis: string;
    duración: string;
    precio: number;
    imagen: string;
    actores: Actor[];
}

export default defineComponent({
    components: { ObraImagen, ObraDetalles, ObraInfoAdicional },
    setup() {
        const obra: Ref<Obra | null> = ref(null);
        const route = useRoute();
        const router = useRouter(); 
        const obrasStore = useObrasStore();

        const cargarObra = async () => {
            const id = Number(route.params.id);
            obra.value = await obrasStore.cargarObra(id);
        };

        const comprarObra = (id: number) => {
            router.push(`/compra/${id}`);
        };

        onMounted(cargarObra);

        return { obra, comprarObra };
    }
});
</script>

<template>
    <div v-if="obra" class="infoObras_sectionContainer">
        <div class="infoObras_section_div">
            <ObraImagen :imagen="obra.imagen" :titulo="obra.titulo" />
            <ObraDetalles :titulo="obra.titulo" :director="obra.director" :actores="obra.actores.map(a => a.nombre)"
                :sinopsis="obra.sinopsis" />
            <ObraInfoAdicional :duracion="obra.duración" :precio="obra.precio" />
        </div>
        <div class="infoObras_section_boton">
            <button @click="comprarObra(obra.obraID)">Comprar</button>
        </div>
    </div>
</template>