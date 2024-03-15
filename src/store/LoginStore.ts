// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null,
    }),
    getters: {
        estaLogueado: (state) => !!state.usuario,
    },

    actions: {
        async login(nombreUsuario: string, contraseña: string) {
            try {
                const response = await axios.post(`/api/Usuario/login?nombreUsuario=${nombreUsuario}&contraseña=${contraseña}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.usuario = {
                    usuarioID: response.data.usuarioID,
                    nombre: response.data.nombre,
                    nombreUsuario: response.data.nombreUsuario,
                    isAdmin: response.data.isAdmin,
                };
                localStorage.setItem('usuario', JSON.stringify(this.usuario));
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                throw error;
            }
        },
        logout() {
            this.usuario = null;
            localStorage.removeItem('usuario');
        },
    },
});
