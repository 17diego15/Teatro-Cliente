<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFuncionesStore } from '@/store/FuncionesStore';

export default defineComponent({
  name: 'DetalleObraView',
  props: {
    nombreUsuario: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const funcionesStore = useFuncionesStore();

    onMounted(async () => {
      const obraId = Number(route.params.id);
      try {
        await funcionesStore.cargarFuncionesPorObra(obraId);
      } catch (error) {
        router.push({ name: 'notFound' });
      }
    });

    const volver = () => {
      router.push('/cartelera');
    };

    const comprar = (funcionID: number) => {
      router.push(`/sala/${funcionID}`);
    };

    return { 
      funciones: funcionesStore.funciones, 
      obra: funcionesStore.obra, 
      volver, 
      comprar 
    };
  },
});
</script>

<template>
  <section v-if="obra" class="eleccionSala_container">
    <div class="eleccionSala_container_div" id="eleccionSala_div1">
      <img :src="obra.imagen" alt="Imagen de la obra" v-if="obra.imagen" />
      <div class="eleccionSala_texto" v-if="obra.titulo">
        <h2>{{ obra.titulo }}</h2>
        <p>Teatro ticketon, zaragoza</p>
      </div>
    </div>
    <div class="eleccionSala_div2" id="eleccionSala_div2">
      <div v-for="funcion in funciones" :key="funcion.funcionID">
        <p>{{ funcion.fecha }}</p>
        <p>{{ funcion.hora }}</p>
        <p v-if="funcion.disponibilidad === 'Si'">Disponible</p>
        <button v-if="funcion.disponibilidad === 'Si'" @click="comprar(funcion.funcionID)">Comprar</button>
        <p v-else>No disponible</p>
      </div>
    </div>
    <button id="eleccionSala_volver" @click="volver">Volver</button>
  </section>
  <p v-else>Obra no encontrada</p>
</template>

