<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        duracion: String,
        precio: Number,
    },
});
</script>

<template>
    <div class="infoObras_section_dcha">
        <div class="infoObras_section_dcha_div1">
            <p><strong>Duración:</strong></p>
            <p>{{ duracion }}</p>
        </div>
        <div class="infoObras_section_dcha_div2">
            <p><strong>Precio:</strong></p>
            <p>{{ precio }}€</p>
        </div>
    </div>
</template>