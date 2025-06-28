<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

// Ocultar la navegación en rutas del builder, preview, templates y help
const showNavigation = computed(() => {
  return route.name !== 'builder' && route.name !== 'preview' && route.name !== 'templates'
})
</script>

<template>
  <div id="app">
    <!-- Navegación superior - visible solo en dashboard y about -->
    <nav v-if="showNavigation" class="main-nav">
      <div class="nav-container">
        <div class="nav-links">
          <router-link to="/" class="nav-link">
            <span class="nav-icon">🏠</span>
            Dashboard
          </router-link>
          <router-link to="/help" class="nav-link">
            <span class="nav-icon">❓</span>
            Ayuda
          </router-link>
          <router-link to="/about" class="nav-link">
            <span class="nav-icon">ℹ️</span>
            About
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="main-content" :class="{ 'no-nav': !showNavigation }">
      <router-view />
    </main>
  </div>
</template>

<style>
@import '@/assets/styles/App.css';
</style>
