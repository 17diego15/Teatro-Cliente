<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useObrasStore } from '@/store/ObrasStore';
import { useFuncionesStore } from '@/store/FuncionesStore';
import { useUsuariosStore } from '@/store/UsuarioStore';
import { useActoresStore } from '@/store/ActoresStore';
import { useSalasStore } from '@/store/SalasStore';

interface Actor {
  actorId: number
  nombre: string;
}

interface Obra {
  obraID: number;
  titulo: string;
  director: string;
  sinopsis: string;
  duración: string;
  precio: number;
  imagen: string;
  actores?: Actor[];
}

interface Usuario {
  usuarioID: number;
  nombre: string;
  nombreUsuario: string;
  isAdmin: string;
}

interface Funcion {
  funcionID: number;
  obraID: number;
  salaID: number;
  fecha: string;
  hora: string;
  disponibilidad: string;
  obra?: Obra;
}

interface Sala {
  salaID: number;
  nombre: string;
  numeroFilas: number;
  numeroColumnas: number;
}

export default defineComponent({
  name: 'Dashboard',
  setup() {

    const obrasStore = useObrasStore();
    const funcionesStore = useFuncionesStore();
    const usuariosStore = useUsuariosStore();
    const actoresStore = useActoresStore();
    const salasStore = useSalasStore();

    const obras = ref<Obra[]>([]);
    const usuarios = ref<Usuario[]>([]);
    const funciones = ref<Funcion[]>([]);
    const actores = ref<Actor[]>([]);
    const salas = ref<Sala[]>([]);
    const route = useRoute();

    const obraAEditar = ref<Obra | null>(null);
    const funcionAEditar = ref<Funcion | null>(null);
    const usuarioAEditar = ref<Usuario | null>(null);
    const actorAEditar = ref<Actor | null>(null);
    const salaAEditar = ref<Sala | null>(null);
    const mostrandoFormularioEdicion = ref(false);

    const seccionActiva = ref('obras');

    const mostrarObras = () => {
      seccionActiva.value = 'obras';
      mostrandoFormularioEdicion.value = false;
      obraAEditar.value = null;
      cargarObras();
    };
    const mostrarFunciones = () => {
      seccionActiva.value = 'funciones';
      mostrandoFormularioEdicion.value = false;
      funcionAEditar.value = null;
      cargarFunciones();
    };

    const mostrarUsuarios = () => {
      seccionActiva.value = 'usuarios';
      mostrandoFormularioEdicion.value = false;
      usuarioAEditar.value = null;
      cargarUsuarios();
    };

    const mostrarActores = () => {
      seccionActiva.value = 'actores';
      mostrandoFormularioEdicion.value = false;
      actorAEditar.value = null;
      cargarActores();
    };

    const mostrarSalas = () => {
      seccionActiva.value = 'salas';
      mostrandoFormularioEdicion.value = false;
      salaAEditar.value = null;
      cargarSalas();
    };

    const estamosCreando = ref(false);

    const crearObra = () => {
      seccionActiva.value = 'obras';
      obraAEditar.value = {
        obraID: 0,
        titulo: '',
        director: '',
        sinopsis: '',
        duración: '',
        precio: 0,
        imagen: '',
        actores: [],
      };
      mostrandoFormularioEdicion.value = true;
      estamosCreando.value = true;
    };

    const crearFuncion = () => {
      seccionActiva.value = 'funciones';
      funcionAEditar.value = {
        funcionID: 0,
        obraID: 0,
        salaID: 0,
        fecha: '',
        hora: '',
        disponibilidad: '',
      };
      mostrandoFormularioEdicion.value = true;
      estamosCreando.value = true;
    };

    const crearActor = () => {
      seccionActiva.value = 'actores';
      actorAEditar.value = {
        actorId: 0,
        nombre: '',
      };
      mostrandoFormularioEdicion.value = true;
      estamosCreando.value = true;
    };

    const crearSala = () => {
      seccionActiva.value = 'salas';
      salaAEditar.value = {
        salaID: 0,
        nombre: '',
        numeroFilas: 0,
        numeroColumnas: 0,
      };
      mostrandoFormularioEdicion.value = true;
      estamosCreando.value = true;
    };


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

    const editarObra = (obra: Obra) => {
      obraAEditar.value = { ...obra };
      mostrandoFormularioEdicion.value = true;
    };

    const editarFuncion = (funcion: Funcion) => {
      funcionAEditar.value = { ...funcion };
      mostrandoFormularioEdicion.value = true;
    };

    const editarUsuario = (usuario: Usuario) => {
      usuarioAEditar.value = { ...usuario };
      mostrandoFormularioEdicion.value = true;
    };

    const editarActor = (actor: Actor) => {
      actorAEditar.value = { ...actor };
      mostrandoFormularioEdicion.value = true;
    };

    const editarSala = (sala: Sala) => {
      salaAEditar.value = { ...sala };
      mostrandoFormularioEdicion.value = true;
    };

    const cancelarEdicion = () => {
      obraAEditar.value = null;
      mostrandoFormularioEdicion.value = false;
    };

    const añadirActor = () => {
      if (obraAEditar.value) {
        const nuevoActor: Actor = { actorId: 0, nombre: '' };
        obraAEditar.value.actores?.push(nuevoActor);
      }
    };

    const eliminarActor = (index: number) => {
      if (obraAEditar.value && obraAEditar.value.actores) {
        obraAEditar.value.actores.splice(index, 1);
      }
    };

    const eliminarObra = async (id: number) => {
      try {
        await obrasStore.eliminarObra(id);
        await cargarObras();
      } catch (error) {
        console.error('Error al eliminar la obra:', error);
      }
    };

    const cargarObras = async () => {
      await obrasStore.cargarObras();
      obras.value = obrasStore.obras;
    };

    const enviarEdicionObra = async () => {
      if (obraAEditar.value) {
        try {
          if (estamosCreando.value) {
            await obrasStore.crearObra(obraAEditar.value);
          } else {
            await obrasStore.actualizarObra(obraAEditar.value.obraID, obraAEditar.value);
          }
          mostrandoFormularioEdicion.value = false;
          estamosCreando.value = false;
          await cargarObras();
        } catch (error) {
          console.error('Error al guardar la obra:', error);
        }
      }
    };

    const cargarFunciones = async () => {
      await funcionesStore.cargarFunciones();
      funciones.value = funcionesStore.funciones;
    };

    const enviarEdicionFuncion = async () => {
      if (funcionAEditar.value) {
        if (estamosCreando.value) {
          await funcionesStore.crearFuncion(funcionAEditar.value);
        } else {
          await funcionesStore.actualizarFuncion(funcionAEditar.value.funcionID, funcionAEditar.value);
        }
        mostrandoFormularioEdicion.value = false;
        estamosCreando.value = false;
        await cargarFunciones();
      }
    };

    const eliminarFuncion = async (id: number) => {
      await funcionesStore.eliminarFuncion(id);
      await cargarFunciones();
    };

    const cargarUsuarios = async () => {
      await usuariosStore.cargarUsuarios();
      usuarios.value = usuariosStore.usuarios;
    };


    const enviarEdicionUsuario = async () => {
      if (usuarioAEditar.value) {
        const usuarioActualizado = {
          ...usuarioAEditar.value,
          isAdmin: usuarioAEditar.value.isAdmin === 'true',
        };
        try {
          await usuariosStore.actualizarUsuario(usuarioActualizado.usuarioID, usuarioActualizado);
          mostrandoFormularioEdicion.value = false;
          estamosCreando.value = false;
          await cargarUsuarios();
        } catch (error) {
          console.error('Error al enviar el usuario:', error);
        }
      }
    };

    const eliminarUsuario = async (id: number) => {
      await usuariosStore.eliminarUsuario(id);
      await cargarUsuarios();
    };

    const cargarActores = async () => {
      await actoresStore.cargarActores();
      actores.value = actoresStore.actores;
    };


    const enviarEdicionActor = async () => {
      if (actorAEditar.value) {
        if (estamosCreando.value) {
          await actoresStore.crearActor(actorAEditar.value);
        } else {
          await actoresStore.actualizarActor(actorAEditar.value.actorId, actorAEditar.value);
        }
        mostrandoFormularioEdicion.value = false;
        estamosCreando.value = false;
        await cargarActores();
      }
    };

    const eliminarActores = async (id: number) => {
      await actoresStore.eliminarActor(id);
      await cargarActores();
    };

    const cargarSalas = async () => {
      await salasStore.cargarSalas();
      salas.value = salasStore.salas;
    };


    const eliminarSala = async (id: number) => {
      await salasStore.eliminarSala(id);
      await cargarSalas();
    };

    const enviarEdicionSala = async () => {
      if (salaAEditar.value) {
        if (estamosCreando.value) {
          await salasStore.crearSala(salaAEditar.value);
        } else {
          await salasStore.actualizarSala(salaAEditar.value.salaID, salaAEditar.value);
        }
        mostrandoFormularioEdicion.value = false;
        estamosCreando.value = false;
        await cargarSalas();
      }
    };

    onMounted(() => {
      cargarObras();
      cargarUsuarios();
      cargarFunciones();
      cargarActores();
      cargarSalas();
    });
    return {
      formatearFecha,
      admin,
      obras,
      usuarios,
      funciones,
      actores,
      salas,
      seccionActiva,
      mostrarObras,
      mostrarFunciones,
      mostrarUsuarios,
      mostrarActores,
      mostrarSalas,
      obraAEditar,
      funcionAEditar,
      usuarioAEditar,
      actorAEditar,
      salaAEditar,
      mostrandoFormularioEdicion,
      editarObra,
      editarFuncion,
      editarUsuario,
      editarActor,
      editarSala,
      enviarEdicionObra,
      enviarEdicionFuncion,
      enviarEdicionUsuario,
      enviarEdicionActor,
      enviarEdicionSala,
      cancelarEdicion,
      añadirActor,
      eliminarActor,
      eliminarObra,
      eliminarUsuario,
      eliminarActores,
      eliminarSala,
      crearObra,
      crearFuncion,
      crearSala,
      crearActor,
      eliminarFuncion
    };
  }
});
</script>

