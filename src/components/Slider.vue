<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import imagen1 from '../assets/slider1.jpg';
import imagen2 from '../assets/slider2.jpg';

export default defineComponent({
    name: 'Slider',
    setup() {
        const slider = ref<HTMLElement | null>(null);
        const obrasAleatorias = ref([
            { id: 1, imagen: imagen1 },
            { id: 2, imagen: imagen2 },
            { id: 3, imagen: imagen2 },
        ]);
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

        onMounted(() => {
            setInterval(nextSlide, 5000);
        });

        return { prevSlide, nextSlide, slider, obrasAleatorias };
    },
});
</script>

<template>
    <div class="home_slider-container">
        <div class="home_slider" ref="slider">
            <div v-for="obra in obrasAleatorias" :key="obra.id" class="home_slide">
                <img :src="obra.imagen" :alt="'Image ' + obra.id">
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
</template>