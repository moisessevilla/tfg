import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import FormBuilder from '../views/FormBuilder.vue'
import FormPreview from '../views/FormPreview.vue'
import HelpView from '../views/HelpView.vue'
import TemplatesView from '../views/TemplatesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/builder',
      name: 'builder',
      component: FormBuilder,
    },
    {
      path: '/preview/:id',
      name: 'preview',
      component: FormPreview,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Siempre volver al principio cuando navegas a preview
    if (to.path.includes('/preview')) {
      return { top: 0 }
    }
    // Para otras rutas, usar la posición guardada o ir al principio
    return savedPosition || { top: 0 }
  },
})

export default router
