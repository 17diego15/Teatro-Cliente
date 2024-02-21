<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Obra {
    obraID: number;
    titulo: string;
    director: string;
    sinopsis: string;
    duración: string;
    precio: number;
    imagen: string;
}

export default defineComponent({
    name: 'DetalleObraView',
    setup() {
        const obra = ref<Obra | null>(null);
        const route = useRoute();
        const router = useRouter();

        //boton
        const comprarObra = (id: number) => {
            //cambiar ruta
            window.location.href = `/obra/${id}`;
        };

        const cargarObra = async () => {
            const id = Number(route.params.id);
            try {
                const respuesta = await fetch(`/api/obras/${id}`)
                if (!respuesta.ok) {
                    throw new Error(`Error al obtener la obra: ${id}`)
                }
                const data: Obra = await respuesta.json();
                obra.value = data;
            } catch (error) {
                console.error(error)
            }
        };
        onMounted(() => {
            cargarObra();
        });
        return { obra, comprarObra };
    }
});
</script>

<template>
    <div v-if="obra" class="infoObras_sectionContainer">
        <div class="infoObras_section_div">
            <div class="infoObras_section_izq">
                <img :src="obra.imagen" :alt="'Imagen de ' + obra.titulo" class="infoObras_section_izq_img">
            </div>

            <div class="infoObras_section_central">
                <h2>{{ obra.titulo }}</h2>
                <p><strong>Director:</strong></p>
                <p>{{ obra.director }}</p>
                <p><strong>Actores:</strong></p>
                <!-- <p>{{ obra.actores.join(', ') }}</p> -->
                <p><strong>Sinopsis:</strong> </p>
                <p>{{ obra.sinopsis }}</p>
            </div>

            <div class="infoObras_section_dcha">
                <div class="infoObras_section_dcha_div1">
                    <p><strong>Duración:</strong></p>
                    <p>{{ obra.duración }}</p>
                </div>
                <div class="infoObras_section_dcha_div2">
                    <p><strong>Precio:</strong></p>
                    <p>{{ obra.precio }}€</p>
                </div>
            </div>

        </div>

        <div class="infoObras_section_boton">
            <button @click="comprarObra(obra.obraID)">Comprar</button>
        </div>
    </div>
</template>