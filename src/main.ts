import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";

import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

const store = createPinia();

export const app = createApp(App);
app.use(router);
app.use(store);

app.use(ElementPlus);

app.mount("#app");
