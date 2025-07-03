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
pnpm install
```

## 🚀 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动 Storybook
pnpm storybook

# 运行测试
pnpm test

# 运行测试（UI 模式）
pnpm test:ui

# 运行测试覆盖率
pnpm test:coverage

# 运行 E2E 测试
pnpm test:e2e
```

## 🏗️ 构建

```bash
# 构建项目
pnpm build

# 构建组件库
pnpm build:lib

# 构建 Storybook
pnpm build-storybook

# 预览构建结果
pnpm preview
```

## 🔍 代码质量

```bash
# ESLint 检查
pnpm lint

# ESLint 检查（仅检查，不修复）
pnpm lint:check

# 代码格式化
pnpm format

# 代码格式检查
pnpm format:check

# TypeScript 类型检查
pnpm type-check
```

## 📦 发布

```bash
# 发布补丁版本
pnpm release:patch

# 发布次版本
pnpm release:minor

# 发布主版本
pnpm release:major

# 提交代码（使用 commitizen）
pnpm commit
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
const count = ref(0);
const message = reactive({ text: 'Hello' });
const router = useRouter();
const store = useStore();

// VueUse 工具函数
const { x, y } = useMouse();
const isDark = useDark();
const storage = useLocalStorage('key', 'default');
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

## 项目结构

```
BrickUI/
├── .github/                 # GitHub 配置
│   ├── workflows/           # CI/CD 工作流
│   │   ├── ci.yml          # 持续集成
│   │   └── release.yml     # 发布流程
│   ├── ISSUE_TEMPLATE/      # Issue 模板
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                    # 项目文档
│   ├── components/          # 组件文档
│   ├── contributing.md      # 贡献指南
│   ├── design-principles.md # 设计原则
│   └── README.md           # 文档首页
├── src/
│   ├── components/          # 组件目录
│   │   ├── BrickButton.vue
│   │   ├── BrickButton.stories.ts
│   │   ├── BrickCard.vue
│   │   └── BrickCard.stories.ts
│   ├── stores/              # Pinia 状态管理
│   ├── typings/             # 类型声明文件
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── index.ts             # 组件库入口
├── tests/                   # 测试文件
│   ├── components/          # 组件测试
│   ├── e2e/                # E2E 测试
│   └── setup.ts            # 测试配置
├── .storybook/              # Storybook 配置
├── public/                  # 静态资源
├── .husky/                  # Git hooks
├── .eslintrc.cjs            # ESLint 配置
├── .lintstagedrc.json       # Lint-staged 配置
├── .gitignore
├── .prettierrc              # Prettier 配置
├── CHANGELOG.md             # 更新日志
├── commitlint.config.cjs    # Commitlint 配置
├── package.json
├── playwright.config.ts     # Playwright 配置
├── tsconfig.json            # TypeScript 配置
├── uno.config.ts            # UnoCSS 配置
├── vite.config.ts           # Vite 配置
├── vite.config.lib.ts       # 库构建配置
├── vitest.config.ts         # Vitest 配置
└── README.md
```

## 🤝 贡献

欢迎贡献代码！请在提交 Pull Request 之前阅读贡献指南。

## 📄 许可证

[MIT License](LICENSE).

## 📋 版本更新记录

### v0.2.0 (2024-12-19)

**🔧 代码质量增强**

- ✅ 启用 TypeScript 严格模式
  - 添加完整的严格类型检查配置
  - 包括 `strict`、`noImplicitAny`、`strictNullChecks` 等选项
  - 提升类型安全性和代码可靠性
- ✅ ESLint 规则增强
  - 添加 TypeScript 严格规则：禁止 `any` 类型、未使用变量检查
  - 增强 Vue 组件规则：组件命名规范、HTML 属性格式
  - 添加代码质量规则：优先使用 `const`、禁止 `var`
  - 配置忽略自动生成的类型文件
- ✅ 修复配置兼容性问题
  - 解决 commitlint 配置文件模块格式问题
  - 优化 ESLint 配置以避免规则冲突
  - 确保所有代码质量工具正常工作

**📈 开发体验提升**

- 更严格的类型检查帮助在开发阶段捕获潜在错误
- 统一的代码风格和质量标准
- 更好的 IDE 支持和错误提示

### v0.1.0 (2024-12-18)

**🎉 初始版本**

- ✅ 基础项目架构搭建
- ✅ Vue 3 + TypeScript + Vite 开发环境
- ✅ Pinia 状态管理集成
- ✅ UnoCSS 原子化样式系统
- ✅ Storybook 组件文档系统
- ✅ 基础组件：BrickButton、BrickCard
- ✅ 代码规范工具：ESLint + Prettier + Husky
- ✅ Git 提交规范：commitlint + conventional commits
- ✅ 自动导入配置：Vue API、组件、工具函数

## 🎯 开发路线图

- 短期目标 : 添加测试框架、完善组件文档
- 中期目标 : 优化项目结构、添加 CI/CD
- 长期目标 : 性能监控、安全审计
