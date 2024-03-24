<script lang="ts">
export default {
    name: 'Sala1',
    props: {
        rows: Array,
        getColsForRow: Function,
        getSeatColor: Function,
        toggleSeatColor: Function,
    }
}
</script>
<template>
    <svg width="40%" viewBox="-50 0 200 120" class="sala_svg" preserveAspectRatio="xMidYMid meet">
        <g v-for="row in rows" :key="row">
            <g v-for="col in getColsForRow(row)" :key="col">
                <rect :x="col * 10 - 10" :y="row * 10 - 10" width="9" height="9" :fill="getSeatColor({ row, col })"
                    @click="() => toggleSeatColor({ row, col })" />
                <text :x="col * 10 - (col > 7 && row >= 4 ? 7.5 : 7.5)" :y="row * 10 - 5" fill="black" font-size="3"
                    @click="() => toggleSeatColor({ row, col })">{{ row }}-{{ col > 7 && row >= 4 ? col - 1 : col
                    }}</text>
            </g>
        </g>
    </svg>
</template>