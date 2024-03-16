<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        titulo: String,
        director: String,
        actores: Array as PropType<string[]>,
        sinopsis: String,
    },
});
</script>
<template>
    <div class="infoObras_section_central">
        <h2>{{ titulo }}</h2>
        <p><strong>Director:</strong></p>
        <p>{{ director }}</p>
        <p><strong>Actores:</strong></p>
        <p>{{ actores?.join(', ') }}</p>
        <p><strong>Sinopsis:</strong> </p>
        <p>{{ sinopsis }}</p>
    </div>
</template>