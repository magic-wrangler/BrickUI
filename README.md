# BrickUI

一个现代化的 Vue 3 组件库，使用 TypeScript + Pinia + UnoCSS + Storybook 构建。

## 🚀 特性

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的开发体验
- **Pinia** - 直观的状态管理
- **UnoCSS** - 即时按需原子化 CSS 引擎
- **Storybook** - 交互式组件文档

## 📦 安装

```bash
npm install
```

## 🛠️ 开发

启动开发服务器：

```bash
npm run dev
```

启动 Storybook：

```bash
npm run storybook
```

## 🏗️ 构建

构建生产版本：

```bash
npm run build
```

构建 Storybook：

```bash
npm run build-storybook
```

## 🎯 代码质量

### 代码检查和格式化

运行 ESLint 检查：

```bash
npm run lint
```

自动格式化代码：

```bash
npm run format
```

### 代码规范

项目使用 ESLint + Prettier 确保代码质量和一致性：

- **引号规则**：JavaScript/TypeScript 使用单引号，Vue 模板属性使用双引号
- **分号规则**：语句结尾必须使用分号
- **缩进规则**：使用 2 个空格缩进
- **行宽限制**：最大 80 字符
- **逗号规则**：无尾随逗号

### VS Code 集成

项目包含 VS Code 工作区配置，支持：

- 保存时自动格式化
- ESLint 错误实时提示
- 自动修复可修复的问题
- TypeScript 单引号偏好设置

推荐安装以下 VS Code 扩展：
- ESLint
- Prettier - Code formatter
- Vue Language Features (Volar)

## 📝 Git 提交规范

### 提交信息格式

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 性能优化
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回滚
- **build**: 构建系统或外部依赖项的更改
- **ci**: CI 配置文件和脚本的更改

### 提交示例

```bash
# 新功能
feat(button): add loading state support

# 修复 bug
fix(card): resolve shadow rendering issue

# 文档更新
docs: update installation guide

# 代码格式
style: format code with prettier
```

### 交互式提交

使用 Commitizen 进行交互式提交：

```bash
npm run commit
```

### Git Hooks

项目配置了以下 Git hooks：

- **pre-commit**: 提交前自动运行代码检查和格式化
- **commit-msg**: 验证提交信息格式是否符合规范

### 初始化 Git Hooks

首次克隆项目后，运行以下命令初始化 Git hooks：

```bash
npm run prepare
```

## 📚 组件

### BrickButton

多功能按钮组件，支持多种变体和尺寸：

- 变体：`primary`、`secondary`、`danger`、`success`
- 尺寸：`sm`、`md`、`lg`
- 状态：`disabled`、`loading`

### BrickCard

灵活的卡片组件，支持插槽：

- 标题插槽
- 内容插槽
- 底部插槽
- 可配置阴影和边框

## 🎨 设计系统

BrickUI 遵循一致的设计系统：

- **颜色调色板** - 主色、次色、成功色、危险色
- **排版** - 一致的字体大小和权重
- **间距** - 统一的间距比例
- **阴影** - 多级阴影效果
- **圆角** - 一致的圆角处理

## 🔧 技术栈

- **Vue 3** - 组合式 API
- **TypeScript** - 完整类型支持
- **Pinia** - 状态管理
- **UnoCSS** - 原子化 CSS
- **Vite** - 构建工具
- **Storybook** - 组件文档
- **Auto Import** - 自动导入 API 和组件
- **VueUse** - Vue 组合式工具集

## ⚡ 自动导入

项目配置了自动导入功能，无需手动导入常用的 API 和组件：

### 自动导入的 API

```typescript
// 无需导入，直接使用
const count = ref(0)
const message = reactive({ text: 'Hello' })
const router = useRouter()
const store = useStore()

// VueUse 工具函数
const { x, y } = useMouse()
const isDark = useDark()
const storage = useLocalStorage('key', 'default')
```

### 自动导入的组件

```vue
<template>
  <!-- 无需导入，直接使用 src/components 下的组件 -->
  <BrickButton>按钮</BrickButton>
  <BrickCard title="卡片">内容</BrickCard>
</template>
```

### 支持的自动导入

- **Vue API**: `ref`, `reactive`, `computed`, `watch`, `onMounted` 等
- **Vue Router**: `useRouter`, `useRoute` 等
- **Pinia**: `defineStore`, `storeToRefs` 等
- **VueUse**: `useMouse`, `useDark`, `useLocalStorage` 等
- **组件**: `src/components` 目录下的所有 Vue 组件

## 📖 文档

访问 Storybook 查看完整的组件文档和示例：

```bash
npm run storybook
```

## 🤝 贡献

欢迎贡献代码！请在提交 Pull Request 之前阅读贡献指南。

## 📄 许可证

MIT License