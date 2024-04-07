<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFuncionesStore } from '@/store/FuncionesStore';
import ObraDetalle from '@/components/SalaObraDetalleComponente.vue';
import FuncionDetalle from '@/components/SalaFuncionDetalleComponente.vue';

interface Funcion {
  funcionID: number;
  obraID: number;
  salaID: number;
  fecha: string;
  hora: string;
  disponibilidad: string;
  asientosDisponibles: number;
  asientosRestantes: number;
  obra: Obra;
}

interface Obra {
  obraID: number;
  titulo: string;
  imagen: string;
}

export default defineComponent({
  name: 'ElecionSalaView',
  components: {
    ObraDetalle,
    FuncionDetalle,
  },
  props: {
    nombreUsuario: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const funcionesStore = useFuncionesStore();

    const funciones = ref<Funcion[]>([]);
    const obra = ref<Obra | null>(null);

    const cargarDatos = async () => {
      const obraId = Number(route.params.id);
      try {
        await funcionesStore.cargarFuncionesPorObra(obraId);
        funciones.value = funcionesStore.funciones;
        obra.value = funcionesStore.obra;
      } catch (error) {
        console.error('Error al cargar funciones:', error);
        router.push({ name: 'notFound' });
      }
    };

    watch(() => route.params.id, cargarDatos, { immediate: true });

    const volver = () => {
      router.push('/cartelera');
    };

    const comprar = (funcionID: number) => {
      router.push(`/sala/${funcionID}`);
    };

    return {
      funciones,
      obra,
      volver,
      comprar,
    };
  },
});
</script>

<template>
  <section v-if="obra" class="eleccionSala_container">
    <ObraDetalle :obra="obra" />
    <FuncionDetalle :funciones="funciones" @comprar="comprar" />
    <button id="eleccionSala_volver" @click="volver">Volver</button>
  </section>
  <p v-else>Obra no encontrada</p>
</template>