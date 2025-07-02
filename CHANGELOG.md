# 更新日志

本文档记录了 BrickUI 组件库的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

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
  "src/typings/**/*",    // 忽略自动生成的类型文件
  "**/*.d.ts",           // 忽略所有声明文件
  "node_modules/**/*",   // 忽略依赖包
  "dist/**/*"            // 忽略构建输出
]
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