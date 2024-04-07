<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useObrasStore } from '@/store/ObrasStore';
import CarteleraComponente from '@/components/CarteleraComponente.vue';

export default defineComponent({
  name: 'CarteleraView',
  components: {
    CarteleraComponente,
  },
  setup() {
    const router = useRouter();
    const obrasStore = useObrasStore();

    watchEffect(async () => {
      if (obrasStore.obras.length === 0) {
        await obrasStore.cargarObras();
      }
    });

    const obrasOrdenadas = computed(() => {
      return [...obrasStore.obras].sort((a, b) => b.obraID - a.obraID);
    });

    const comprarObra = (id: number) => {
      console.log(id);
      router.push(`obra/${id}`);
    };

    return { obras: obrasOrdenadas, comprarObra };
  }
});
</script>
<template>
  <div class="cartelera_section" id="obrasContainer">
    <CarteleraComponente :obras="obras" @comprar="comprarObra" />
  </div>
</template>