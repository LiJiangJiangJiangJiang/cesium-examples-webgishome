# WebGIS Home - 基于 Cesium & OpenLayers 的 WebGIS 示例集合

<p align="center">
  <strong>所有二三维示例采用原生HTML实现，粘贴即可运行</strong>
</p>

<p align="center">
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues">
    <img src="https://img.shields.io/github/issues/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square&logo=github" alt="GitHub issues">
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue Version">
  </a>
  <a href="https://cesium.com/">
    <img src="https://img.shields.io/badge/Cesium-1.141-2C3E50?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDBDMTUuMzEzMyAwIDE4LjI5MzIgMS4zNTMzIDIwLjUwNjcgMy41NzY3QzIyLjcyMzMgNS43OTEzIDI0IDguNzcxMyAyNCAxMkMxNiAyMCAxMiAyNCAxMiAyNEMxMiAyNCAxMiAyMCAxMiAxMkMxMiA4Ljc3MTMgMTMuMjc2NyA1Ljc5MTMgMTUuNDkzMyAzLjU3NjdDMTcuNzA2NyAxLjM1MzMgMjAuNjg2NyAwIDI0IDBaIi8+PC9zdmc+" alt="Cesium">
  </a>
  <a href="https://openlayers.org/">
    <img src="https://img.shields.io/badge/OpenLayers-9.x-1F6B75?style=flat-square" alt="OpenLayers">
  </a>
</p>

<p align="center">
  <strong>❤️ 喜欢这个项目？点个 Star 支持一下吧～ ⭐</strong>
</p>

## 📸 项目截图

<div align="center">
  <img src="public/readme/cesium_examples_list.png" alt="Cesium 示例列表" width="45%" />
  <img src="public/readme/openlayers_examples_list.png" alt="OpenLayers 示例列表" width="45%" />
</div>
<div align="center">
  <img src="public/readme/cesium_examples.png" alt="Cesium 示例1" width="45%" />
  <img src="public/readme/openlayers_examples.png" alt="Cesium 示例2" width="45%" />
</div>

## ⚡ 快速开始

### 安装与运行

```bash
# 1️⃣ 克隆项目
git clone https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome.git

# 2️⃣ 进入项目目录
cd cesium-examples-webgishome

# 3️⃣ 安装依赖
npm install

# 4️⃣ 启动开发服务器
npm run dev
```

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🛠️ 技术栈

### 前端框架

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具

### 地图库

- **Cesium 1.141** - 三维地图引擎
- **OpenLayers** - 二维地图库

### UI 组件

- **Element Plus** - Vue 3 UI 组件库
- **CodeMirror 6** - 代码编辑器

### 状态管理 & 路由

- **Pinia** - Vue 官方状态管理库
- **Vue Router 5** - Vue 官方路由

### 工具库

- **Axios** - HTTP 客户端
- **Day.js** - 日期处理库
- **Sass** - CSS 预处理器

## 🔧 配置说明

### 环境变量

项目通过 `.env` 文件配置基础路径，支持不同环境使用不同的配置：

```bash
# .env（通用配置）
VITE_BASE_URL=/

# .env.production（生产环境，部署到子目录时需要修改）
VITE_BASE_URL=/cesium-examples-webgishome/
```

### 示例配置

所有示例通过 `public/config.json` 进行配置管理，无需修改代码即可动态添加新示例：

```json
{
  "webgishome": {
    "examples": {
      "cesium": [
        {
          "name": "示例名称",
          "path": "examples/cesium/xxx/index.html",
          "category": "分类名称"
        }
      ],
      "openlayers": [...]
    }
  }
}
```

> 📝 **添加新示例步骤**：
>
> 1. 在 `public/examples/` 下创建示例文件夹
> 2. 编写 HTML 文件
> 3. 在 `public/config.json` 中添加配置项
> 4. 刷新页面即可看到新示例

---

<p align="center">Made with ❤️ by WebGIS Home</p>
<p align="center">
  <a href="#top">↑ 回到顶部 ↑</a>
</p>
