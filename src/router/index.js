import { createRouter, createWebHistory } from 'vue-router'
import emitter from '@/utils/emitter'

const authRoutes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Home.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic List',
      requiresAuth: true
    },
    path: '/comic',
    name: 'comic',
    component: () => import('@/views/comic/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic Add',
      requiresAuth: true
    },
    path: '/comic/add',
    name: 'comic add',
    component: () => import('@/views/comic/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comic Edit',
      requiresAuth: true
    },
    path: '/comic/:id',
    name: 'comicEdit',
    component: () => import('@/views/comic/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Chapter List',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter',
    name: 'chapter',
    component: () => import('@/views/chapter/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Chapter Edit',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter/:chapterId',
    name: 'chapterEdit',
    component: () => import('@/views/chapter/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Page List',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter/:chapterId/page',
    name: 'pageList',
    component: () => import('@/views/page/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Page Edit',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter/:chapterId/page/:pageId',
    name: 'pageEdit',
    component: () => import('@/views/page/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Chapter Add',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter/add',
    name: 'chapterAdd',
    component: () => import('@/views/chapter/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Page Add',
      requiresAuth: true
    },
    path: '/comic/:comicId/chapter/:chapterId/page/add',
    name: 'pageAdd',
    component: () => import('@/views/page/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author List',
      requiresAuth: true
    },
    path: '/author',
    name: 'author',
    component: () => import('@/views/author/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author Add',
      requiresAuth: true
    },
    path: '/author/add',
    name: 'authorAdd',
    component: () => import('@/views/author/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Author Edit',
      requiresAuth: true
    },
    path: '/author/:id',
    name: 'authorEdit',
    component: () => import('@/views/author/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre List',
      requiresAuth: true
    },
    path: '/genre',
    name: 'genre',
    component: () => import('@/views/genre/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre Add',
      requiresAuth: true
    },
    path: '/genre/add',
    name: 'genre add',
    component: () => import('@/views/genre/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Genre Edit',
      requiresAuth: true
    },
    path: '/genre/:id',
    name: 'genreEdit',
    component: () => import('@/views/genre/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag List',
      requiresAuth: true
    },
    path: '/tag',
    name: 'tag',
    component: () => import('@/views/tag/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag Add',
      requiresAuth: true
    },
    path: '/tag/add',
    name: 'tag add',
    component: () => import('@/views/tag/Add.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Tag Edit',
      requiresAuth: true
    },
    path: '/tag/:id',
    name: 'tagEdit',
    component: () => import('@/views/tag/Edit.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Comment List',
      requiresAuth: true
    },
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/comment/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'User List',
      requiresAuth: true
    },
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/List.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'User Detail',
      requiresAuth: true
    },
    path: '/user/:id',
    name: 'userDetail',
    component: () => import('@/views/user/Detail.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Order Detail',
      requiresAuth: true
    },
    path: '/user/:id/order/:orderId',
    name: 'orderDetail',
    component: () => import('@/views/user/order/Detail.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'User Profile',
      requiresAuth: true
    },
    path: '/user/profile',
    name: 'user profile',
    component: () => import('@/views/user/Profile.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Settings',
      requiresAuth: true
    },
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/settings.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Logout',
      requiresAuth: true
    },
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout.vue')
  },
]

const routes = [
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '@/views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '@/views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import(/* webpackChunkName: "ui" */ '@/views/Ui.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import(/* webpackChunkName: "responsive" */ '@/views/Responsive.vue')
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  },
  ...authRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  //eslint-disable-next-line no-unused-vars
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if(from.name && from.name !== 'Login'){
    const fromRoute = {
      name: from.name,
      params: from.params,
      query: from.query
    }
    localStorage.setItem('fromRoute', JSON.stringify(fromRoute))
  }
  
  emitter.emit('navigate')
  const loggedIn = localStorage.getItem('uid')

  if (to.meta.requiresAuth && !loggedIn) {
    return next('/')
  }

  next();
});

export default router
