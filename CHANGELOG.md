# 更新日志

本文档记录了 BrickUI 组件库的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.3.0] - 2024-01-XX

### 新增 ✨

**项目结构优化**

- 创建完整的项目目录结构
- 新增 `docs/` 文档目录，包含组件文档、贡献指南、设计原则
- 新增 `tests/` 测试目录，支持单元测试和 E2E 测试
- 创建组件库入口文件 `src/index.ts`

**CI/CD 流水线**

- 新增 GitHub Actions 工作流配置
  - `ci.yml`: 代码质量检查、测试、构建、部署
  - `release.yml`: 自动化发布流程
- 新增 GitHub Issue 和 PR 模板
- 配置自动化质量门禁

**测试框架集成**

- 集成 Vitest 单元测试框架
- 配置 Playwright E2E 测试
- 添加测试覆盖率报告
- 创建组件测试示例

**构建系统增强**

- 新增库构建模式支持
- 配置多格式输出 (ES, UMD)
- 优化 Vite 配置，支持开发和库构建模式切换
- 新增 TypeScript 声明文件生成

**开发工具优化**

- 配置 lint-staged 代码质量门禁
- 增强 pre-commit 钩子，添加类型检查
- 新增 standard-version 自动化版本管理
- 优化 package.json 脚本命令

### 修复 🐛

**配置兼容性**

- 修复 Vite 配置中的模式切换逻辑
- 优化 TypeScript 配置兼容性
- 修复测试环境配置问题

### 改进 🚀

**文档完善**

- 创建详细的组件使用文档
- 编写贡献指南和开发规范
- 制定设计原则和代码规范
- 更新 README.md 项目结构说明

**开发体验**

- 统一代码风格和提交规范
- 增强错误提示和调试信息
- 优化开发服务器配置
- 改进构建性能和输出

**质量保证**

- 建立完整的测试体系
- 配置代码覆盖率阈值
- 实施自动化质量检查
- 增强类型安全保障

### 技术栈更新 🔧

**新增依赖**

- `vitest`: ^1.0.4 - 单元测试框架
- `@vue/test-utils`: ^2.4.3 - Vue 组件测试工具
- `jsdom`: ^23.0.1 - DOM 环境模拟
- `@vitest/coverage-v8`: ^1.0.4 - 测试覆盖率
- `@vitest/ui`: ^1.0.4 - 测试 UI 界面
- `@playwright/test`: ^1.40.1 - E2E 测试框架
- `standard-version`: ^9.5.0 - 版本管理工具
- `lint-staged`: ^15.2.0 - 暂存区代码检查

**配置文件**

- `vitest.config.ts`: Vitest 测试配置
- `playwright.config.ts`: Playwright E2E 测试配置
- `.lintstagedrc.json`: lint-staged 配置
- `vite.config.lib.ts`: 库构建专用配置

### 🚀 新增功能特性

脚本命令：

- pnpm test - 运行单元测试
- pnpm test:coverage - 测试覆盖率报告
- pnpm test:e2e - E2E 测试
- pnpm build:lib - 构建组件库
- pnpm release:patch/minor/major - 版本发布
- pnpm lint:check / pnpm format:check - 代码质量检查

## [0.2.0] - 2024-12-19

### 🔧 TypeScript 严格模式配置

**配置文件变更：`tsconfig.json`**

- ✅ 启用完整的 TypeScript 严格模式
  ```json
  {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true
  }
  ```
- ✅ 增强类型检查选项
  - `noUnusedLocals: true` - 检查未使用的局部变量
  - `noUnusedParameters: true` - 检查未使用的函数参数
  - `exactOptionalPropertyTypes: true` - 精确的可选属性类型
  - `noImplicitReturns: true` - 确保函数所有路径都有返回值
  - `noFallthroughCasesInSwitch: true` - 防止 switch 语句穿透
  - `noUncheckedIndexedAccess: true` - 索引访问的严格检查

**影响和收益：**

- 🛡️ 在编译时捕获更多潜在错误
- 📝 强制明确的类型声明，提升代码可读性
- 🔍 更好的 IDE 智能提示和错误检测
- 🚀 减少运行时类型相关的 bug

### 🔍 ESLint 规则全面增强

**配置文件变更：`.eslintrc.cjs`**

**TypeScript 严格规则：**

- ✅ `@typescript-eslint/no-explicit-any: "error"` - 禁止使用 `any` 类型
- ✅ `@typescript-eslint/no-unused-vars: "error"` - 检查未使用的变量
- ✅ `@typescript-eslint/explicit-function-return-type: "warn"` - 要求函数明确返回类型
- ✅ `@typescript-eslint/no-inferrable-types: "error"` - 禁止不必要的类型注解
- ✅ `@typescript-eslint/prefer-as-const: "error"` - 优先使用 as const 断言

