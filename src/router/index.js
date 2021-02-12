import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home },
  { path: '/backPassword', component: () => import('../views/backPassword/BackPassword') },
  { path: '/login', component: () => import('../views/login/Login') },
  { path: '/retrievepassword', component: () => import('../views/backPassword/BackPassword') }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
