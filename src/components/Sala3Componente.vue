<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
    name: 'Sala3',
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
    }
});
</script>

<template>
    <svg width="40%" viewBox="-60 0 200 120" class="sala_svg" preserveAspectRatio="xMidYMid meet">
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
</template>