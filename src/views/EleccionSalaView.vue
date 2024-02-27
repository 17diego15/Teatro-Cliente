<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Obra {
  obraID: number;
  titulo: string;
  imagen: string;
}

interface Funcion {
  funcionID: number;
  obraID: number;
  salaID: number;
  fecha: string;
  hora: string;
  disponibilidad: string;
  obra: Obra;
}

export default defineComponent({
  name: 'DetalleObraView',
  setup() {
    const funciones = ref<Funcion[]>([]);
    const obra = ref<Obra | null>(null); 
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const obraId = route.params.id;
      try {
        const response = await fetch(`/api/funcion/obras/${obraId}`);
        if (!response.ok) {
          throw new Error('Funciones no encontradas');
        }
        const data: Funcion[] = await response.json();
        funciones.value = data;
        if (data.length > 0) {
          obra.value = data[0].obra; 
        }
      } catch (error) {
        console.error(error);
        router.push({ name: 'notFound' });
      }
    });

    const volver = () => {
      router.push('/cartelera');
    };

    const comprar = () => {
      router.push('/sala');
    };

    return { funciones, obra, volver, comprar };
  }
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
        <button v-if="funcion.disponibilidad === 'Si'" @click="comprar">Comprar</button>
        <p v-else>No disponible</p>
      </div>
    </div>
    <button id="eleccionSala_volver" @click="volver">Volver</button>
  </section>
  <p v-else>Obra no encontrada</p>
</template>

