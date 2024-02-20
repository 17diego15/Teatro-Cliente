<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import obra1 from '../assets/impulso.jpg'
import obra2 from '../assets/caminoAlZoo.jpg'

type Obra = {
  // ... tus tipos
}

export default defineComponent({
  name: 'DetalleObraView',
  setup() {
    const obra = ref<Obra | null>(null)
    const route = useRoute()
    const router = useRouter()

    type Obra = {
      id: number
      titulo: string
      director: string
      actores: string[]
      sipnosis: string
      duracion: string
      precio: number
      imagen: string
      fechas: string[]
      hora: string[]
      Disponibilidad: string[]
      sitiosOcupados: string[][]
      reservas: string[]
    }

    onMounted(() => {
      const obraId = Number(route.params.id)
      const obras: Obra[] = [
        {
          id: 1,
          titulo: 'Impulso',
          director: 'Boaz Berman',
          actores: [
            'Palmira Cardo',
            'Aarón Doménech',
            'Daniela Fernanda',
            'María Gayubo',
            'Nuria Luna',
            'Marc Orero',
            'Pako Portalo',
            'María Sabaté',
            'Josie Sinnadurai'
          ],
          sipnosis:
            'Impulso cuenta la historia del viaje de la vida a través de la perspectiva del ritmo y el movimiento. El espectáculo explora los diferentes estados de la vida y las emociones que conviven en ella. El show se caracteriza por tener una mezcla ecléctica musical y rítmica de todas las partes del mundo, oscilando desde patrones que provienen de las percusiones tradicionales africanas, hasta beats electrónicos más contemporáneos. Los artistas conjugan cuerpo y mente como instrumentos, creando ritmos y movimientos hipnotizantes que dejan al espectador sin aliento. El latido o pulso es el tema central del espectáculo, representando el ritmo de la vida en sí mismo. Los artistas utilizan sus propios ritmos como punto de partida, construyendo ritmos y movimientos complejos que reflejan los momentos ascendentes y descendentes del viaje de la vida. Emociones y sensaciones: Impulso es un gaudeamus sensorial con colores vibrantes, movimientos dinámicos y acompasados ritmos que dejan al público completamente pletórico de energía e inspiración. El espectáculo captura todo un enorme abanico de emociones y experiencias humanas, que hacen de Impulso toda una fiesta del ritmo; un show cautivador que lleva al espectador a realizar un viaje a través de los ritmos de la vida.',
          duracion: '90 minutos',
          precio: 12,
          imagen: obra1,
          fechas: ['11/12/2023', '12/12/2023'],
          hora: ['20:00', '18:00'],
          Disponibilidad: ['Si', 'Si'],
          sitiosOcupados: [[], []],
          reservas: []
        },
        {
          id: 2,
          titulo: 'Camino al Zoo',
          director: 'Juan Carlos Rubio',
          actores: ['Fernando Tejero', 'Dani Muriel', 'Mabel del Pozo'],
          sipnosis:
            'A pesar de ser pareja, la vida cotidiana de Peter y Ann está marcada por la incomunicación y la soledad. Rehuyendo el intento de Ann por afrontar la situación, Peter decide pasar el día en el zoológicos de Central Park. Allí conocerá a Jerry, un excéntrico personaje que le obliga a escuchar sus historias hasta la última y más espeluznante de todas: el motivo real de su visita al zoo.',
          duracion: '105 minutos',
          precio: 16,
          imagen: obra2,
          fechas: ['15/12/2023', '16/12/2023'],
          hora: ['20:00', '18:00'],
          Disponibilidad: ['Si', 'Si'],
          sitiosOcupados: [[], []],
          reservas: []
        }
      ]
      obra.value = obras.find((o) => o.id === obraId) || null;

      if (!obra.value) {
        router.push({ name: 'notFound' }) // Asegúrate de que el nombre de la ruta es correcto
      }
    })

    const handleCompraButtonClick = (
      fecha: string,
      hora: string,
      disponibilidad: string,
      sitiosOcupados: any[],
      index: number
    ) => {
      // ... tu lógica de compra
    }

    const volver = () => {
      router.push('/cartelera')
    }

    return { obra, handleCompraButtonClick, volver }
  }
})
</script>

<template>
  <section class="eleccionSala_container" v-if="obra">
    <div class="eleccionSala_container_div" id="eleccionSala_div1">
      <img :src="obra.imagen" alt="Imagen de la obra" v-if="obra.imagen" />
      <div v-if="obra.titulo">
        <h2>{{ obra.titulo }}</h2>
        <p>Teatro ticketon, zaragoza</p>
      </div>
    </div>
    <div class="eleccionSala_div2" id="eleccionSala_div2">
      <div v-for="(fecha, index) in obra.fechas" :key="index">
        <p>{{ fecha }}</p>
        <p>{{ obra.hora[index] }}</p>
        <p>{{ obra.Disponibilidad[index] }}</p>
        <button
          v-if="obra.Disponibilidad[index] === 'Si'"
          @click="
            handleCompraButtonClick(
              fecha,
              obra.hora[index],
              obra.Disponibilidad[index],
              obra.sitiosOcupados[index],
              index
            )
          "
        >
          Comprar
        </button>
        <p v-else>Esta función no está disponible en este horario.</p>
      </div>
    </div>
    <button id="eleccionSala_volver" @click="volver">Volver</button>
  </section>
  <p v-else>Obra no encontrada</p>
</template>
