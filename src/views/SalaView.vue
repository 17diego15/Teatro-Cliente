<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSeatsStore } from '@/store/SalaStore';
import Sala1 from '@/components/Sala1Componente.vue';
import Sala2 from '@/components/Sala2Componente.vue';
import Sala3 from '@/components/Sala3Componente.vue';
import Sala4 from '@/components/Sala4Componente.vue';
import Sala5 from '@/components/Sala5Componente.vue';
import Sala6 from '@/components/Sala6Componente.vue';
import FormularioPago from '@/components/FormularioPagoComponente.vue'
import Sala from '@/components/SalaNombreComponente.vue';

export default defineComponent({
  name: 'SeatMap',
  components: {
    Sala1,
    Sala2,
    Sala3,
    Sala4,
    Sala5,
    Sala6,
    Sala,
    FormularioPago
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const seatsStore = useSeatsStore();
    console.log(seatsStore)
    const sala = computed(() => seatsStore.sala);

    const state = reactive({
      nombreSala: '',
      numeroFilas: 0,
      numeroColumnas: 0,
      rows: [] as number[],
      cols: [] as number[],
      seats: {} as Record<string, { row: number; col: number; color: string; }>,
      reservasParaEnviar: [] as { funcionID: number; numeroFila: number; numeroColumna: number; }[],
      mostrarFormularioPago: false,
    });

    const defaultColor = '#9dacbb';
    const selectedColor = '#00ff4c';
    const reservedColor = '#ff0000';

    const volver = async () => {
      router.push("/cartelera")
    }

    const cerrarModal = () => {
      state.mostrarFormularioPago = false;
    };

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

    const comprarAsientos = () => {
      if (state.reservasParaEnviar.length > 0) {
        state.mostrarFormularioPago = true;
      }
    };

    const finalizarCompra = async () => {
      try {
        const usuarioData = localStorage.getItem('usuario');
        const usuarioID = usuarioData ? JSON.parse(usuarioData).usuarioID : null;
        await seatsStore.comprarAsientos(state.reservasParaEnviar, usuarioID);
        const funcionID = Number(route.params.id);
        await seatsStore.enviarPedido(usuarioID, funcionID, state.reservasParaEnviar);

        cerrarModal();
        state.mostrarFormularioPago = false;
        router.push('/');
      } catch (error) {
        console.error('Error al realizar las reservas: ', error);
      }
      state.mostrarFormularioPago = false;
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
      console.log(seatsStore.sala);
    });
    return {
      ...toRefs(state),
      getColsForRow,
      getSeatColor,
      toggleSeatColor,
      comprarAsientos,
      volver,
      sala,
      finalizarCompra,
      cerrarModal,
    };
  },
});
</script>

<template>
  <div class="sala_container">
    <Sala :nombreSala="sala?.nombre" />
    <Sala1 v-if="sala?.salaID === 1" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <Sala2 v-else-if="sala?.salaID === 2" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <Sala3 v-else-if="sala?.salaID === 3" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <Sala4 v-else-if="sala?.salaID === 4" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <Sala5 v-else-if="sala?.salaID === 5" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <Sala6 v-else-if="sala?.salaID === 6" :rows="rows" :getColsForRow="getColsForRow" :getSeatColor="getSeatColor"
      :toggleSeatColor="toggleSeatColor" />
    <div v-if="mostrarFormularioPago" class="modal" @click.self="cerrarModal">
      <div class="modal-content">
        <span class="close-modal" @click="cerrarModal">&times;</span>
        <FormularioPago @onSubmitSuccess="finalizarCompra" />
      </div>
    </div>
    <div class="sala_div">
      <button class="sala_boton" @click="comprarAsientos">Comprar</button>
      <button class="sala_boton" @click="volver">Volver</button>
    </div>
  </div>
</template>
