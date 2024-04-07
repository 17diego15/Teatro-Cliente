import { defineStore } from 'pinia';
import axios from 'axios';

interface Usuario {
  usuarioID: number;
  nombre: string;
  nombreUsuario: string;
  isAdmin: boolean;
}

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    usuarios: [] as Usuario[],
  }),
  actions: {
    async cargarUsuarios() {
      try {
        const response = await axios.get('/api/Usuario');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    },
    async crearUsuario(nuevoUsuario: Usuario) {
      try {
        const response = await axios.post('/api/Usuario', nuevoUsuario);
        this.usuarios.push(response.data);
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
      }
    },
    async actualizarUsuario(usuarioID: number, usuarioActualizado: Usuario) {
      try {
        await axios.put(`/api/Usuario/${usuarioID}`, usuarioActualizado);
        const index = this.usuarios.findIndex(u => u.usuarioID === usuarioID);
        if (index !== -1) {
          this.usuarios[index] = usuarioActualizado;
        }
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
      }
    },
    async eliminarUsuario(usuarioID: number) {
      try {
        await axios.delete(`/api/Usuario/${usuarioID}`);
        const index = this.usuarios.findIndex(u => u.usuarioID === usuarioID);
        if (index !== -1) {
          this.usuarios.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
      }
    },
  },
});