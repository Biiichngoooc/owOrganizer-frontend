import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'
import Team from '../views/Team.vue'
import HTW from '../views/HTW'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/team/htw',
    name: 'HTW',
    component: HTW
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
