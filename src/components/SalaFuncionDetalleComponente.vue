<script lang="ts">
import { defineComponent } from 'vue';

interface Funcion {
    funcionID: number;
    fecha: string;
    hora: string;
    disponibilidad: string;
    asientosRestantes: number;
}

export default defineComponent({
    name: 'FuncionDetalle',
    props: {
        funciones: {
            type: Array as () => Funcion[],
            required: true,
        },
    },
    emits: ['comprar'],
});
</script>

<template>
    <div class="eleccionSala_div2" id="eleccionSala_div2">
        <div v-for="funcion in funciones" :key="funcion.funcionID">
            <p>{{ funcion.fecha }}</p>
            <p>{{ funcion.hora }}</p>
            <p v-if="funcion.disponibilidad === 'Si'">Disponible</p>
            <p>Asientos: {{ funcion.asientosRestantes }}</p>
            <button v-if="funcion.disponibilidad === 'Si'" @click="$emit('comprar', funcion.funcionID)">Comprar</button>
            <p v-else>No disponible</p>
        </div>
    </div>
</template>