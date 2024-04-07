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
        const response = await axios.get('http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/Usuario');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    },
    async crearUsuario(nuevoUsuario: Usuario) {
      try {
        const response = await axios.post('http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/Usuario', nuevoUsuario);
        this.usuarios.push(response.data);
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
      }
    },
    async actualizarUsuario(usuarioID: number, usuarioActualizado: Usuario) {
      try {
        await axios.put(`http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/Usuario/${usuarioID}`, usuarioActualizado);
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
        await axios.delete(`http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/Usuario/${usuarioID}`);
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