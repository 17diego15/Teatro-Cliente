<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
            const router = useRouter(); // Obtén la instancia del router
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
                this.$router.push('/');
            } catch (error) {
                console.error('Error al enviar formulario:', error);
            }
        },
    },
});
</script>

<template>
    <div class="register_container">
        <form @submit.prevent="submitForm" class="register_formulario">
            <h2>Registrate</h2>
            <input type="text" v-model="nombre" name="nombre" id="nombre" placeholder="Nombre">
            <input type="text" v-model="nombreUsuario" name="nombreUsuario" id="nombreUsuario"
                placeholder="Nombre de usuario">
            <input type="password" v-model="contraseña" name="contraseña" id="contraseña" placeholder="Contraseña">
            <button type="submit">Enviar</button>
            <p>¿Tienes una cuenta? <RouterLink to="/login">Inicia sesion</RouterLink></p>
        </form>
    </div>
</template>