<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    data() {
        return {
            usuarioID: 0,
            nombre: '',
            nombreUsuario: '',
            contraseña: '',
            isAdmin: false,
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch('/api/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usuarioID: this.usuarioID,
                        nombre: this.nombre,
                        nombreUsuario: this.nombreUsuario,
                        contraseña: this.contraseña,
                        isAdmin: this.isAdmin,
                    }),
                });
                if (!response.ok) throw new Error('Error en la solicitud');
                const responseData = await response.json();
            } catch (error) {
                console.error('Error al enviar formulario:', error);
            }
        },
    },
});
</script>

<template>
    <form @submit.prevent="submitForm">
        <input type="text" v-model="nombre" name="nombre" id="nombre" placeholder="nombre">
        <input type="text" v-model="nombreUsuario" name="nombreUsuario" id="nombreUsuario" placeholder="nombre de usuario">
        <input type="text" v-model="contraseña" name="contraseña" id="contraseña" placeholder="contraseña">
        <button type="submit">Enviar</button>
    </form>
</template>