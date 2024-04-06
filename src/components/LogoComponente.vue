<script setup lang="ts">
import { onMounted, ref, type Ref, onBeforeUnmount } from 'vue';
import logoSrc from '@/assets/logo.png'; // Importar la imagen correctamente

const logoCanvas: Ref<HTMLCanvasElement | null> = ref(null);
let frameId: number | null = null;

onMounted(() => {
    const canvas = logoCanvas.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = logoSrc; // Usar la imagen importada
    image.onload = () => {
        let opacity = 1;
        let fadeIn = false;

        const draw = () => {
            if (!canvas || !ctx) return; // Verificar que el canvas y el ctx existan

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = opacity;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            if (fadeIn) {
                opacity += 0.01;
                if (opacity >= 1) fadeIn = false;
            } else {
                opacity -= 0.01;
                if (opacity <= 0) fadeIn = true;
            }

            frameId = requestAnimationFrame(draw);
        };

        draw();
    };
});

onBeforeUnmount(() => {
    if (frameId) {
        cancelAnimationFrame(frameId);
    }
});
</script>

<template>
    <div>
      <canvas ref="logoCanvas" width="70rem" height="70rem"></canvas>
    </div>
  </template>