<template>
  <div class="dashboard_container">
    <div class="dashboard_menu_izquierda">
      <p @click="mostrarObras">Obras</p>
      <!-- <p @click="crearObra">Añadir Obra</p> -->
      <p @click="mostrarFunciones">Funciones</p>
      <!-- <p @click="crearFuncion">Añadir funcion</p> -->
      <p @click="mostrarUsuarios">Usuarios</p>
      <p @click="mostrarActores">Actores</p>
      <!-- <p @click="crearActor">Añadir actor</p> -->
      <p @click="mostrarSalas">Salas</p>
      <!-- <p @click="crearSala">Añadir sala</p> -->

    </div>
    <div class="dashboard_menu_derecha">
      <div v-if="seccionActiva === 'obras' && mostrandoFormularioEdicion && obraAEditar">
        <form @submit.prevent="enviarEdicionObra" class="dashboard_menu_container">
          <div class="dashboard_put">
            <label for="titulo">Título:</label>
            <input id="titulo" type="text" v-model="obraAEditar.titulo" placeholder="Título" />
            <label for="director">Director:</label>
            <input id="director" type="text" v-model="obraAEditar.director" placeholder="Director" />
            <label for="sinopsis">Sinopsis:</label>
            <textarea id="sinopsis" v-model="obraAEditar.sinopsis" placeholder="Sinopsis"></textarea>
            <label for="duracion">Duración:</label>
            <input id="duracion" type="text" v-model="obraAEditar.duración" placeholder="Duración" />
            <label for="precio">Precio:</label>
            <input id="precio" type="number" v-model="obraAEditar.precio" placeholder="Precio" />
            <label for="imagen">URL de la Imagen:</label>
            <input id="imagen" type="text" v-model="obraAEditar.imagen" placeholder="URL de la imagen" />
            <label>Actores:</label>
            <div class="dashboard_put_actores" v-for="(actor, index) in obraAEditar.actores" :key="actor.actorId">
              <input type="text" v-model="actor.actorId" placeholder="Nombre del actor" />
              <button type="button" @click="eliminarActor(index)">Eliminar actor</button>
            </div>
          </div>
          <div class="dashboard_botones">
            <button type="button" @click="añadirActor">Añadir actor</button>
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="dashboard_div_separacion" v-else-if="seccionActiva === 'obras'">
        <button @click="crearObra" class="dashboard_boton">Añadir Nueva Obra</button>
        <div class="dashboard_contenido_obras">
          <div class="dashboard_item dashboard_encabezado">
            <div>Id</div>
            <div>Titulo</div>
            <div>Director</div>
            <div>Precio</div>
            <div>Sipnosis</div>
            <div>Actores</div>
            <div>Acciones</div>
          </div>
          <div class="dashboard_item" v-for="obra in obras" :key="obra.obraID">
            <div>{{ obra.obraID }}</div>
            <div>{{ obra.titulo }}</div>
            <div>{{ obra.director }}</div>
            <div>{{ obra.precio }}€</div>
            <div>{{ obra.sinopsis }}</div>
            <div>{{ obra.actores?.map(actor => actor.nombre).join(', ') }}</div>
            <div class="dashboard_iconos">
              <svg @click="editarObra(obra)" class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg @click="eliminarObra(obra.obraID)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="seccionActiva === 'funciones' && mostrandoFormularioEdicion && funcionAEditar">
        <form @submit.prevent="enviarEdicionFuncion" class="dashboard_menu_container">
          <div class="dashboard_put">
            <label for="obraID">Obra Id:</label>
            <input id="obraID" type="text" v-model="funcionAEditar.obraID" placeholder="Hora">
            <label for="salaID">Sala Id:</label>
            <input id="salaID" type="text" v-model="funcionAEditar.salaID" placeholder="Hora">
            <label for="fecha">Fecha:</label>
            <input id="fecha" type="date" v-model="funcionAEditar.fecha" placeholder="Fecha">
            <label for="hora">Hora:</label>
            <input id="hora" type="text" v-model="funcionAEditar.hora" placeholder="Hora">
            <label for="disponibilidad">Disponibilidad:</label>
            <input id="disponibilidad" type="text" v-model="funcionAEditar.disponibilidad" placeholder="Disponibilidad">
          </div>
          <div class="dashboard_botones">
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="dashboard_div_separacion" v-if="seccionActiva === 'funciones' && !mostrandoFormularioEdicion">
        <button @click="crearFuncion" class="dashboard_boton">Añadir Nueva Funcion</button>

        <div class="dashboard_contenido_funciones">
          <div class="dashboard_item dashboard_encabezado">
            <div>Id Funcion</div>
            <div>Nombre</div>
            <div>Fecha</div>
            <div>Hora</div>
            <div>Acciones</div>
          </div>
          <div class="dashboard_item" v-for="funcion in funciones" :key="funcion.funcionID">
            <div>{{ funcion.funcionID }}</div>
            <div>{{ funcion.obra?.titulo }}</div>
            <div>{{ formatearFecha(funcion.fecha) }}</div>
            <div>{{ funcion.hora }}</div>
            <div class="dashboard_iconos">
              <svg @click="editarFuncion(funcion)" class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg @click="eliminarFuncion(funcion.funcionID)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="seccionActiva === 'usuarios' && mostrandoFormularioEdicion && usuarioAEditar">
        <form @submit.prevent="enviarEdicionUsuario" class="dashboard_menu_container">
          <div class="dashboard_put">
            <label for="isAdmin">Es Admin:</label>
            <select id="isAdmin" v-model="usuarioAEditar.isAdmin">
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
          <div class="dashboard_botones">
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>
      </div>

      <div v-if="seccionActiva === 'usuarios' && !mostrandoFormularioEdicion">
        <div class="dashboard_contenido_usuarios">
          <div class="dashboard_item dashboard_encabezado">
            <div>Id</div>
            <div>Nombre</div>
            <div>Nombre del usuario</div>
            <div>Permisos</div>
            <div>Acciones</div>
          </div>
          <div class="dashboard_item" v-for="usuario in usuarios" :key="usuario.usuarioID">
            <div>{{ usuario.usuarioID }}</div>
            <div>{{ usuario.nombre }}</div>
            <div>{{ usuario.nombreUsuario }}</div>
            <div>{{ admin(usuario.isAdmin) }}</div>
            <div class="dashboard_iconos">
              <svg @click="editarUsuario(usuario)" class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg @click="eliminarUsuario(usuario.usuarioID)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard_div_separacion" v-if="seccionActiva === 'actores' && !mostrandoFormularioEdicion">
        <button @click="crearActor" class="dashboard_boton">Añadir Nueva Actor</button>
        <div class="dashboard_contenido_actores">
          <div class="dashboard_item dashboard_encabezado">
            <div>Id Actor</div>
            <div>Nombre</div>
            <div>Acciones</div>
          </div>
          <div class="dashboard_item" v-for="actor in actores" :key="actor.actorId">
            <div>{{ actor.actorId }}</div>
            <div>{{ actor.nombre }}</div>
            <div class="dashboard_iconos">
              <svg @click="editarActor(actor)" class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg @click="eliminarActores(actor.actorId)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="seccionActiva === 'actores' && mostrandoFormularioEdicion && actorAEditar">
        <form @submit.prevent="enviarEdicionActor" class="dashboard_menu_container">
          <div class="dashboard_put">
            <label for="nombre">Nombre:</label>
            <input id="nombre" type="text" v-model="actorAEditar.nombre" placeholder="Nombre del actor">
          </div>
          <div class="dashboard_botones">
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>
      </div>

      <div v-if="seccionActiva === 'salas' && mostrandoFormularioEdicion && salaAEditar">
        <form @submit.prevent="enviarEdicionSala" class="dashboard_menu_container">
          <div class="dashboard_put">
            <label for="nombre">Nombre sala:</label>
            <input id="nombre" type="text" v-model="salaAEditar.nombre" placeholder="Nombre">
            <label for="numeroFilas">Filas:</label>
            <input id="numeroFilas" type="text" v-model="salaAEditar.numeroFilas" placeholder="Filas">
            <label for="numeroColumnas">Columnas:</label>
            <input id="numeroColumnas" type="text" v-model="salaAEditar.numeroColumnas" placeholder="Columnas">
          </div>
          <div class="dashboard_botones">
            <button type="submit">Guardar cambios</button>
            <button type="button" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="dashboard_div_separacion" v-if="seccionActiva === 'salas' && !mostrandoFormularioEdicion">
        <button @click="crearSala" class="dashboard_boton">Añadir Nueva Sala</button>
        <div class="dashboard_contenido_funciones">
          <div class="dashboard_item dashboard_encabezado">
            <div>Id Sala</div>
            <div>Nombre Sala</div>
            <div>Número Filas</div>
            <div>Número Columnas</div>
            <div>Acciones</div>
          </div>
          <div class="dashboard_item" v-for="sala in salas" :key="sala.salaID">
            <div>{{ sala.salaID }}</div>
            <div>{{ sala.nombre }}</div>
            <div>{{ sala.numeroFilas }}</div>
            <div>{{ sala.numeroColumnas }}</div>
            <div class="dashboard_iconos">
              <svg @click="editarSala(sala)" class="dashboard_contenido_tabla" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
              <svg @click="eliminarSala(sala.salaID)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
