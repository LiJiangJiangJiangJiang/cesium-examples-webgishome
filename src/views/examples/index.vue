<template>
  <div class="examples">
    <div class="bottom">
      <el-scrollbar class="bottom--left">
        <div
          class="asideItem"
          :class="{ asideItemActive: currentElementId === item.name }"
          @click="clickAsideItem(item.name)"
          v-for="(item, index) in examples"
          :key="index"
        >
          {{ item.title }} ({{ item.children.length }})
        </div>
      </el-scrollbar>

      <el-scrollbar ref="scrollbarRef">
        <TypePanel
          v-for="(item, index) in examples"
          :key="index"
          :id="item.name"
          :title="item.title"
        >
          <PreviewItem
            v-for="data in item.children"
            :key="data.name"
            :title="data.title"
            :src="data.img"
            :category_title="item.name"
            :name="data.name"
          >
          </PreviewItem>
        </TypePanel>
      </el-scrollbar>
    </div>

    <!-- 回到顶部按钮 -->
    <div
      class="back-to-top"
      @click="scrollToTop"
      v-show="showBackToTop"
      title="回到顶部"
    >
      <el-icon :size="20"><Top /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TypePanel from "@/components/TypePanel.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { Top } from "@element-plus/icons-vue";

const route = useRoute();

let examples = ref<any[]>([]);
const currentElementId = ref("");
const scrollbarRef = ref();
const showBackToTop = ref(false);
let scrollTimer: any = null; // 滚动定时器
let lastScrollTop = 0; // 上次滚动位置
let isScrolling = false; // 是否正在滚动
let pendingClickId: string | null = null; // 待选中的菜单ID

const clickAsideItem = (elementId: string) => {
  pendingClickId = elementId; // 记录待选中的菜单ID
  currentElementId.value = elementId; // 立即显示选中状态

  const element = document?.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }
};

// 回到顶部 - 平滑滚动
const scrollToTop = () => {
  if (scrollbarRef.value) {
    const wrapRef = scrollbarRef.value.wrapRef || scrollbarRef.value.$refs.wrap;
    if (wrapRef) {
      const startPosition = wrapRef.scrollTop;
      const duration = 1000; // 1秒
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数让滚动更自然
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        wrapRef.scrollTop = startPosition * (1 - easeOutQuart);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // 滚动完成后，选中左侧第一个分类
          if (examples.value.length > 0) {
            currentElementId.value = examples.value[0].name;
          }
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }
};

// 监听滚动事件
const handleScroll = (event: any) => {
  const scrollTop = event.target.scrollTop;
  showBackToTop.value = scrollTop > 300;

  // 标记正在滚动
  isScrolling = true;

  // 清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  // 如果是点击触发的滚动，不更新选中状态
  if (pendingClickId !== null) {
    // 滚动停止后清除标记
    scrollTimer = setTimeout(() => {
      isScrolling = false;
      pendingClickId = null; // 滚动结束后清除标记
      scrollTimer = null;
    }, 200); // 200ms 内没有新的滚动事件，认为滚动已停止
    return;
  }

  // 检测当前可见的板块
  updateActiveSection(scrollTop);

  // 记录当前滚动位置
  lastScrollTop = scrollTop;

  // 设置定时器，当滚动停止后不再触发
  scrollTimer = setTimeout(() => {
    isScrolling = false;
    scrollTimer = null;
  }, 200); // 200ms 内没有新的滚动事件，认为滚动已停止
};

// 更新当前激活的板块
const updateActiveSection = (scrollTop: number) => {
  if (examples.value.length === 0) return;

  // 遍历所有板块，找到当前滚动位置对应的板块
  for (let i = examples.value.length - 1; i >= 0; i--) {
    const element = document.getElementById(examples.value[i].name);
    if (element) {
      const offsetTop = element.offsetTop;
      // 如果板块的顶部已经滚动到可视区域内（scrollTop >= offsetTop - 100）
      if (scrollTop >= offsetTop - 100) {
        currentElementId.value = examples.value[i].name;
        break;
      }
    }
  }
};

const loadConfigData = async () => {
  try {
    const response = await fetch("/config.json");
    const config = await response.json();

    // 根据路由参数获取对应的频道数据
    const channelName = (route.query.channel_name as string) || "cesium";
    // 正确的数据路径：webgishome.examples.cesium
    const channelData = config.webgishome?.examples?.[channelName] || [];

    examples.value = channelData;
    // console.log("examples.value:", examples.value);

    // 设置默认选中第一个分类
    if (channelData.length > 0) {
      currentElementId.value = channelData[0].name;
    }

    // console.log("加载的数据:", channelData);
  } catch (error) {
    console.error("加载配置文件失败:", error);
  }
};

onMounted(async () => {
  await loadConfigData();

  // 等待DOM渲染完成后绑定滚动事件
  setTimeout(() => {
    if (scrollbarRef.value) {
      const wrapRef =
        scrollbarRef.value.wrapRef || scrollbarRef.value.$refs.wrap;
      if (wrapRef) {
        wrapRef.addEventListener("scroll", handleScroll);
      }
    }
  }, 100);
});

onBeforeUnmount(() => {
  // 清理事件监听
  if (scrollbarRef.value) {
    const wrapRef = scrollbarRef.value.wrapRef || scrollbarRef.value.$refs.wrap;
    if (wrapRef) {
      wrapRef.removeEventListener("scroll", handleScroll);
    }
  }
});
</script>
<style lang="scss" scoped>
.examples {
  background-color: #252526;
  color: #9cbbc3;

  width: 100%;
  min-width: 1180px;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr;
  overflow: hidden;
  user-select: none;

  .bottom {
    display: grid;
    grid-template-columns: 220px 1fr;
    color: rgba(255, 255, 255, 0.95);
    height: calc(100vh - 80px);
    margin-top: 80px;

    &--left {
      .asideItem {
        line-height: 47px;

        padding: 0 20px;
        border: 1px solid #252526;
        background-color: #252526;
        margin: 0 10px 5px 3px;

        &:hover {
          border: 1px solid #007fd4;
          background-color: #04395e;
          cursor: pointer;
        }
      }

      .asideItemActive {
        border: 1px solid #007fd4;
        background-color: #04395e;

        cursor: pointer;
      }
    }
  }

  .wechat {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: flex-end;

    .wechat__icon {
      opacity: 0.3;
    }
  }

  .back-to-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: #007fd4;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 999;

    &:hover {
      background-color: #005fa3;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
