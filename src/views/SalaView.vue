<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface Seat {
  row: number;
  col: number;
  color: string;
}

export default defineComponent({
  name: 'SeatMap',
  setup() {
    const rows = Array.from({ length: 12 }, (_, i) => i + 1);
    const cols = Array.from({ length: 13 }, (_, i) => i + 1);
    const defaultColor = '#9dacbb';
    const selectedColor = '#00ff4c';

    const seats = reactive<Record<string, Seat>>({});

    rows.forEach(row => {
      cols.forEach(col => {
        if (!(row >= 4 && col === 7)) {
          const key = `row${row}col${col}`;
          seats[key] = { row, col, color: defaultColor };
        }
      });
    });

    const getColsForRow = (row: number) => {
      return row >= 4 ? cols.filter(col => col !== 7) : cols;
    };

    const getSeatColor = ({ row, col }: { row: number; col: number }): string => {
      const key = `row${row}col${col}`;
      return seats[key] ? seats[key].color : '';
    };

    const toggleSeatColor = ({ row, col }: { row: number; col: number }): void => {
      const key = `row${row}col${col}`;
      if (seats[key]) {
        seats[key].color = seats[key].color === defaultColor ? selectedColor : defaultColor;
        
        let displayCol = col;
        if (row >= 4 && col > 7) {
          displayCol -= 1;
        }
        
        console.log(`Fila ${row}, Asiento ${displayCol}`); 
      }
    };

    return {
      rows,
      getColsForRow,
      getSeatColor,
      toggleSeatColor,
    };
  },
});
</script>
<template>
    <div class="sala_container">
        <h2>Haz click en donde te quieres sentar</h2>
        <svg width="30%" height="100%" viewBox="0 0 140 130" preserveAspectRatio="xMidYMid meet">
            <g v-for="row in rows" :key="row">
                <rect v-for="col in getColsForRow(row)" :key="col" :x="col * 10 - 10" :y="row * 10 - 10" width="9"
                    height="9" :fill="getSeatColor({ row, col })" @click="toggleSeatColor({ row, col })" />
            </g>
        </svg>
    </div>
</template>
