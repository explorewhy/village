import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login', meta: { title: '智慧农村三维平台' } },
  { path: '/home', component: Home, meta: { title: '智慧农村三维平台' } },
  { path: '/backPassword', component: () => import('../views/backPassword/BackPassword'), meta: { title: '找回密码' } },
  { path: '/login', component: () => import('../views/login/Login'), meta: { title: '智慧农村三维平台' } },
  { path: '/retrievepassword', component: () => import('../views/backPassword/BackPassword'), meta: { title: '修改密码' } }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  window.document.title = to.meta.title;
  next();
});

export default router;
