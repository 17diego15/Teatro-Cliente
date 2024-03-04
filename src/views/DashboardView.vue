<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Obra {
  obraID: number;
  titulo: string;
  director: string;
  sinopsis: string;
  duración: string;
  precio: number;
  imagen: string;
}

interface Usuario {
  usuarioID: number;
  nombre: string;
  nombreUsuario: string;
  isAdmin: string;
}

interface Funcion {
  funcionID: number;
  obraID: string;
  salaID: string;
  fecha: string;
  hora: string;
  obra: Obra;
}

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const obras = ref<Obra[]>([]);
    const usuarios = ref<Usuario[]>([]);
    const funciones = ref<Funcion[]>([]);

    const seccionActiva = ref('obras');

    const mostrarObras = () => { seccionActiva.value = 'obras'; cargarObras(); };
    const mostrarFunciones = () => { seccionActiva.value = 'funciones'; cargarFunciones() };
    const mostrarUsuarios = () => { seccionActiva.value = 'usuarios'; cargarUsuarios(); };


    const admin = (isAdmin: string | boolean): string => {
      const isAdministrator = typeof isAdmin === 'string' ? isAdmin.toLowerCase() === 'true' : isAdmin;
      return isAdministrator ? 'Es administrador' : 'No es administrador';
    };

    const formatearFecha = (fecha: string): string => {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    };

    const cargarObras = async () => {
      try {
        const respuesta = await fetch('/api/obras');
        if (!respuesta.ok) {
          throw new Error('Error al obtener las obras');
        }
        const data: Obra[] = await respuesta.json();
        obras.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const cargarFunciones = async () => {
      try {
        const respuesta = await fetch('/api/Funcion');
        if (!respuesta.ok) {
          throw new Error('Error al obtener las funciones');
        }
        const data: Funcion[] = await respuesta.json();
        funciones.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch('/api/Usuario');
        if (!respuesta.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data: Usuario[] = await respuesta.json();
        usuarios.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      cargarObras();
      cargarUsuarios();
      cargarFunciones();
    }); return {
      formatearFecha,
      admin,
      obras,
      usuarios,
      funciones,
      seccionActiva,
      mostrarObras,
      mostrarFunciones,
      mostrarUsuarios
    };
  }
});
</script>

<template>
  <div class="dashboard_container">
    <div class="dashboard_menu_container">
      <p @click="mostrarObras">Obras</p>
      <p @click="mostrarFunciones">Funciones</p>
      <p @click="mostrarUsuarios">Usuarios</p>
    </div>
    <div>
      <div class="dashboard_contenido" v-if="seccionActiva === 'obras'">
        <div v-for="obra in obras" :key="obra.obraID">
          {{ obra.titulo }}
        </div>
      </div>
      <div class="dashboard_contenido" v-if="seccionActiva === 'funciones'">
        <div class="dashboard_item" v-for="funcion in funciones" :key="funcion.funcionID">
          <div class="dashboard_contenido_tabla">{{ funcion.funcionID }}</div>
          <div class="dashboard_contenido_tabla">{{ funcion.obra.titulo }}</div>
          <div class="dashboard_contenido_tabla">{{ formatearFecha(funcion.fecha) }}</div>
          <div class="dashboard_contenido_tabla">{{ funcion.hora }}</div>
          <div class="dashboard_iconos">
            <svg class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="dashboard_contenido" v-if="seccionActiva === 'usuarios'">
        <div v-for="usuario in usuarios" :key="usuario.usuarioID">
          {{ usuario.usuarioID }}
          {{ usuario.nombre }}
          {{ usuario.nombreUsuario }}
          {{ admin(usuario.isAdmin) }}
        </div>
      </div>
    </div>
  </div>
</template>