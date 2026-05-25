# WebGIS Home - 三维与二维地图示例平台

<p align="center">
  <strong>基于 Cesium & OpenLayers 的 WebGIS 示例集合</strong>
</p>

<p align="center">
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/stargazers">
    <img src="https://img.shields.io/github/stars/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square&logo=github" alt="GitHub stars">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/network/members">
    <img src="https://img.shields.io/github/forks/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square&logo=github" alt="GitHub forks">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues">
    <img src="https://img.shields.io/github/issues/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square&logo=github" alt="GitHub issues">
  </a>
  <a href="https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/LiJiangJiangJiangJiang/cesium-examples-webgishome?style=flat-square" alt="License">
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
  <strong>⭐ 如果您觉得这个项目对您有帮助，请给我们一个 Star！⭐</strong>
</p>

## 📖 项目简介

**WebGIS Home** 是一个专注于 WebGIS 开发的示例平台，集成了 **Cesium**（三维地图）和 **OpenLayers**（二维地图）两大主流地图框架，提供了丰富的地图开发示例和最佳实践。本项目旨在帮助开发者快速入门 WebGIS 开发，提供可参考、可复用的代码示例。

### 🎯 适用人群

- 🗺️ WebGIS 初学者，想要学习地图开发
- 💻 前端开发者，需要集成地图功能到项目中
- 🎓 学生和研究人员，需要地图可视化案例
- 🏢 企业团队，寻找地图开发最佳实践

## ✨ 核心特性

- **双平台支持**：同时支持 Cesium 三维地图和 OpenLayers 二维地图
- 📦 **丰富的示例**：涵盖基础底图、几何体、数据源、标注标绘、测量工具等完整功能模块
- 💻 **在线编辑器**：内置代码编辑器，支持在线查看和运行示例代码
- 📱 **响应式设计**：完美适配桌面端和移动端设备
- 🎨 **现代化 UI**：采用 Element Plus 组件库，界面简洁专业
- 🔧 **开箱即用**：基于 Vite 构建，启动快速，开发体验流畅

## 🗂️ 示例分类

### Cesium 三维地图

| 分类     | 数量 | 说明                            |
| -------- | ---- | ------------------------------- |
| 基础底图 | 2    | ArcGIS、基础地球                |
| 几何体   | 16   | 点、线、面、体等多种几何图形    |
| 数据源   | 6    | GeoJSON、KML、3D Tiles、GLB模型 |
| 标注标绘 | 4    | 点线面绘制、实体绘制            |
| 测量工具 | 5    | 距离测量、面积测量              |
| CZML     | 4    | 点、模型、多边形、多线段        |
| 地形叠加 | 2    | 世界地形、ArcGIS地形            |
| 场景效果 | 5    | 下雪、下雨、雾、火焰等          |
| 其他功能 | 20   | 坐标转换、热力图、拖拽、编辑等  |

### OpenLayers 二维地图

| 分类     | 数量 | 说明                            |
| -------- | ---- | ------------------------------- |
| 基础底图 | 5    | ArcGIS、天地图、3857/4326坐标系 |
| 其他功能 | 25   | 聚类、绘制、样式、事件等        |

## ⚡ 快速开始

> **💡 提示**：只需 3 步，30 秒内即可运行项目！

### 前置要求

- **Node.js** >= 16.0.0 ([下载](https://nodejs.org/))
- **npm** >= 7.0.0 (随 Node.js 一起安装)

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

✅ 完成！在浏览器中访问：**http://localhost:5176**

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
cesium-examples-webgishome/
├── public/                    # 静态资源目录
│   ├── examples/             # 示例 HTML 文件
│   │   ├── cesium/          # Cesium 三维地图示例
│   │   └── openlayers/      # OpenLayers 二维地图示例
│   ├── config.json          # 示例配置文件（核心配置）
│   └── proxy.html           # 代理页面
├── src/                      # 源代码目录
│   ├── api/                 # API 请求模块
│   ├── assets/              # 静态资源（图片、图标等）
│   ├── components/          # 公共组件
│   │   ├── Header.vue      # 顶部导航栏
│   │   ├── Footer.vue      # 底部信息栏
│   │   └── ...
│   ├── router/              # Vue Router 路由配置
│   ├── stores/              # Pinia 状态管理
│   ├── views/               # 页面组件
│   │   ├── home.vue        # 首页
│   │   ├── examples/       # 示例列表页
│   │   └── preview/        # 示例预览页（含代码编辑器）
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── .env                     # 环境变量（通用配置）
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── vite.config.ts           # Vite 构建配置
├── package.json             # 项目依赖与脚本
└── tsconfig.json            # TypeScript 配置
```

> 📌 **核心文件说明**：
>
> - `public/config.json` - 示例数据配置，修改此文件可动态添加/删除示例
> - `public/examples/` - 所有示例的 HTML 文件存放位置
> - `.env*` - 环境变量配置，控制基础路径

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

> ⚠️ **注意**：如果部署到 GitHub Pages 或其他子目录，请修改 `.env.production` 中的 `VITE_BASE_URL`

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

## 📱 响应式支持

项目已针对移动端进行优化，在不同设备上均能提供良好的用户体验：

- **桌面端**：完整功能展示，支持代码编辑器和预览分屏
- **平板端**：自适应布局，保持良好的交互体验
- **移动端**：简化布局，支持触摸操作和手势

## 🤝 贡献指南

欢迎通过以下方式为本项目做出贡献！

### 贡献方式

- 🐛 **报告 Bug**：提交 [Issue](https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues) 描述问题
- 💡 **提出建议**：分享新功能想法或改进建议
- 📝 **完善文档**：帮助改进 README 或添加注释
- 🔧 **提交代码**：修复 Bug 或添加新功能

### 贡献流程

```bash
# 1. Fork 本仓库
# 2. 创建特性分支
git checkout -b feature/your-feature-name

# 3. 提交更改
git commit -m 'feat: add your feature description'

# 4. 推送到分支
git push origin feature/your-feature-name

# 5. 创建 Pull Request
```

> 📌 **Commit 规范**：建议使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范
>
> - `feat:` 新功能
> - `fix:` 修复 Bug
> - `docs:` 文档更新
> - `style:` 代码格式调整
> - `refactor:` 代码重构

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议，您可以自由使用、修改和分发本项目。

详细条款请查看 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

### 在线资源

- 🌐 **在线演示**：[www.webgishome.com](https://www.webgishome.com)
- 📚 **在线文档**：[www.webgishome.com/docs](https://www.webgishome.com/docs/)

### 技术文档

- 📘 [Vue 3 官方文档](https://cn.vuejs.org/)
- ⚡ [Vite 官方文档](https://cn.vitejs.dev/)
- 🗺️ [Cesium 官方文档](https://cesium.com/docs/)
- 🌍 [OpenLayers 官方文档](https://openlayers.org/doc/)
- 🎨 [Element Plus 文档](https://element-plus.org/zh-CN/)

### 社区与支持

- 💬 **Issues**：[提交问题或建议](https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues)
- 👥 **Discussions**：参与讨论和交流

## 👤 关于作者

- **GitHub**: [@LiJiangJiangJiangJiang](https://github.com/LiJiangJiangJiangJiang)
- **Website**: [www.webgishome.com](https://www.webgishome.com)

---

<p align="center">Made with ❤️ by WebGIS Team</p>
<p align="center">
  <a href="#top">↑ 回到顶部 ↑</a>
</p>
