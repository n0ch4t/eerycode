import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../../views/Home/Home.vue';
import Channels from '@/views/Channel/Channels.vue';
import AccountValidate from '@/views/account/AccountValidate.vue';

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
    component: AccountValidate,
  },
  {
    path: '/register',
    name: 'Register',
    component: AccountValidate,
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
