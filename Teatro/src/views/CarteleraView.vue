<script lang="ts">
import { defineComponent, ref } from 'vue';

import imagen1 from '../asserts/slider1.jpg';
import imagen2 from '../asserts/slider2.jpg';

export default defineComponent({
  name: 'ObrasComponent',
  setup() {
    const obras = ref([
      { id: 1, imagen: imagen1, nombre: 'Obra 1' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },
      { id: 2, imagen: imagen2, nombre: 'Obra 2' },

    ]);

    const comprarObra = (id: number) => {
      window.location.href = `../Paginas/InfoObra.html?id=${id}`;
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

