<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useObrasStore } from '@/store/ObrasStore';
import ObrasComponent from '@/components/ObraComponente.vue';

export default defineComponent({
  name: 'CarteleraView',
  components: {
    ObrasComponent,
  },
  setup() {
    const router = useRouter();
    const obrasStore = useObrasStore();

    const comprarObra = (id: number) => {
      console.log(id);
      router.push(`obra/${id}`);
    };

    onMounted(() => {
      obrasStore.cargarObras();
    });

    return { obras: obrasStore.obras, comprarObra };
  }
});
</script>

<template>
  <div class="cartelera_section" id="obrasContainer">
    <ObrasComponent :obras="obras" @comprar="comprarObra" />
  </div>
</template>