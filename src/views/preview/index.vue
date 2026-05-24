<template>
  <div
    class="preview"
    :class="{
      'editor-expanded': isExpandMap,
      'mobile-editor-only': isMobileEditorOnly,
    }"
  >
    <div class="left" v-show="isExpandMap || isMobileEditorOnly">
      <div class="toolbar">
        <!-- <span style="color:#CCCCCC">代码编辑器</span> -->
        <strong style="color: #cccccc">WebGIS Home</strong>

        <el-link
          type="warning"
          style="margin-left: 5px"
          :href="href_currentChannel"
          target="_blank"
          >【所有示例】</el-link
        >
        <div class="toolbar--right">
          <div
            v-if="(isExpandMap || isMobileEditorOnly) && isMobile()"
            class="btn btn_collapse"
            style="margin: 0 10px"
            @click="toggleSourceCode"
            :title="isMobileEditorOnly ? '返回预览' : '折叠'"
          >
            <el-icon :size="20" v-if="isMobileEditorOnly">
              <Fold />
            </el-icon>
            <el-icon :size="20" v-else>
              <Expand />
            </el-icon>
          </div>
          <div
            class="btn btn_reset"
            style="margin: 0 10px"
            @click="resetCode"
            title="重置"
          >
            <svg
              t="1689088696988"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9706"
              width="25"
              height="25"
            >
              <path
                d="M865.28 624.64a42.666667 42.666667 0 0 0-55.893333 23.04 298.666667 298.666667 0 1 1-135.68-377.6l-68.693334 80.213333a26.453333 26.453333 0 0 0 20.053334 42.666667h230.4a26.453333 26.453333 0 0 0 26.026666-30.293333l-35.413333-227.84a26.026667 26.026667 0 0 0-45.653333-12.8l-70.4 82.346666a384 384 0 1 0 158.293333 475.733334 42.666667 42.666667 0 0 0-23.04-55.466667z"
                fill="#C5C5C5"
                p-id="9707"
              ></path>
            </svg>
          </div>
          <div class="btn btn_run" @click="runCode" title="运行">
            <svg
              t="1689088164445"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5897"
              width="25"
              height="25"
            >
              <path
                d="M264.3 141.6l275.4 179.3 284 184.8c1 0.6 3.6 2.4 3.6 6.7 0 4.3-2.6 6.1-3.6 6.7L539.8 704 264.3 883.3c-0.2-1-0.3-2.1-0.3-3.5V145.1c0-1.3 0.2-2.5 0.3-3.5M262 66.2c-36.5 0-70 32.9-70 78.9v734.6c0 46 33.5 78.9 70 78.9 11.6 0 23.6-3.3 34.8-10.7L579 764.2l284-184.8c48.5-31.6 48.5-102.5 0-134.1L579 260.5 296.9 76.9c-11.3-7.3-23.2-10.7-34.9-10.7z"
                fill="#C5C5C5"
                p-id="5898"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <CodeMirror
        v-model="codeContent"
        :basicSetup="true"
        :extensions="editorExtensions"
        :tabSize="2"
        :indentWithTab="true"
        class="editor"
      />
    </div>
    <div class="preview-container">
      <div class="expandButton" @click="toggleSourceCode">
        <div class="expandButton-inner">
          <span
            v-show="isExpandMap && !isMobileEditorOnly"
            style="display: flex; align-items: center"
          >
            <el-icon style="margin-right: 2px"> <Fold /> </el-icon>收起</span
          >
          <span
            v-show="!isExpandMap && !isMobileEditorOnly"
            style="display: flex; align-items: center"
          >
            <el-icon style="margin-right: 2px"> <Expand /> </el-icon>源码</span
          >
        </div>
      </div>
      <iframe
        class="preview"
        ref="ref_preview"
        frameborder="0"
        v-show="!isMobileEditorOnly"
      ></iframe>
      <div id="watermark" ref="ref_watermark"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, onMounted, computed, onBeforeUnmount } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
import CodeMirror from "vue-codemirror6";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { indentUnit } from "@codemirror/language";
import { foldGutter, foldKeymap } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

const route = useRoute();
const currentChannel = ref("");
const href_currentChannel = computed(() => {
  return `/examples?channel_name=${currentChannel.value}`;
});

// 设置页面标题
onMounted(() => {
  if (route.query.title) {
    document.title = `${document.title} | ${route.query.title}`;
  }
});

const isExpandMap = ref(false);
const isMobileEditorOnly = ref(false); // 移动端只显示编辑器模式
const ref_preview = ref<HTMLIFrameElement>();
const ref_watermark = ref<HTMLElement>();

let htmlStr_origin = "";
const codeContent = ref("");
let resizeHandler: (() => void) | null = null;