**Vue 组件规则增强：**

- ✅ `vue/component-name-in-template-casing: ["error", "PascalCase"]` - 组件名使用 PascalCase
- ✅ `vue/component-definition-name-casing: ["error", "PascalCase"]` - 组件定义名规范
- ✅ `vue/html-self-closing: "error"` - HTML 自闭合标签规范
- ✅ `vue/max-attributes-per-line: ["error", { "singleline": 3 }]` - 属性换行规范
- ✅ `vue/multiline-html-element-content-newline: "error"` - 多行元素内容换行

**代码质量规则：**

- ✅ `prefer-const: "error"` - 优先使用 const 声明
- ✅ `no-var: "error"` - 禁止使用 var
- ✅ `no-console: ["warn", { "allow": ["warn", "error"] }]` - 限制 console 使用
- ✅ `eqeqeq: ["error", "always"]` - 强制使用严格相等
- ✅ `curly: ["error", "all"]` - 强制使用大括号

**忽略配置优化：**

```javascript
ignorePatterns: [
  'src/typings/**/*', // 忽略自动生成的类型文件
  '**/*.d.ts', // 忽略所有声明文件
  'node_modules/**/*', // 忽略依赖包
  'dist/**/*' // 忽略构建输出
];
```

### 🛠️ 配置兼容性修复

**commitlint 配置修复：**

- 🔧 **问题**：ES 模块与 CommonJS 兼容性冲突
- 🔧 **解决方案**：`commitlint.config.js` → `commitlint.config.cjs`
- 🔧 **影响**：确保 Git hooks 正常工作，提交信息规范检查生效

**ESLint 配置优化历程：**

1. **初始问题**：过于严格的规则导致 Vue 组件编译失败
2. **调试过程**：
   - 移除 `plugin:@typescript-eslint/recommended-requiring-type-checking`
   - 简化 `parserOptions` 配置
   - 逐步移除冲突规则
3. **最终方案**：平衡严格性与实用性的规则配置

### 📝 代码质量提升

**函数类型声明规范化：**

- 🔧 `BrickButton.vue` - 为 `handleClick` 函数添加 `: void` 返回类型
- 🔧 所有组件方法都要求明确的返回类型声明
- 🔧 提升代码的自文档化程度

**开发体验优化：**

- 🚀 **IDE 支持**：更准确的类型提示和错误检测
- 🚀 **编译时检查**：在开发阶段就能发现潜在问题
- 🚀 **代码提示**：更智能的自动补全和重构支持
- 🚀 **团队协作**：统一的代码风格和质量标准

### 📊 质量指标改进

**ESLint 检查结果：**

- ✅ 从 36+ 个问题降至 0 个错误
- ✅ TypeScript 编译检查通过
- ✅ 所有代码质量工具正常运行

**技术债务清理：**

- 🧹 移除了不必要的 `any` 类型使用
- 🧹 规范了变量声明方式（const > let > var）
- 🧹 统一了组件命名和代码风格
- 🧹 优化了自动生成文件的处理方式

## [0.1.0] - 2024-12-18

### 新增

- 🎉 初始项目发布
- Vue 3 + TypeScript + Vite 开发环境搭建
- Pinia 状态管理集成
- UnoCSS 原子化样式系统
- Storybook 组件文档系统
- 基础组件库
  - BrickButton：支持多种变体和尺寸的按钮组件
  - BrickCard：灵活的卡片容器组件
- 开发工具链
  - ESLint + Prettier 代码格式化
  - Husky Git hooks
  - commitlint 提交规范
- 自动导入功能
  - Vue 3 Composition API 自动导入
  - Pinia store 自动导入
  - 组件自动导入
  - VueUse 工具函数自动导入

### 技术栈

- **前端框架**: Vue 3.3.8
- **开发语言**: TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia 2.1.7
- **样式方案**: UnoCSS
- **组件文档**: Storybook
- **代码质量**: ESLint + Prettier + Husky
- **包管理器**: pnpm

---

## 版本说明

- **主版本号**：当你做了不兼容的 API 修改
- **次版本号**：当你做了向下兼容的功能性新增
- **修订号**：当你做了向下兼容的问题修正

## 贡献指南

如果你想为 BrickUI 贡献代码，请确保：

1. 遵循现有的代码风格和规范
2. 为新功能添加相应的测试
3. 更新相关文档
4. 在 Pull Request 中详细描述你的更改

感谢所有贡献者的支持！ 🙏
