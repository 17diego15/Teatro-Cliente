<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSeatsStore } from '@/store/SalaStore';

export default defineComponent({
  name: 'SeatMap',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const seatsStore = useSeatsStore();

    const state = reactive({
      nombreSala: '',
      numeroFilas: 0,
      numeroColumnas: 0,
      rows: [] as number[],
      cols: [] as number[],
      seats: {} as Record<string, { row: number; col: number; color: string; }>,
      reservasParaEnviar: [] as { funcionID: number; numeroFila: number; numeroColumna: number; }[],
    });

    const defaultColor = '#9dacbb';
    const selectedColor = '#00ff4c';
    const reservedColor = '#ff0000';

    const volver = async () => {
      router.push("/cartelera")
    }

    const cargarSala = async () => {
      const id = Number(route.params.id);
      await seatsStore.cargarSala(id);
      if (seatsStore.sala) {
        state.nombreSala = seatsStore.sala.nombre;
        state.numeroFilas = seatsStore.sala.numeroFilas;
        state.numeroColumnas = seatsStore.sala.numeroColumnas;
        inicializarAsientos();
      }
    };

    const cargarReservas = async () => {
      const id = Number(route.params.id);
      await seatsStore.cargarReservas(id);
      actualizarAsientosReservados();
    };

    const comprarAsientos = async () => {
      const usuarioData = localStorage.getItem('usuario');
      const usuarioID = usuarioData ? JSON.parse(usuarioData).usuarioID : null;
      if (usuarioID === null) {
        console.error('Usuario no identificado');
        return;
      }
      try {
        await seatsStore.comprarAsientos(state.reservasParaEnviar, usuarioID);
        router.push('/');
      } catch (error) {
        console.error('Error al realizar las reservas: ', error);
      }
    };

    const inicializarAsientos = () => {
      state.rows = Array.from({ length: state.numeroFilas }, (_, i) => i + 1);
      state.cols = Array.from({ length: state.numeroColumnas }, (_, i) => i + 1);
      state.rows.forEach(row => {
        state.cols.forEach(col => {
          const key = `row${row}col${col}`;
          state.seats[key] = { row, col, color: defaultColor };
        });
      });
    };

    const actualizarAsientosReservados = () => {
      seatsStore.reservas.forEach(reserva => {
        const key = `row${reserva.numeroFila}col${reserva.numeroColumna}`;
        if (state.seats[key]) {
          state.seats[key].color = reservedColor;
        }
      });
    };

    const getColsForRow = (row: number) => {
      return row >= 4 ? state.cols.filter(col => col !== 7) : state.cols;
    };

    const getSeatColor = ({ row, col }: { row: number; col: number }) => {
      const key = `row${row}col${col}`;
      return state.seats[key] ? state.seats[key].color : '';
    };

    const toggleSeatColor = ({ row, col }: { row: number; col: number }) => {
      const key = `row${row}col${col}`;
      if (state.seats[key]) {
        if (state.seats[key].color === reservedColor) {
          alert('Este asiento ya está ocupado.');
        } else {
          state.seats[key].color = state.seats[key].color === defaultColor ? selectedColor : defaultColor;
          const id = Number(route.params.id);
          const index = state.reservasParaEnviar.findIndex(s => s.numeroFila === row && s.numeroColumna === col);
          if (index !== -1) {
            state.reservasParaEnviar.splice(index,
              1);
          } else {
            state.reservasParaEnviar.push({ funcionID: id, numeroFila: row, numeroColumna: col });
          }
        }
      }
    };
    onMounted(async () => {
      await cargarSala();
      await cargarReservas();
    });

    return {
      ...toRefs(state),
      getColsForRow,
      getSeatColor,
      toggleSeatColor,
      comprarAsientos,
      volver,
      sala: seatsStore.sala, 
    };
  },
});
</script>

<template>
  <div class="sala_container">
    <h2>Bienvenido a la {{ sala?.nombre }}</h2>
    <h2>Haz click en donde te quieres sentar</h2>
    <svg width="40%" viewBox="0 0 200 120" class="sala_svg" preserveAspectRatio="xMidYMid meet">
      <g v-for="row in rows" :key="row">
        <g v-for="col in getColsForRow(row)" :key="col">
          <rect :x="col * 10 - 10" :y="row * 10 - 10" width="9" height="9" :fill="getSeatColor({ row, col })"
            @click="toggleSeatColor({ row, col })" />
          <text :x="col * 10 - (col > 7 && row >= 4 ? 7.5 : 7.5)" :y="row * 10 - 5" fill="black" font-size="3"
            @click="toggleSeatColor({ row, col })">{{ row }}-{{ col > 7 && row >= 4 ? col - 1 : col }}</text>
        </g>
      </g>
    </svg>
    <div class="sala_div">
      <button class="sala_boton" @click="comprarAsientos">Comprar</button>
      <button class="sala_boton" @click="volver">Volver</button>
    </div>
  </div>
</template>