// 配置编辑器扩展 - 使用常量避免重复创建
const editorExtensions = [
  html(),
  indentUnit.of("  "),
  oneDark,
  foldGutter(),
  keymap.of([...foldKeymap]),
  EditorView.theme({
    "&.cm-editor": {
      textAlign: "left",
    },
    "&.cm-focused": {
      outline: "none",
    },
    "& .cm-scroller::-webkit-scrollbar": {
      width: "12px",
      height: "12px",
    },
    "& .cm-scroller::-webkit-scrollbar-track": {
      background: "#1e1e1e",
    },
    "& .cm-scroller::-webkit-scrollbar-thumb": {
      background: "#424242",
      borderRadius: "6px",
      "&:hover": {
        background: "#4f4f4f",
      },
    },
    "& .cm-foldGutter": {
      width: "20px",
    },
  }),
];

// 从 config.json 中查找示例信息
const findExampleInConfig = (
  config: any,
  exampleName: string,
  channelName?: string,
) => {
  const examples = config.webgishome?.examples;
  if (!examples) return null;

  // 如果指定了 channel_name，优先在指定频道中查找
  if (channelName && examples[channelName]) {
    const channelData = examples[channelName];
    if (Array.isArray(channelData)) {
      for (const category of channelData) {
        if (!category.children || !Array.isArray(category.children)) continue;

        for (const example of category.children) {
          if (example.name === exampleName) {
            return {
              channel_name: channelName,
              category_name: category.name,
              example_name: example.name,
              title: example.title,
            };
          }
        }
      }
    }
  }

  // 如果没有指定 channel_name 或未找到，遍历所有频道
  for (const channel in examples) {
    const channelData = examples[channel];
    if (!Array.isArray(channelData)) continue;

    for (const category of channelData) {
      if (!category.children || !Array.isArray(category.children)) continue;

      for (const example of category.children) {
        if (example.name === exampleName) {
          return {
            channel_name: channel,
            category_name: category.name,
            example_name: example.name,
            title: example.title,
          };
        }
      }
    }
  }
  return null;
};

// 添加水印函数 - 使用 DocumentFragment 优化性能
const addWatermark = () => {
  if (!ref_watermark.value) return;

  const container = ref_watermark.value;
  const text = "@webgishome";
  const spacing = 260;
  const previewContainer = document.querySelector(
    ".preview-container",
  ) as HTMLElement;
  if (!previewContainer) return;

  const width = previewContainer.offsetWidth;
  const height = previewContainer.offsetHeight;
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;

  // 使用 DocumentFragment 批量插入，减少重绘
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < rows * cols; i++) {
    const div = document.createElement("div");
    div.className = "watermark-text";
    div.textContent = text;
    div.style.left = (i % cols) * spacing + "px";
    div.style.top = Math.floor(i / cols) * spacing + "px";
    if (Math.floor(i / cols) % 2 === 0) {
      div.style.left = (i % cols) * spacing + spacing / 2 + "px";
    }
    fragment.appendChild(div);
  }

  container.innerHTML = "";
  container.appendChild(fragment);
};

// 防抖函数
const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

const debouncedAddWatermark = debounce(addWatermark, 200);

// 检测是否为移动端
const isMobile = () => {
  return window.innerWidth <= 768;
};

// 切换源码显示
const toggleSourceCode = () => {
  if (isMobile()) {
    // 移动端：三种状态循环切换
    if (!isExpandMap.value && !isMobileEditorOnly.value) {
      // 状态1：只显示iframe -> 切换到编辑器独占
      isMobileEditorOnly.value = true;
      isExpandMap.value = true;
    } else if (isMobileEditorOnly.value) {
      // 状态2：编辑器独占 -> 切换到只显示iframe
      isMobileEditorOnly.value = false;
      isExpandMap.value = false;
    } else {
      // 状态3：编辑器iframe各50% -> 切换到编辑器独占
      isMobileEditorOnly.value = true;
      isExpandMap.value = true;
    }
  } else {
    // PC端：正常切换展开/收起
    isExpandMap.value = !isExpandMap.value;
    isMobileEditorOnly.value = false;
  }
};

