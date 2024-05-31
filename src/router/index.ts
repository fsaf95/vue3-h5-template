import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
    requireAuth?: boolean;
  };
}

router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start();
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);
  // 页面 title（动态设置页面标题）
  // setPageTitle(to.meta.title);
  // 检查目标路由是否需要身份验证
  const token = localStorage.getItem("GF_TOKEN");
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 检查是否已登录（这里只是一个示例，你可能需要更复杂的逻辑）
    if (token) {
        //  已登录，继续导航
        next();
    } else {
      // 未登录，重定向到登录页面
        next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } else {
    if (token && to.query.require_login != 1) {
        next({ path: "/home" });
      } else {
        next();
      }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
