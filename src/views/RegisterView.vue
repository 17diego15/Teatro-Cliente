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
    <div class="register_container">
        <form @submit.prevent="submitForm" class="formulario">
            <input type="text" v-model="nombre" name="nombre" id="nombre" placeholder="Nombre">
            <input type="text" v-model="nombreUsuario" name="nombreUsuario" id="nombreUsuario"
                placeholder="Nombre de usuario">
            <input type="password" v-model="contraseña" name="contraseña" id="contraseña" placeholder="Contraseña">
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<style>
.formulario {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Espaciado entre elementos */
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
}

.formulario input[type="text"],
.formulario input[type="password"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    /* Elimina el borde azul al hacer foco */
}

.formulario input[type="text"]:focus,
.formulario input[type="password"]:focus {
    border-color: #007bff;
    /* Cambia el color del borde al hacer foco */
}

.formulario button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* Transición suave del color */
}

.formulario button:hover {
    background-color: #0056b3;
    /* Oscurece el botón al pasar el mouse */
}</style>