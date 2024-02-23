<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

interface Actor {
    nombre: string;
}

interface Obra {
    obraID: number;
    titulo: string;
    director: string;
    sinopsis: string;
    duración: string;
    precio: number;
    imagen: string;
    actores: Actor[];
}

export default defineComponent({
    name: 'DetalleObraView',
    setup() {
        const obra = ref<Obra | null>(null);
        const route = useRoute();
        const router = useRouter();

        const comprarObra = (id: number) => {
            router.push(`/obra/${id}`)
        };

        const cargarObra = async () => {
            const id = Number(route.params.id);
            try {
                const respuesta = await fetch(`/api/obras/${id}`)
                console.log(respuesta)

                if (!respuesta.ok) {
                    throw new Error(`Error al obtener la obra: ${id}`)
                }
                const data: Obra = await respuesta.json();
                obra.value = data;
                obra.value = {
                    ...data,
                    actores: data.actores.map((actor: any) => actor.nombre) 
                };

            } catch (error) {
                console.error(error)
            }
        };
        onMounted(() => {
            cargarObra();
        });
        console.log(obra)
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
                <p>{{ obra.actores.join(', ') }}</p>
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