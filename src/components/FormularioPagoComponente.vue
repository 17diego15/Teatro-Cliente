<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'FormularioPago',
    setup(_, { emit }) {
        const numeroTarjeta = ref('');
        const mesCaducidad = ref('');
        const anioCaducidad = ref('');
        const cvv = ref('');

        const submitForm = () => {
            if (!/^\d{16}$/.test(numeroTarjeta.value)) {
                alert('El número de tarjeta debe tener 16 dígitos.');
                return;
            }

            if (!/^(0[1-9]|1[0-2])$/.test(mesCaducidad.value)) {
                alert('El mes de caducidad debe estar entre 01 y 12.');
                return;
            }

            if (!/^\d{2}$/.test(anioCaducidad.value)) {
                alert('El año de caducidad debe tener 2 dígitos.');
                return;
            }

            if (!/^\d{3}$/.test(cvv.value)) {
                alert('El CVV debe tener 3 dígitos.');
                return;
            }

            console.log('Formulario enviado');
            emit('onSubmitSuccess');
        };

        return {
            numeroTarjeta,
            mesCaducidad,
            anioCaducidad,
            cvv,
            submitForm
        };
    },
});
</script>

<template>
    <section class="infoPago_Container">
        <div class="infoPago_div1">
            <form class="infoPago_tarjeta" @submit.prevent="submitForm">
                <label for="numeroTarjeta">Número de tarjeta</label>
                <input type="text" id="numeroTarjeta" name="numeroTarjeta" v-model="numeroTarjeta"
                    placeholder="Ingrese el número de tarjeta">

                <label for="caducidad">Caducidad</label>
                <div class="infoPago_caducidadContainer">
                    <input type="text" id="mesCaducidad" name="mesCaducidad" v-model="mesCaducidad" placeholder="MM">
                    <input type="text" id="anioCaducidad" name="anioCaducidad" v-model="anioCaducidad" placeholder="YY">
                </div>
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" v-model="cvv" placeholder="Ingrese el código CVV">
                <button class="infoPago_boton" type="submit">Enviar</button>
            </form>
        </div>
    </section>
</template>