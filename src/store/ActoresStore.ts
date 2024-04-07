import { defineStore } from 'pinia';
import axios from 'axios';

interface Actor {
  actorId: number;
  nombre: string;
}

export const useActoresStore = defineStore('actores', {
  state: () => ({
    actores: [] as Actor[],
  }),
  actions: {
    async cargarActores() {
      try {
        const response = await axios.get('/api/actor');
        this.actores = response.data;
      } catch (error) {
        console.error('Error al cargar los actores:', error);
      }
    },
    async crearActor(nuevoActor: Actor) {
      try {
        const response = await axios.post('/api/actor', nuevoActor);
        this.actores.push(response.data);
      } catch (error) {
        console.error('Error al crear el actor:', error);
        throw error;
      }
    },
    async actualizarActor(actorId: number, actorActualizado: Actor) {
      try {
        await axios.put(`/api/actor/${actorId}`, actorActualizado);
        const index = this.actores.findIndex(actor => actor.actorId === actorId);
        if (index !== -1) {
          this.actores[index] = actorActualizado;
        }
      } catch (error) {
        console.error('Error al actualizar el actor:', error);
        throw error;
      }
    },
    async eliminarActor(actorId: number) {
      try {
        await axios.delete(`/api/actor/${actorId}`);
        const index = this.actores.findIndex(actor => actor.actorId === actorId);
        if (index !== -1) {
          this.actores.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar el actor:', error);
        throw error;
      }
    },
  },
});
