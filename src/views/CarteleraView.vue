<script lang="ts">
import { defineComponent, ref } from 'vue';

import obra1 from '../assets/impulso.jpg'
import obra2 from '../assets/caminoAlZoo.jpg'

export default defineComponent({
  name: 'ObrasComponent',
  setup() {
    const obras = ref([
      { id: 1, imagen: obra1, nombre: 'Obra 1' },
      { id: 2, imagen: obra2, nombre: 'Obra 2' },
      { id: 3, imagen: obra2, nombre: 'Obra 2' },
      { id: 4, imagen: obra2, nombre: 'Obra 2' },
      { id: 5, imagen: obra2, nombre: 'Obra 2' },
      { id: 6, imagen: obra2, nombre: 'Obra 2' },
      { id: 7, imagen: obra2, nombre: 'Obra 2' },

    ]);

    const comprarObra = (id: number) => {
      window.location.href = `/obra/${id}`;
    };

    return { obras, comprarObra };
  }
});
</script>

<template>
  <div class="cartelera_section" id="obrasContainer">
    <div class="cartelera_div" id="obrasContainer">
      <div v-for="obra in obras" :key="obra.id" class="cartelera_div_img">
        <img :src="obra.imagen" :alt="'Imagen de ' + obra.nombre">
        <button class="cartelera_boton1" @click="comprarObra(obra.id)">Comprar</button>
      </div>
    </div>
  </div>
</template>

