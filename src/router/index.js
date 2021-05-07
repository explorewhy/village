import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: { title: '智慧农村三维平台' }
  },
  {
    path: '/home',
    component: Home,
    meta: { title: '智慧农村三维平台' }
  },
  {
    path: '/backPassword',
    meta: { title: '找回密码' },
    component: () => import('../views/backPassword/BackPassword')
  },
  {
    path: '/login',
    meta: { title: '智慧农村三维平台' },
    component: () => import('../views/login/Login')
  },
  {
    path: '/profile',
    meta: { title: '个人中心' },
    component: () => import('../views/profile/Profile'),
    children: [
      {
        path: '/profile/pro-accountInfo',
        meta: { title: '账号信息' },
        component: () => import('../views/profile/components/UserInfo')
      },
      {
        path: '/profile/pro-changePassword',
        meta: { title: '修改密码' },
        component: () => import('../views/profile/components/ChangePassword')
      }
    ]
  },
  {
    path: '/consoleHome',
    meta: { title: '操作中心' },
    component: () => import('../components/consoleHome/ConsoleHome')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/backpassword') return next();
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  window.document.title = to.meta.title;
  next();
});

export default router;
