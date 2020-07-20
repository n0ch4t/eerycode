import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../../views/account/Login.vue';
import Home from '../../views/Home/Home.vue';
import Register from '../../views/account/Register.vue';
import Channels from '@/views/Channel/Channels.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/channels',
    name: 'Channels',
    component: Channels,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
