# BrickUI 监控系统

一个轻量级、类型安全的 Vue.js 性能监控系统，基于 Web Vitals 指标提供实时性能监控和分析。

## 🚀 特性

- **🎯 Web Vitals 集成**: 自动收集 CLS、FID、FCP、LCP、TTFB 等核心性能指标
- **🔧 Vue 插件**: 无缝集成到 Vue 3 应用中
- **📊 批量处理**: 支持指标批量发送，减少网络请求
- **🛡️ 类型安全**: 完整的 TypeScript 类型定义
- **🔄 错误重试**: 内置重试机制，确保数据可靠传输
- **🎛️ 灵活配置**: 支持多种配置选项和环境适配
- **🧪 易于测试**: 提供工厂函数和依赖注入支持

## 📦 安装

```bash
# 确保已安装 web-vitals
pnpm add web-vitals
```

## 🎯 快速开始

### 1. 作为 Vue 插件使用（推荐）

```typescript
// main.ts
import { createApp } from 'vue';
import MonitoringPlugin from '@/monitoring';
import App from './App.vue';

const app = createApp(App);

// 使用默认配置
app.use(MonitoringPlugin);

// 或使用自定义配置
app.use(MonitoringPlugin, {
  endpoint: 'https://api.example.com/metrics',
  debug: true,
  enableInDev: true,
  batchSize: 10,
  flushInterval: 5000
});

app.mount('#app');
```

### 2. 在组件中使用

#### Composition API

```vue
<template>
  <div>
    <h1>性能监控示例</h1>
    <button @click="checkStatus">检查监控状态</button>
  </div>
</template>

<script setup lang="ts">
import { useMonitoring } from '@/monitoring';

const monitoring = useMonitoring();

const checkStatus = () => {
  if (monitoring) {
    const config = monitoring.getConfig();
    console.log('监控配置:', config);
  }
};
</script>
```

#### Options API

```vue
<script>
export default {
  mounted() {
    // 通过 this.$monitoring 访问
    if (this.$monitoring) {
      console.log('监控已启用');
    }
  }
};
</script>
```

### 3. 手动初始化

```typescript
import { initMonitoring, createPerformanceDashboard } from '@/monitoring';

// 使用默认配置
const dashboard = initMonitoring();

// 使用自定义配置
const customDashboard = createPerformanceDashboard({
  endpoint: '/api/custom-metrics',
  debug: true,
  batchSize: 20
});

customDashboard.init();
```

## ⚙️ 配置选项

### DashboardConfig

```typescript
interface DashboardConfig {
  /** API 端点 URL */
  endpoint?: string;

  /** 是否启用调试模式 */
  debug?: boolean;

  /** 批量发送的指标数量 */
  batchSize?: number;

  /** 批量发送的时间间隔（毫秒） */
  flushInterval?: number;

  /** 重试次数 */
  retryAttempts?: number;

  /** 重试延迟（毫秒） */
  retryDelay?: number;
}
```

### MonitoringPluginOptions

```typescript
interface MonitoringPluginOptions extends DashboardConfig {
  /** 是否在开发环境中启用 */
  enableInDev?: boolean;

  /** 是否自动初始化 */
  autoInit?: boolean;

  /** 初始化延迟（毫秒） */
  initDelay?: number;
}
```

## 📊 性能指标

系统自动收集以下 Web Vitals 指标：

| 指标     | 描述         | 良好阈值 |
| -------- | ------------ | -------- |
| **CLS**  | 累积布局偏移 | < 0.1    |
| **FID**  | 首次输入延迟 | < 100ms  |
| **FCP**  | 首次内容绘制 | < 1.8s   |
| **LCP**  | 最大内容绘制 | < 2.5s   |
| **TTFB** | 首字节时间   | < 800ms  |

## 🌍 环境配置

```typescript
// 根据环境动态配置
const getMonitoringConfig = () => {
  if (import.meta.env.PROD) {
    return {
      endpoint: 'https://api.production.com/metrics',
      debug: false,
      batchSize: 50,
      flushInterval: 30000
    };
  } else {
    return {
      endpoint: 'http://localhost:3001/api/metrics',
      debug: true,
      enableInDev: true,
      batchSize: 5,
      flushInterval: 3000
    };
  }
};

app.use(MonitoringPlugin, getMonitoringConfig());
```

## 🔧 API 参考

### PerformanceDashboard

```typescript
class PerformanceDashboard {
  /** 初始化监控 */
  init(): void;

  /** 获取当前配置 */
  getConfig(): DashboardConfig;

  /** 更新配置 */
  updateConfig(newConfig: Partial<DashboardConfig>): void;

  /** 手动发送指标 */
  sendMetric(data: MetricData): Promise<void>;
}
```

### 工厂函数

```typescript
/** 创建监控实例 */
function createPerformanceDashboard(
  config?: DashboardConfig
): PerformanceDashboard;

/** 手动初始化 */
function initMonitoring(config?: DashboardConfig): PerformanceDashboard;
```

### Composition API

```typescript
/** 获取监控实例 */
function useMonitoring(): PerformanceDashboard | null;

/** 获取全局监控实例 */
function getMonitoringInstance(): PerformanceDashboard | null;
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 运行特定测试文件
pnpm test tests/monitoring/dashboard.test.ts

# 运行测试并查看覆盖率
pnpm test --coverage
```

## 📈 最佳实践

### 1. 生产环境优化

```typescript
// 生产环境建议配置
app.use(MonitoringPlugin, {
  endpoint: 'https://api.yoursite.com/metrics',
  debug: false,
  enableInDev: false,
  batchSize: 50, // 增大批量大小
  flushInterval: 30000, // 增加发送间隔
  retryAttempts: 3,
  retryDelay: 2000
});
```

### 2. 开发环境调试

```typescript
// 开发环境建议配置
app.use(MonitoringPlugin, {
  endpoint: 'http://localhost:3001/api/metrics',
  debug: true,
  enableInDev: true,
  batchSize: 1, // 立即发送
  flushInterval: 1000, // 快速发送
  autoInit: true,
  initDelay: 500
});
```

### 3. 多实例管理

```typescript
// 为不同功能创建独立监控
const userMetrics = createPerformanceDashboard({
  endpoint: '/api/user-metrics'
});

const pageMetrics = createPerformanceDashboard({
  endpoint: '/api/page-metrics'
});
```

### 4. 错误处理

```typescript
// 监控初始化错误处理
try {
  const monitoring = initMonitoring({
    endpoint: '/api/metrics'
  });
  console.log('监控初始化成功');
} catch (error) {
  console.error('监控初始化失败:', error);
}
```

## 🔍 故障排除

### 常见问题

1. **监控未启动**
   - 检查是否正确安装插件
   - 确认 `enableInDev` 配置
   - 查看控制台是否有错误信息

2. **指标未发送**
   - 检查网络连接
   - 确认 API 端点是否正确
   - 查看 `debug` 模式下的日志

3. **TypeScript 类型错误**
   - 确保导入了正确的类型
   - 检查 Vue 类型声明是否正确

### 调试技巧

```typescript
// 启用详细调试
const monitoring = createPerformanceDashboard({
  debug: true,
  endpoint: '/api/metrics'
});

// 检查配置
console.log('当前配置:', monitoring.getConfig());

// 手动测试指标发送
monitoring.sendMetric({
  name: 'TEST',
  value: 100,
  timestamp: Date.now(),
  url: window.location.href
});
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

更多示例请查看 `example.ts` 文件。
