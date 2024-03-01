<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Seat {
  row: number;
  col: number;
  color: string;
}

interface Reserva {
  reservaID: number;
  funciónID: number;
  numeroFila: number;
  numeroColumna: number;
}

export default defineComponent({
  name: 'SeatMap',
  setup() {
    const reservas = ref<Reserva[]>([]);
    const router = useRouter();
    const route = useRoute();

    const cargarReservas = async () => {
      try {
        const id = Number(route.params.id);
        const respuesta = await fetch(`/api/Reserva/funcion/${id}`);
        if (!respuesta.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const data: Reserva[] = await respuesta.json();
        reservas.value = data;
        actualizarAsientosReservados();
      } catch (error) {
        console.error(error);
      }
    };
    
    onMounted(() => {
      cargarReservas();
    });

    const rows = Array.from({ length: 12 }, (_, i) => i + 1);
    const cols = Array.from({ length: 13 }, (_, i) => i + 1);
    const defaultColor = '#9dacbb';
    const selectedColor = '#00ff4c';
    const reservedColor = '#ff0000';

    const seats = reactive<Record<string, Seat>>({});

    rows.forEach(row => {
      cols.forEach(col => {
        if (!(row >= 4 && col === 7)) {
          const key = `row${row}col${col}`;
          seats[key] = { row, col, color: defaultColor };
        }
      });
    });

    const actualizarAsientosReservados = () => {
      reservas.value.forEach((reserva) => {
        const key = `row${reserva.numeroFila}col${reserva.numeroColumna}`;
        if (seats[key]) {
          seats[key].color = reservedColor;
        }
      });
    };

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
        if (seats[key].color === reservedColor) {
          // Mostrar mensaje de alerta si el asiento está reservado
          alert('Este asiento ya está ocupado.');
        } else {
          // Cambiar el color si el asiento no está reservado
          seats[key].color = seats[key].color === defaultColor ? selectedColor : defaultColor;
        }
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
        <rect v-for="col in getColsForRow(row)" :key="col" :x="col * 10 - 10" :y="row * 10 - 10" width="9" height="9"
          :fill="getSeatColor({ row, col })" @click="toggleSeatColor({ row, col })" />
      </g>
    </svg>
  </div>
</template>
