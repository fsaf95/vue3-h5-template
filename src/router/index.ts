import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { showFailToast } from "vant";

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
  setPageTitle(to.meta.title);
  // 检查目标路由是否需要身份验证
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 检查是否已登录（这里只是一个示例，你可能需要更复杂的逻辑）
    const token = localStorage.getItem("GF_TOKEN");
    if (token) {
      //  已登录，继续导航
      next();
    } else {
      console.log("未登录");
      // 未登录，重定向到登录页面
      if (to.path !== "/login") {
        console.log(444,to.path,token);
        if (token === null || token === "" || token === undefined) {
          console.log(4666,token);
          showFailToast("检测到您还未登录,请登录后操作！");
          next({ path: "/login", query: { redirect: to.fullPath } });
        }
      }
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
