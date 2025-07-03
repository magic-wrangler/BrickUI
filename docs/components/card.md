# BrickCard 卡片组件

将信息聚合在卡片容器中展示。

## 基础用法

包含标题，内容和操作。

```vue
<template>
  <BrickCard>
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <button class="button">操作按钮</button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">列表内容 {{ o }}</div>
  </BrickCard>
</template>
```

## 简单卡片

卡片可以只有内容区域。

```vue
<template>
  <BrickCard>
    <div v-for="o in 4" :key="o" class="text item">列表内容 {{ o }}</div>
  </BrickCard>
</template>
```

## 带图片

可配置定义更丰富的内容。

```vue
<template>
  <BrickCard>
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="image"
    />
    <div style="padding: 14px;">
      <span>好吃的汉堡</span>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <BrickButton type="text" class="button">操作按钮</BrickButton>
      </div>
    </div>
  </BrickCard>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
};
</script>
```

## 卡片阴影

可对阴影的显示进行配置。

```vue
<template>
  <BrickCard shadow="always"> 总是显示 </BrickCard>
  <BrickCard shadow="hover"> 鼠标悬浮时显示 </BrickCard>
  <BrickCard shadow="never"> 从不显示 </BrickCard>
</template>
```

## API

### Props

| 参数       | 说明                                         | 类型   | 可选值                 | 默认值              |
| ---------- | -------------------------------------------- | ------ | ---------------------- | ------------------- |
| header     | 设置 header，也可以通过 slot#header 传入 DOM | string | —                      | —                   |
| body-style | 设置 body 的样式                             | object | —                      | { padding: '20px' } |
| shadow     | 设置阴影显示时机                             | string | always / hover / never | always              |

### Slots

| 插槽名称 | 说明           |
| -------- | -------------- |
| default  | 自定义默认内容 |
| header   | 卡片标题       |
