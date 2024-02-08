<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import obra1 from '../asserts/impulso.jpg'
import obra2 from '../asserts/caminoAlZoo.jpg'

type Obra = {
    id: number;
    titulo: string;
    director: string;
    actores: string[];
    sipnosis: string;
    duracion: string;
    precio: number;
    imagen: string;
    fechas: string[];
    hora: string[];
    Disponibilidad: string[];
    sitiosOcupados: string[][];
    reservas: string[];
};

export default defineComponent({
    name: 'DetalleObraView',
    setup() {
        const obra = ref<Obra | null>(null);
        const route = useRoute();
        const router = useRouter();

        onMounted(() => {
            const obraId = route.params.id;
            const obras: Obra[] = [
                {
                    id: 1,
                    titulo: 'Impulso',
                    director: 'Boaz Berman',
                    "actores": [
                        "Palmira Cardo",
                        "Aarón Doménech",
                        "Daniela Fernanda",
                        "María Gayubo",
                        "Nuria Luna",
                        "Marc Orero",
                        "Pako Portalo",
                        "María Sabaté",
                        "Josie Sinnadurai"
                    ],
                    "sipnosis": "Impulso cuenta la historia del viaje de la vida a través de la perspectiva del ritmo y el movimiento. El espectáculo explora los diferentes estados de la vida y las emociones que conviven en ella. El show se caracteriza por tener una mezcla ecléctica musical y rítmica de todas las partes del mundo, oscilando desde patrones que provienen de las percusiones tradicionales africanas, hasta beats electrónicos más contemporáneos. Los artistas conjugan cuerpo y mente como instrumentos, creando ritmos y movimientos hipnotizantes que dejan al espectador sin aliento. El latido o pulso es el tema central del espectáculo, representando el ritmo de la vida en sí mismo. Los artistas utilizan sus propios ritmos como punto de partida, construyendo ritmos y movimientos complejos que reflejan los momentos ascendentes y descendentes del viaje de la vida. Emociones y sensaciones: Impulso es un gaudeamus sensorial con colores vibrantes, movimientos dinámicos y acompasados ritmos que dejan al público completamente pletórico de energía e inspiración. El espectáculo captura todo un enorme abanico de emociones y experiencias humanas, que hacen de Impulso toda una fiesta del ritmo; un show cautivador que lleva al espectador a realizar un viaje a través de los ritmos de la vida.",
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
                    actores: [
                        "Fernando Tejero",
                        "Dani Muriel",
                        "Mabel del Pozo"
                    ],
                    "sipnosis": "A pesar de ser pareja, la vida cotidiana de Peter y Ann está marcada por la incomunicación y la soledad. Rehuyendo el intento de Ann por afrontar la situación, Peter decide pasar el día en el zoológicos de Central Park. Allí conocerá a Jerry, un excéntrico personaje que le obliga a escuchar sus historias hasta la última y más espeluznante de todas: el motivo real de su visita al zoo.",
                    duracion: '105 minutos',
                    precio: 16,
                    imagen: obra2,
                    fechas: ['15/12/2023', '16/12/2023'],
                    hora: ['20:00', '18:00'],
                    Disponibilidad: ['Si', 'Si'],
                    sitiosOcupados: [[], []],
                    reservas: []
                },
            ];
            obra.value = obras.find((o) => o.id === Number(obraId)) || null;
        });

        const comprarObra = (id: number) => {
            router.push(`/compra/${id}`);
        };

        return { obra, comprarObra };
    },
});
</script>

<template>
    <div class="infoObras_sectionContainer" v-if="obra">
        <div class="infoObras_section_div">
            <div class="infoObras_section_izq">
                <img :src="obra.imagen" :alt="'Imagen de ' + obra.titulo" class="infoObras_section_izq_img">
            </div>

            <div class="infoObras_section_central">
                <h2>{{ obra.titulo }}</h2>
                <p><strong>Director:</strong></p>
                <p>{{ obra.director }}</p>
                <p><strong>Actores:</strong></p>
                <p>{{ obra.actores.join(', ') }}</p>
                <p><strong>Sinopsis:</strong> </p>
                <p>{{ obra.sipnosis }}</p>
            </div>

            <div class="infoObras_section_dcha">
                <div class="infoObras_section_dcha_div1">
                    <p><strong>Duración:</strong></p>
                    <p>{{ obra.duracion }}</p>
                </div>
                <div class="infoObras_section_dcha_div2">
                    <p><strong>Precio:</strong></p>
                    <p>{{ obra.precio }}€</p>
                </div>
            </div>

        </div>

        <div class="infoObras_section_boton">
            <button @click="comprarObra(obra.id)">Comprar</button>
        </div>

    </div>
</template>