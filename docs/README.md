# BrickUI 文档

欢迎使用 BrickUI 组件库！这是一个基于 Vue 3 + TypeScript 构建的现代化组件库。

## 快速开始

### 安装

```bash
npm install brickui
# 或
yarn add brickui
# 或
pnpm add brickui
```

### 使用

#### 完整引入

```typescript
import { createApp } from 'vue';
import BrickUI from 'brickui';
import 'brickui/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(BrickUI);
app.mount('#app');
```

#### 按需引入

```typescript
import { BrickButton, BrickCard } from 'brickui';
import 'brickui/dist/style.css';

export default {
  components: {
    BrickButton,
    BrickCard
  }
};
```

## 组件列表

- [BrickButton](./components/button.md) - 按钮组件
- [BrickCard](./components/card.md) - 卡片组件

## 开发指南

- [贡献指南](./contributing.md)
- [设计原则](./design-principles.md)
- [更新日志](../CHANGELOG.md)

## 技术栈

- Vue 3
- TypeScript
- UnoCSS
- Vite
- Storybook
