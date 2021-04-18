import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// import Home from "../views/Home.vue";
// import PageA from "../views/PageA.vue";
// import PageB from "../views/PageB.vue";
// import PageC from "../views/PageC.vue";

const Home = () => import(/* webpackChunkName:'home' */ "../views/Home.vue");
const PageA = () =>
  import(/* webpackChunkName:'page-a' */ '../views/PageA.vue')
const PageB = () =>
  import(/* webpackChunkName:'page-b' */ '../views/PageB.vue')
const PageC = () =>
  import(/* webpackChunkName:'page-c' */ '../views/PageC.vue')
const testAlive = () =>
  import(/* webpackChunkName:'test-alive' */ '../views/keep-alive-demo.vue')
const virtualListDemo = () =>
  import(/* webpackChunkName:'virtual-list-demo' */ '../views/virtual-list-demo.vue')
const testSlotDemo = () =>
  import(/* webpackChunkName:'test-slot-demo' */ '../views/test-slot-demo.vue')
const testIsComponent = () =>
  import(/* webpackChunkName:'test-is-component-demo' */ '../views/test-component-is/component-is-demo.vue')
const toastDemo = () =>
  import(/* webpackChunkName:'toast-demo' */ '../views/toast-demo.vue')
const transitionDemo = () =>
  import(/* webpackChunkName:'transition-demo' */ '../views/transition-demo/transition-demo.vue')

const routes = [
  {
    path: '/ccc',
    // redirect:{name:'PageC'}
    redirect: '/page-c',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: "/page-a",
    name: "PageA",
    component: PageA,
    alias: "/xxxx",
  },
  {
    path: "/page-b/:xxx",
    name: "PageB",
    component: PageB,
  },
  {
    path: '/page-c',
    name: 'PageC',
    component: PageC,
    beforeEnter: (to, from, next) => {
      console.log('路由独享守卫：page c before enter')
      console.log('to >>', to)
      console.log('from >>', from)
      next({msg: 'hello'})
    },
  },
  {
    path: '/test-alive',
    name: 'test-keep-alive',
    component: testAlive,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/virtual-list-demo',
    name: 'virtual-list-demo',
    component: virtualListDemo,
  },
  {
    path: '/test-slot-demo',
    name: 'test-slot-demo',
    component: testSlotDemo
  },
  {
    path: '/test-is-component-demo',
    name: 'test-is-component-demo',
    component: testIsComponent
  },
  {
    path: '/toast-demo',
    name: 'toast-demo',
    component: toastDemo
  },
  {
    path: '/transition-demo',
    name: 'transition-demo',
    component: transitionDemo
  },
];

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  routes,
  // base: process.env_BASE_URL
});

// 全局路由守卫test
router.beforeEach((to, from, next) => {
  console.log('---全局 beforeEach---')
  console.log('to >>', to)
  console.log('from >>', from)
  next({msg: '0,beforeEach next'})
});
router.beforeResolve((to, from, next) => {
  console.log('---全局 beforeResolve---')
  console.log('to >>', to)
  console.log('from >>', from)
  next({msg: '0,beforeResolve next'})
});
router.afterEach((to, from) => {
  console.log('---全局 afterEach---')
  console.log('to >>', to)
  console.log('from >>', from)
});
export default router;
