<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ObrasRecientesComponent from '@/components/HomeComponent.vue';
import { useObrasStore } from '@/store/ObrasStore';

export default defineComponent({
    name: 'HomeView',
    components: {
        ObrasRecientesComponent,
        RouterLink, 
    },
    setup() {
        const obrasStore = useObrasStore();
        const router = useRouter();
        const slider = ref<HTMLElement | null>(null);
        let isTransitioning = false;

        const nextSlide = () => {
            if (!isTransitioning && slider.value) {
                isTransitioning = true;
                slider.value.style.transition = 'transform 0.5s ease-in-out';
                slider.value.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    if (slider.value) {
                        const firstSlide = slider.value.firstElementChild as HTMLElement;
                        slider.value.appendChild(firstSlide);
                        slider.value.style.transition = 'none';
                        slider.value.style.transform = 'translateX(0)';
                        isTransitioning = false;
                    }
                }, 500);
            }
        };

        const prevSlide = () => {
            if (!isTransitioning && slider.value) {
                isTransitioning = true;
                slider.value.style.transition = 'none';
                const lastSlide = slider.value.lastElementChild as HTMLElement;
                slider.value.insertBefore(lastSlide, slider.value.firstElementChild);
                slider.value.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    if (slider.value) {
                        slider.value.style.transition = 'transform 0.5s ease-in-out';
                        slider.value.style.transform = 'translateX(0)';
                        isTransitioning = false;
                    }
                }, 0);
            }
        };
        const irAInfoObra = (id: number) => {
            router.push(`/obra/${id}`);
        };

        onMounted(async () => {
            if (obrasStore.obras.length === 0) {
                await obrasStore.cargarObras();
            }
            setInterval(nextSlide, 5000);
        });

        const obrasRecientes = computed(() => obrasStore.obras.sort((a, b) => b.obraID - a.obraID).slice(0, 3));

        return { prevSlide, nextSlide, slider, irAInfoObra, obrasRecientes };
    },
});
</script>

<template>
    <section class="home_container">
        <div class="home_slider-container">
            <div class="home_slider" ref="slider">
                <div class="home_slide">
                    <img src="../assets/slider1.jpg" alt="Image 1">
                </div>
                <div class="home_slide">
                    <img src="../assets/slider2.jpg" alt="Image 2">
                </div>
            </div>
            <svg class="home_prev-button" @click="prevSlide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <svg class="home_next-button" @click="nextSlide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                    d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
        </div>
        <div class="home_cartelera">
            <div class="home_cartelera_div_boton">
                <RouterLink to="/cartelera" class="home_cartelera_boton1" id="botonCartelera">Ver toda la cartelera
                </RouterLink>
            </div>
            <ObrasRecientesComponent :obrasRecientes="obrasRecientes" @comprar="irAInfoObra" />
        </div>
    </section>
</template>