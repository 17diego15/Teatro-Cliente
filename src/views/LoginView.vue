<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/LoginStore';
import LoginForm from '@/components/LoginFormComponente.vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const onLoginSuccess = () => {
      router.push('/');
    };

    return { onLoginSuccess };
  }
});
</script>

<template>
  <div class="login_section">
    <LoginForm @login-success="onLoginSuccess" />
  </div>
</template>