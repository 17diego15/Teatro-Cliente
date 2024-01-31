<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import slider1 from '../asserts/slider1.jpg';
import slider2 from '../asserts/slider2.jpg';

export default defineComponent({
    name: 'HomeSlider',
    setup() {
        const originalSlides = [
            { image: slider1, altText: 'Imagen 1' },
            { image: slider2, altText: 'Imagen 2' },
        ];
        const slides = ref([...originalSlides, ...originalSlides]); // Duplicamos las diapositivas
        const currentIndex = ref(0);
        const isTransitioning = ref(false);

        const sliderStyle = computed(() => ({
            transform: `translateX(-${100 * currentIndex.value}%)`,
            transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none',
        }));

        function nextSlide() {
            if (!isTransitioning.value && slides.value.length > 1) {
                isTransitioning.value = true;

                currentIndex.value++;

                setTimeout(() => {
                    if (currentIndex.value >= originalSlides.length) {
                        currentIndex.value = 0;
                        nextTick(() => {
                            isTransitioning.value = false;
                        });
                    } else {
                        isTransitioning.value = false;
                    }
                }, 500);
            }
        }

        function prevSlide() {
            if (!isTransitioning.value && slides.value.length > 1) {
                isTransitioning.value = true;

                currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : slides.value.length - 1;

                setTimeout(() => {
                    if (currentIndex.value === 0) {
                        currentIndex.value = originalSlides.length;
                        nextTick(() => {
                            isTransitioning.value = false;
                        });
                    } else {
                        isTransitioning.value = false;
                    }
                }, 500);
            }
        }

        let intervalId: number;
        onMounted(() => {
            intervalId = setInterval(nextSlide, 3000);
        });

        onBeforeUnmount(() => {
            clearInterval(intervalId);
        });

        return { slides, sliderStyle, nextSlide, prevSlide };
    }
});
</script>



<template>
    <section class="home_container">
        <div class="home_slider-container">
            <div class="home_slider" :style="sliderStyle">
                <div class="home_slide" v-for="(slide, index) in slides" :key="index">
                    <img :src="slide.image" :alt="slide.altText">
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
                <button class="home_cartelera_boton1" id="botonCartelera">Ver toda la cartelera</button>
            </div>
            <div class="home_cartelera_div" id="obrasContainer">
                <!-- Contenido de la cartelera aquí -->
            </div>
        </div>
    </section>
</template>
