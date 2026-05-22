import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";

import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

const store = createPinia();

export const app = createApp(App);
app.use(router);
app.use(store);

app.use(ElementPlus);
app.use(VXETable);

app.mount("#app");
