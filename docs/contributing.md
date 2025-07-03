# 贡献指南

感谢您对 BrickUI 的关注！我们欢迎任何形式的贡献。

## 开发环境搭建

### 前置要求

- Node.js >= 16
- pnpm >= 7

### 克隆项目

```bash
git clone https://github.com/your-username/BrickUI.git
cd BrickUI
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动 Vite 开发服务器
pnpm dev

# 启动 Storybook
pnpm storybook
```

## 开发流程

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 2. 开发组件

1. 在 `src/components` 目录下创建新组件
2. 编写组件的 TypeScript 类型定义
3. 添加 Storybook 故事文件
4. 更新 `src/index.ts` 导出新组件

### 3. 编写文档

1. 在 `docs/components` 目录下创建组件文档
2. 包含使用示例和 API 说明

### 4. 编写测试

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage
```

### 5. 代码检查

```bash
# 代码格式化
pnpm format

# ESLint 检查
pnpm lint

# TypeScript 类型检查
pnpm type-check
```

### 6. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 使用 commitizen 提交
pnpm commit

# 或手动提交
git commit -m "feat: add new button component"
```

提交类型：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 7. 创建 Pull Request

1. 推送分支到远程仓库
2. 在 GitHub 上创建 Pull Request
3. 填写 PR 模板
4. 等待代码审查

## 组件开发规范

### 命名规范

- 组件名使用 PascalCase，以 `Brick` 开头
- 文件名使用 PascalCase
- Props 使用 camelCase
- 事件名使用 kebab-case

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Composition API
- 组件必须有 `name` 属性
- Props 必须定义类型和默认值
- 导出的组件必须有类型声明

### 样式规范

- 使用 UnoCSS 原子化 CSS
- 避免使用内联样式
- 支持主题定制
- 响应式设计

### 文档规范

- 每个组件必须有对应的文档
- 包含基础用法示例
- 详细的 API 说明
- Props、Events、Slots 表格

## 发布流程

### 版本管理

我们使用 [Semantic Versioning](https://semver.org/)：

- `major`: 破坏性变更
- `minor`: 新功能
- `patch`: bug 修复

### 发布命令

```bash
# 补丁版本
pnpm release:patch

# 次版本
pnpm release:minor

# 主版本
pnpm release:major
```

## 问题反馈

- 使用 GitHub Issues 报告 bug
- 使用 GitHub Discussions 进行讨论
- 遵循 Issue 模板

## 行为准则

请遵循我们的[行为准则](CODE_OF_CONDUCT.md)，营造友好的社区环境。
