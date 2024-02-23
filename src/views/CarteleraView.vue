<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import obra1 from '../assets/impulso.jpg'
import obra2 from '../assets/caminoAlZoo.jpg'

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
  name: 'ObrasComponent',
  setup() {
    const obras = ref<Obra[]>([]);
    const router = useRouter()

    const comprarObra = (id: number) => {
      console.log(id)
      router.push(`obra/${id}`)
    };

    const cargarObras = async () => {
      try {
        const respuesta = await fetch('/api/obras');
        if (!respuesta.ok) {
          throw new Error('Error al obtener las obras');
        }
        const data: Obra[] = await respuesta.json();
        obras.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      cargarObras();
    });
    return { obras, comprarObra };
  }
});

</script>

<template>
  <div class="cartelera_section" id="obrasContainer">
    <div class="cartelera_div" id="obrasContainer">
      <div v-for="obra in obras" :key="obra.obraID" class="cartelera_div_img">
        <img :src="obra.imagen" :alt="'Imagen de ' + obra.titulo">
        <button class="cartelera_boton1" @click="comprarObra(obra.obraID)">Comprar</button>
      </div>
    </div>
  </div>
</template>

