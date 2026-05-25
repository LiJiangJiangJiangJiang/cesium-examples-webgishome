import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
    redirect: "/examples",

    children: [
      // {
      //   path: "/",
      //   name: "index",
      //   component: () => import("@/views/index.vue"),
      // },
      {
        path: "/examples",
        name: "examples",
        component: () => import("@/views/examples/index.vue"),
        // meta: {
        //   title: "示例列表"
        // }
      },
    ],
  },
  {
    path: "/preview",
    name: "preview",
    component: () => import("@/views/preview/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/exception/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "404" },
  },
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.VITE_BASE_URL), //history
  // history: createWebHistory(), //history
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL), //hash
  routes,
});

// router.beforeEach((to: any) => {
//   console.log("to:", to);
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
// });

// 路由守卫
// router.beforeEach((to: any, from, next) => {
//   // const indexStore = useIndexStore();
//   let token = localStorage.getItem("token");
//   if (token) {
//     next();
//     // if (isTokenExpire(token)) {
//     //   // 已过期
//     //   ElMessage.warning("登录状态已过期, 请重新登录");
//     //   localStorage.clear();
//     //   next({
//     //     path: "/login",
//     //     query: to.path === "/" ? {} : { from: to.fullPath }
//     //   });
//     // } else {
//     //   next();
//     // }
//   } else if (WHITE_LIST.includes(to.path)) {
//     next();
//   } else {
//     next({
//       path: "/login",
//       query: to.path === "/" ? {} : { from: to.fullPath }
//     });
//   }
// });

export default router;
