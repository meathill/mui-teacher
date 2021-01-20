import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddSub from '@/views/add-sub';
import NineNine from '@/views/nine-nine';
import NineNineAddSub from '@/views/nine-nine-add-sub';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/add-sub/:number',
    name: 'add-sub',
    component: AddSub,
  },
  {
    path: '/nine-nine/:number',
    name: 'nine-nine',
    component: NineNine,
  },
  {
    path: '/mix-1/:number',
    name: 'nine-nine-add-sub',
    component: NineNineAddSub,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
