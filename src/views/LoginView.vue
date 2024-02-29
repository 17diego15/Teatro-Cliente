<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup(_, { emit }) {
    const NombreUsuario = ref('');
    const Contraseña = ref('');
    const router = useRouter();

    const submitForm = async () => {
      try {
        const response = await fetch(`/api/Usuario/login?nombreUsuario=${NombreUsuario.value}&contraseña=${Contraseña.value}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(`Error en la solicitud: ${errorResponse.detail}`);
        }
        const responseData = await response.json();
        emit('usuario-logueado', NombreUsuario.value);
        router.push('/');
      } catch (error) {
        console.error('Error al enviar formulario:', error);
      }
    };

    return {
      NombreUsuario,
      Contraseña,
      submitForm
    };
  },
});
</script>

<template>
    <div class="register_container">
        <form @submit.prevent="submitForm" class="register_formulario">
            <h2>Iniciar sesión</h2>
            <input type="text" v-model="NombreUsuario" name="nombreUsuario" id="nombreUsuario"
                placeholder="Nombre de usuario">
            <input type="password" v-model="Contraseña" name="contraseña" id="contraseña" placeholder="Contraseña">
            <button type="submit">Enviar</button>
            <p>¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
            </p>
        </form>
    </div>
</template>