onMounted(async () => {
  try {
    // 加载 config.json
    console.log("Loading config.json...");
    const configResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}config.json`,
    );
    const configData = await configResponse.json();

    const exampleName = route.query.name as string;
    const channelName = route.query.channel_name as string;
    if (!exampleName) {
      ElMessage.error("未指定示例");
      return;
    }

    // 从 config.json 中查找示例信息，优先使用 channel_name
    const exampleInfo = findExampleInConfig(
      configData,
      exampleName,
      channelName,
    );
    if (!exampleInfo) {
      ElMessage.error("未找到示例信息");
      return;
    }

    currentChannel.value = exampleInfo.channel_name;

    // QQ 浏览器提示
    if (currentChannel.value === "cesium") {
      const isQQBrowser = /QQBrowser/i.test(navigator.userAgent);
      if (isQQBrowser) {
        ElNotification({
          title: "提示",
          message:
            "推荐使用<strong>谷歌浏览器</strong>或<strong>Edge浏览器</strong>预览",
          type: "warning",
          dangerouslyUseHTMLString: true,
          duration: 0,
        });
      }
    }

    // 构建 HTML 文件路径并加载
    const htmlPath = `${import.meta.env.VITE_BASE_URL}examples/${exampleInfo.channel_name}/${exampleInfo.category_name}/${exampleInfo.example_name}/${exampleInfo.title}.html`;
    const htmlResponse = await fetch(htmlPath);
    if (!htmlResponse.ok) {
      throw new Error(`无法加载文件: ${htmlPath}`);
    }
    const htmlContent = await htmlResponse.text();

    htmlStr_origin = htmlContent;
    codeContent.value = htmlContent;

    await nextTick();

    // 自动运行代码并添加水印
    setTimeout(() => {
      runCode();
      addWatermark();
    }, 300);

    // 注册 resize 事件监听器
    resizeHandler = debouncedAddWatermark;
    window.addEventListener("resize", resizeHandler);
  } catch (error) {
    console.error("加载示例失败:", error);
    ElMessage.error("加载示例失败");
  }
});

// 组件卸载时清理事件监听器
onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
});

// 运行代码
const runCode = () => {
  if (!ref_preview.value) return;

  console.log("import.meta.env.VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
  console.log("import.meta.env.VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

  ref_preview.value.src = `${import.meta.env.VITE_BASE_URL}proxy.html`;
  ref_preview.value.onload = () => {
    ref_preview.value?.contentWindow?.postMessage(
      {
        type: "RUN_CODE",
        code: codeContent.value,
      },
      "*",
    );
  };
};

// 重置代码
const resetCode = () => {
  if (!ref_preview.value) return;

  ref_preview.value.src = `${import.meta.env.VITE_BASE_URL}proxy.html`;
  ref_preview.value.onload = () => {
    ref_preview.value?.contentWindow?.postMessage(
      {
        type: "RUN_CODE",
        code: htmlStr_origin,
      },
      "*",
    );
  };

  codeContent.value = htmlStr_origin;
};
</script>
<style scoped lang="scss">
.preview {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  white-space: nowrap;
  position: relative;

  &.editor-expanded {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .left {
      display: grid;
    }

    .preview-container {
      width: 100%;
    }
  }

  // 移动端适配
  @media screen and (max-width: 768px) {
    // 默认状态：只显示iframe，隐藏编辑器
    &:not(.editor-expanded):not(.mobile-editor-only) {
      .left {
        display: none !important;
      }

      .preview-container {
        width: 100vw;
      }
    }

    // 展开状态：编辑器iframe各占50%
    &.editor-expanded:not(.mobile-editor-only) {
      .left {
        width: 50%;
      }

      .preview-container {
        width: 50%;
      }
    }
  }

  // 移动端只显示编辑器模式
  &.mobile-editor-only {
    .left {
      display: grid;
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1003;
    }

    .preview-container {
      display: none;
    }
  }

  .left {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr;
    overflow: hidden;
    min-width: 0;
    z-index: 1001;

    .toolbar {
      line-height: 50px;
      // background-color: #1E1E1E;
      // background-color: #323233;
      background-color: #252526;

      display: flex;
      color: white;
      padding: 0 10px;
      align-items: center;

      .toolbar--right {
        margin-left: auto;
        display: flex;
        align-items: center;

        .btn {
          width: 37px;
          height: 37px;
          border-radius: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;

          background-color: #252526;

          &:hover {
            cursor: pointer;
          }
        }

        .btn_expand {
          background-color: #7d4bea;

          &:hover {
            background-color: rgb(165, 141, 218);
          }
        }

        .btn_run {
          // background-color: #67c23a;

          &:hover {
            background-color: #363737;
          }
        }

        .btn_reset {
          // background-color: #409EFF;

          &:hover {
            background-color: #363737;
          }
        }

        .btn_collapse {
          &:hover {
            background-color: #363737;
          }
        }
      }
    }

    .editor {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      min-width: 0;

      // CodeMirror 6 样式定制
      :deep(.cm-editor) {
        height: 100%;
        font-size: 14px;
        font-family: "Consolas", "Monaco", "Courier New", monospace;
        padding: 0;
        margin: 0;
      }

      :deep(.cm-scroller) {
        overflow: auto;
        padding: 0;
      }

      :deep(.cm-content) {
        padding: 0 !important;
        margin: 0 !important;
      }

      :deep(.cm-gutters) {
        background-color: #282c34;
        border-right: 1px solid #3e4451;
        padding-left: 0;
      }

      :deep(.cm-activeLineGutter) {
        background-color: #3e4451;
      }

      :deep(.cm-lineNumbers) {
        color: #636d83;
      }
    }

    .editor_expand {
      width: 100vw;
    }
  }

  .preview-container {
    width: 100%;
    height: 100%;
    position: relative;

    .expandButton {
      position: absolute;
      top: 20px;
      left: 50px;
      z-index: 1002;
      color: white;
      cursor: pointer;

      &-inner {
        border: 1px solid rgba(231, 231, 231, 0.5);
        display: inline-block;
        padding: 3px 12px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        &:hover {
          color: orange;
          border: 1px solid orange;
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
    }

    .preview {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    #watermark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;

      :deep(.watermark-text) {
        position: absolute;
        color: rgba(255, 255, 255, 0.52) !important;
        font-size: 20px !important;
        font-family: Arial, sans-serif;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        transform: rotate(-25deg) !important;
        user-select: none;
        filter: blur(0.3px);
        white-space: nowrap;
      }
    }
  }
}
</style>
