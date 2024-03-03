<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Ref } from 'vue';

interface Seat {
  row: number;
  col: number;
  color: string;
}

interface Sala {
  salaID: number;
  nombre: string;
  numeroFilas: number;
  numeroColumnas: number;
}

interface Reserva {
  reservaID: number;
  funciónID: number;
  numeroFila: number;
  numeroColumna: number;
  sala: Sala;
}

export default defineComponent({
  name: 'SeatMap',
  setup() {
    const reservas = ref<Reserva[]>([]);
    const sala = ref<Sala | null>(null);
    const router = useRouter();
    const route = useRoute();
    const numeroFilas = ref<number>(0);
    const numeroColumnas = ref<number>(0);
    const nombreSala = ref<string>();
    const rows: Ref<number[]> = ref([]);
    const cols: Ref<number[]> = ref([]);


    const cargarReservas = async () => {
      try {
        const id = Number(route.params.id);
        const respuesta = await fetch(`/api/funcion/${id}/reservas`);

        if (!respuesta.ok) {
          throw new Error('Error al obtener las reservas');
        }

        const data: Reserva[] = await respuesta.json();
        reservas.value = data;
        actualizarAsientosReservados();

        console.log("Reservas cargadas para la función " + id);
      } catch (error) {
        console.error(error);
      }
    };

    const cargarSala = async () => {
      try {
        const id = Number(route.params.id);
        const respuesta = await fetch(`/api/Funcion/${id}`);

        if (!respuesta.ok) {
          throw new Error('Error al obtener los detalles de la sala');
        }

        const data = await respuesta.json();
        sala.value = data.sala; 
        nombreSala.value = data.sala?.nombre;
        numeroFilas.value = data.sala?.numeroFilas || 0;
        numeroColumnas.value = data.sala?.numeroColumnas || 0;

        inicializarAsientos();

        console.log("Sala cargada: " + data.sala?.nombre);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      cargarSala().then(() => {
        cargarReservas(); 
      });
    });

    const defaultColor = '#9dacbb';
    const selectedColor = '#00ff4c';
    const reservedColor = '#ff0000';

    const seats = reactive<Record<string, Seat>>({});

    const inicializarAsientos = () => {
      rows.value = Array.from({ length: numeroFilas.value }, (_, i) => i + 1);
      cols.value = Array.from({ length: numeroColumnas.value }, (_, i) => i + 1);

      rows.value.forEach((row: number) => {
        cols.value.forEach((col: number) => {
          if (!(row >= 4 && col === 7)) {
            const key = `row${row}col${col}`;
            seats[key] = { row, col, color: defaultColor };
          }
        });
      });
    };


    const actualizarAsientosReservados = () => {
      reservas.value.forEach((reserva) => {
        let adjustedCol = reserva.numeroColumna;
        if (reserva.numeroFila >= 4 && reserva.numeroColumna >= 7) {
          adjustedCol += 1;
        }
        const key = `row${reserva.numeroFila}col${adjustedCol}`;
        if (seats[key]) {
          seats[key].color = reservedColor;
        }
      });
    };

    const getColsForRow = (row: number) => {
      return row >= 4 ? cols.value.filter((col: number) => col !== 7) : cols.value;
    };

    const getSeatColor = ({ row, col }: { row: number; col: number }): string => {
      const key = `row${row}col${col}`;
      return seats[key] ? seats[key].color : '';
    };

    const toggleSeatColor = ({ row, col }: { row: number; col: number }): void => {
      const key = `row${row}col${col}`;
      if (seats[key]) {
        if (seats[key].color === reservedColor) {
          alert('Este asiento ya está ocupado.');
        } else {
          seats[key].color = seats[key].color === defaultColor ? selectedColor : defaultColor;
          let displayCol = col;
          if (row >= 4 && col > 7) {
            displayCol -= 1;
          }
          console.log(`Fila ${row}, Asiento ${displayCol}`);
        }
      }
    };

    return {
      sala,
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
    <h2>Bienvenido a la {{ sala?.nombre }}</h2>
    <h2>Haz click en donde te quieres sentar</h2>
    <svg width="30%" viewBox="0 0 200 120" class="sala_svg" preserveAspectRatio="xMidYMid meet">
      <g v-for="row in rows" :key="row">
        <rect v-for="col in getColsForRow(row)" :key="col" :x="col * 10 - 10" :y="row * 10 - 10" width="9" height="9"
          :fill="getSeatColor({ row, col })" @click="toggleSeatColor({ row, col })" />
      </g>
    </svg>
    <div class="sala_div">
      <button class="sala_boton">Comprar</button>
      <button class="sala_boton">Volver</button>
    </div>

  </div>
</template>
