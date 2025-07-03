# BrickButton 按钮组件

按钮用于触发一个操作，如提交表单。

## 基础用法

基础的按钮用法。

```vue
<template>
  <BrickButton>默认按钮</BrickButton>
  <BrickButton type="primary">主要按钮</BrickButton>
  <BrickButton type="success">成功按钮</BrickButton>
  <BrickButton type="warning">警告按钮</BrickButton>
  <BrickButton type="danger">危险按钮</BrickButton>
</template>
```

## 禁用状态

按钮不可用状态。

```vue
<template>
  <BrickButton disabled>禁用按钮</BrickButton>
  <BrickButton type="primary" disabled>主要按钮</BrickButton>
</template>
```

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

```vue
<template>
  <BrickButton size="large">大型按钮</BrickButton>
  <BrickButton>默认按钮</BrickButton>
  <BrickButton size="small">小型按钮</BrickButton>
</template>
```

## API

### Props

| 参数     | 说明           | 类型    | 可选值                               | 默认值 |
| -------- | -------------- | ------- | ------------------------------------ | ------ |
| type     | 类型           | string  | primary / success / warning / danger | —      |
| size     | 尺寸           | string  | large / small                        | —      |
| disabled | 是否禁用状态   | boolean | —                                    | false  |
| loading  | 是否加载中状态 | boolean | —                                    | false  |

### Events

| 事件名称 | 说明       | 回调参数       |
| -------- | ---------- | -------------- |
| click    | 点击时触发 | (event: Event) |

### Slots

| 插槽名称 | 说明     |
| -------- | -------- |
| default  | 按钮内容 |
