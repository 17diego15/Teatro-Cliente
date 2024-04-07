import { defineStore } from 'pinia';
import axios from 'axios';

interface Usuario {
    usuarioID: number;
    nombre: string;
    nombreUsuario: string;
    isAdmin: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null as Usuario | null,
    }),
    getters: {
        estaLogueado: (state) => !!state.usuario,
    },

    actions: {
        async login(nombreUsuario: string, contraseña: string) {
            try {
                const response = await axios.post('http://a2be0c14db8ce4a91900b9e17cea92a6-1532791566.us-east-1.elb.amazonaws.com/Usuario/login', {
                    nombre: nombreUsuario,
                    contraseña: contraseña,
                }, {
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