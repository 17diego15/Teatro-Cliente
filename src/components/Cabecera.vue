<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  props: {
    nombreUsuario: String
  },
  setup(_, { emit }) {
    function actualizarNombreUsuario() {
      emit('logout');
    }
    
    return {
      actualizarNombreUsuario
    };
  }
});
</script>
<template>
    <div class="header">
        <div class="header_izq">
            <img src="../assets/logo.png" alt="logo">
        </div>
        <div class="header_dcha">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/cartelera">Cartelera</RouterLink>

                <RouterLink v-if="nombreUsuario" to="/perfil">{{ nombreUsuario }}</RouterLink>
                <RouterLink v-else to="/login">Iniciar Sesión</RouterLink>

                <button v-if="nombreUsuario" class="header_boton" @click="actualizarNombreUsuario">Cerrar Sesión</button>
            </nav>
        </div>
    </div>
</template>