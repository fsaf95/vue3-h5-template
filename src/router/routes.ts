import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Login" },
    children: [
      {
        path: "/demo",
        name: "Demo",
        redirect: {name: 'Login'},
        meta: {
          title: "广发银行信用卡-新客有礼",
          requireAuth: false
        }
      },
      {
        path: "/home",
        name: "Home",
        component: Demo,
        meta: {
          title: "广发银行信用卡-新客有礼",
          requireAuth: true
        }
      },
      {
        path: "/customerList",
        name: "CustomerList",
        component: () => import("@/views/customerList/index.vue"),
        meta: {
          title: "客户",
          requireAuth: true
        }
      },
      // {
      //   path: "/about",
      //   name: "About",
      //   component: () => import("@/views/about/index.vue"),
      //   meta: {
      //     title: "关于",
      //     noCache: true // 关闭缓存
      //   }
      // },
      // 重定向所有未找到的路由到首页
      {
        path: '/:catchAll(.*)',
        redirect: '/' // 重定向到首页
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录", requireAuth: false },
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue') // 引入你的 404 页面组件
  }
];

export default routes;
