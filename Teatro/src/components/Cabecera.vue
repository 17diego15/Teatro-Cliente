<script lang="ts">
import { RouterLink } from 'vue-router'

</script>



<template>
    <div class="header">
        <div class="header_izq">
            <img src="../asserts/logo.png" alt="">
        </div>
        <div class="header_dcha">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/cartelera">Cartelera</RouterLink>
            </nav>
        </div>
    </div>
</template>

