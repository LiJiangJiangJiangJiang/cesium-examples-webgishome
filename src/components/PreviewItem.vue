<!--PreviewItem-->
<template>
  <div class="PreviewItem" @click="handleClick">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <img :src="src" style="width: 100%; height: 100%; display: block" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import { Lock, Unlock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useIndexStore } from "@/stores/index";

const reload = inject("reload");

const router = useRouter();
const indexStore = useIndexStore();

const props = defineProps<{
  title?: string;
  src?: string;
  category_title?: string;
  name?: string;
  channel_name?: string;
}>();

const handleClick = () => {
  console.log("=== 点击示例信息 ===");
  console.log("示例名称:", props.name);
  console.log("示例标题:", props.title);
  console.log("完整props对象:", props);
  console.log("===================");

  let routeUrl = router.resolve({
    path: "/preview",
    query: {
      channel_name: props.channel_name,
      category_title: props.category_title,
      name: props.name,
      title: props.title,
    },
  });
  console.log("routeUrl.href:", routeUrl.href);
  window.open(routeUrl.href, "_blank");
};
</script>
<style lang="scss" scoped>
.PreviewItem {
  border: 1px solid #404040;
  width: 305px;
  height: 235px;
  color: white;
  text-align: center;
  font-size: 17px;
  position: relative;
  margin: 12px;

  .title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 35px;
    background-color: #2d2d2da2;
  }

  .lock {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 5px;
  }

  &:hover {
    border: 1px solid #007fd4;
    cursor: pointer;

    .title {
      background-color: #04395e90;
    }
  }
}
</style>
