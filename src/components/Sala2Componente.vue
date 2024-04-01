<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'Sala2',
    props: {
        rows: Array as PropType<number[]>,
        getColsForRow: {
            type: Function as PropType<(row: number) => number[]>,
            required: true
        },
        getSeatColor: {
            type: Function as PropType<(seat: { row: number; col: number }) => string>,
            required: true
        },
        toggleSeatColor: {
            type: Function as PropType<(seat: { row: number; col: number }) => void>,
            required: true
        },
    },
    data() {
        return {
            colorDescription: {
                'Sitio para elegir': '#ffffff',
                'Sitio escogido por el usuario': '#00ff4c',
                'Sitio ocupado': '#ff0000',
                'Sitio ocupado por usuario': '#0000ff',
            }
        };
    }
});
</script>

<template>
    <svg width="35rem" height="5rem" viewBox="0 0 130 20" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="130" height="20" fill="#9dacbb" />
        <text x="65" y="12" fill="black" font-size="5" text-anchor="middle">Pantalla</text>
    </svg>

    <svg width="30rem" viewBox="0 0 130 90" class="sala_svg" preserveAspectRatio="xMidYMid meet">
        <g v-for="row in rows" :key="row">
            <g v-for="col in getColsForRow(row)" :key="col">
                <rect :x="col * 10 - 10" :y="row * 10 - 10" width="9" height="9" :fill="getSeatColor({ row, col })"
                    @click="() => toggleSeatColor({ row, col })" />
                <text :x="col * 10 - (col > 7 && row >= 4 ? 7.5 : 7.5)" :y="row * 10 - 5" fill="black" font-size="3"
                    @click="() => toggleSeatColor({ row, col })">
                    {{ row }}-{{ col > 7 && row >= 4 ? col - 1 : col }}
                </text>
            </g>
        </g>
    </svg>

    <div class="legend" style="margin-top: 1rem; display: flex; justify-content: center; align-items: center;">
        <div v-for="(color, description) in colorDescription" :key="description"
            style="display: flex; align-items: center; margin-right: 2rem;">
            <svg width="20" height="20">
                <rect width="20" height="20" :fill="color" />
            </svg>
            <span style="margin-left: 0.5rem;">{{ description }}</span>
        </div>
    </div>
</template>