// BrickUI 组件库入口文件
import type { App } from 'vue';

// 导入所有组件
import BrickButton from './components/BrickButton.vue';
import BrickCard from './components/BrickCard.vue';

// 组件列表
const components = [BrickButton, BrickCard];

// 定义 install 方法
const install = (app: App): void => {
  components.forEach(component => {
    const name = component.name || component.__name || 'UnknownComponent';
    app.component(name, component);
  });
};

// 导出组件库
export { BrickButton, BrickCard, install };

// 默认导出
export default {
  install
};

// 版本信息
export const version = '0.3.0';
