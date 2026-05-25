# 贡献指南

感谢您对本项目感兴趣！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复或新功能

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [提交 Pull Request](#提交-pull-request)
- [代码规范](#代码规范)
- [Commit 消息规范](#commit-消息规范)

## 行为准则

本项目采用开放和友好的社区准则。请尊重所有参与者，保持专业和友善的交流方式。

## 如何贡献

### 1. 报告 Bug

如果您发现了 Bug，请通过 [Issues](https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues) 页面提交报告。

**提交 Bug 报告时请包含：**

- 清晰简洁的标题
- 详细的 Bug 描述
- 复现步骤
- 期望行为和实际行为
- 浏览器和操作系统信息
- 相关截图或日志（如果有）

### 2. 提出新功能建议

如果您有新功能的想法，请先创建一个 Issue 讨论这个想法是否适合本项目。

**提交功能建议时请说明：**

- 这个功能解决什么问题
- 为什么这个功能对项目有价值
- 可能的实现方案（如果有）

### 3. 提交代码

#### 第一步：Fork 和克隆

```bash
# Fork 本仓库后，克隆到您的本地
git clone https://github.com/YOUR_USERNAME/cesium-examples-webgishome.git
cd cesium-examples-webgishome

# 添加上游仓库
git remote add upstream https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome.git
```

#### 第二步：创建分支

```bash
# 确保您的 main 分支是最新的
git checkout main
git pull upstream main

# 创建新的特性分支
git checkout -b feature/your-feature-name
# 或者修复 bug
git checkout -b fix/bug-description
```

#### 第三步：开发和测试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行构建测试
npm run build
```

#### 第四步：提交更改

```bash
# 添加更改
git add .

# 提交（遵循 Commit 消息规范）
git commit -m "feat: add your feature description"

# 推送到您的 fork
git push origin feature/your-feature-name
```

#### 第五步：创建 Pull Request

1. 访问您的 fork 仓库
2. 点击 "Compare & pull request"
3. 填写 PR 描述
4. 等待审核和合并

## 开发环境设置

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5176 查看应用。

### 构建生产版本

```bash
npm run build
```

## 提交 Pull Request

### PR 检查清单

在提交 PR 之前，请确保：

- [ ] 代码遵循项目的代码规范
- [ ] 添加了必要的测试（如果适用）
- [ ] 更新了相关文档
- [ ] Commit 消息符合规范
- [ ] PR 描述清晰说明了更改内容
- [ ] 链接了相关的 Issue（如果有）

### PR 描述模板

```markdown
## 描述

简要说明这个 PR 做了什么更改

## 类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 其他（请说明）

## 相关链接

- Fixes #(issue number)
- Closes #(issue number)

## 测试

说明您如何测试这些更改

## 截图（如果适用）

添加前后对比截图
```

## 代码规范

### JavaScript/TypeScript

- 使用 TypeScript 编写代码
- 遵循 ESLint 配置规则
- 使用有意义的变量和函数名
- 添加必要的注释
- 保持函数单一职责

### Vue 组件

- 使用 Composition API (`<script setup>`)
- 组件名使用 PascalCase
- Props 需要定义类型和默认值
- 保持组件小而专注

### CSS/SCSS

- 使用 BEM 命名规范或类似的模块化方式
- 避免使用 !important
- 保持样式的一致性

## Commit 消息规范

本项目采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码逻辑）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的更改

### 示例

```bash
# 新功能
git commit -m "feat: add dark mode support"

# Bug 修复
git commit -m "fix: resolve memory leak in map component"

# 文档更新
git commit -m "docs: update README with installation guide"

# 带 scope
git commit -m "feat(header): add github link to header"
```

## 添加新示例

如果您想添加新的地图示例：

1. 在 `public/examples/` 下创建示例文件夹
2. 编写 HTML 文件，确保包含必要的依赖
3. 在 `public/config.json` 中添加配置项
4. 测试示例是否正常运行
5. 提交 PR

**示例配置格式：**

```json
{
  "name": "示例名称",
  "path": "examples/cesium/category/example/index.html",
  "category": "分类名称",
  "description": "简短描述"
}
```

## 问题反馈

如果您在贡献过程中遇到任何问题：

- 查看现有的 [Issues](https://github.com/LiJiangJiangJiangJiang/cesium-examples-webgishome/issues)
- 创建新的 Issue 寻求帮助
- 在项目 Discussions 中提问

## 致谢

感谢所有为本项目做出贡献的开发者！您的每一份贡献都让这个项目变得更好。

---

<p align="center">Made with ❤️ by WebGIS Team</p>
