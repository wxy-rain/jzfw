import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'customer',
        component: () => import('@/pages/customer/Customer'),
        name: 'customer',
        meta: { title: '顾客管理', icon: 'user'}
      },
      {
        path: 'datils',
        hidden:true,
        component: () => import('@/pages/customer/Datils'),
        name: 'customer',
        meta: { title: '顾客详情', icon: 'user'}
      }
    ]
  },
  {
    path: '/waiter',
    component: Layout,
    children: [
      {
        path: 'waiter',
        component: () => import('@/pages/waiter/Waiter'),
        name: 'waiter',
        meta: { title: '员工管理', icon: 'user'}
      },
      {
        path: 'datils',
        hidden:true,
        component: () => import('@/pages/waiter/Datils'),
        name: 'customer',
        meta: { title: '员工详情', icon: 'user'}
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    meta: { title: '系统管理', icon: 'user'},
    children: [
      {
        path: 'category',
        component: () => import('@/pages/base/Category'),
        name: 'category',
        meta: { title: '栏目管理'}
      },
      {
        path: 'product',
        component: () => import('@/pages/base/Product'),
        name: 'product',
        meta: { title: '产品管理'}
      },
      {
        path: 'datils',
        hidden:true,
        component: () => import('@/pages/base/Datils'),
        name: 'details',
        meta: { title: '产品详情', icon: 'tab' }
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    meta: { title: '审核管理', icon: 'user'},
    children: [
      {
        path: 'withdraw',
        component: () => import('@/pages/check/Withdraw'),
        name: 'withdraw',
        meta: { title: '提现审核'}
      },
      {
        path: 'waitercheck',
        component: () => import('@/pages/check/Waitercheck'),
        name: 'waitercheck',
        meta: { title: '员工审核'}
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'order',
        component: () => import('@/pages/order/Order'),
        name: 'order',
        meta: { title: '订单管理', icon: 'user'}
      }
    ]
  },
 // 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
