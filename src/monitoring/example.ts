/**
 * 监控系统使用示例
 * 展示如何在不同场景下使用 BrickUI 监控系统
 */

import { createApp } from 'vue';
import {
  MonitoringPlugin,
  createPerformanceDashboard,
  // useMonitoring,
  initMonitoring,
  type DashboardConfig,
  type MonitoringPluginOptions
} from './index';

// ============================================
// 示例 1: 作为 Vue 插件使用（推荐）
// ============================================

// 基本使用
const app = createApp({});

// 使用默认配置
app.use(MonitoringPlugin);

// 使用自定义配置
const pluginOptions: MonitoringPluginOptions = {
  endpoint: 'https://api.example.com/metrics',
  debug: true,
  enableInDev: true,
  autoInit: true,
  initDelay: 2000,
  batchSize: 20,
  flushInterval: 10000
};

app.use(MonitoringPlugin, pluginOptions);

// ============================================
// 示例 2: 在组件中使用 Composition API
// ============================================

/*
<template>
  <div>
    <h1>性能监控示例</h1>
    <button @click="checkMonitoring">检查监控状态</button>
    <button @click="updateConfig">更新配置</button>
  </div>
</template>

<script setup lang="ts">
import { useMonitoring } from '@/monitoring';

const monitoring = useMonitoring();

const checkMonitoring = () => {
  if (monitoring) {
    const config = monitoring.getConfig();
    console.log('当前监控配置:', config);
  } else {
    console.log('监控未初始化');
  }
};

const updateConfig = () => {
  if (monitoring) {
    monitoring.updateConfig({
      debug: !monitoring.getConfig().debug
    });
    console.log('配置已更新');
  }
};
</script>
*/

// ============================================
// 示例 3: 在组件中使用 Options API
// ============================================

/*
export default {
  mounted() {
    // 通过 this.$monitoring 访问监控实例
    if (this.$monitoring) {
      console.log('监控已启用:', this.$monitoring.getConfig());
    }
  },
  
  methods: {
    toggleDebug() {
      if (this.$monitoring) {
        const currentConfig = this.$monitoring.getConfig();
        this.$monitoring.updateConfig({
          debug: !currentConfig.debug
        });
      }
    }
  }
};
*/

// ============================================
// 示例 4: 手动初始化（不使用插件）
// ============================================

// 基本手动初始化
const dashboard1 = initMonitoring();

// 使用自定义配置手动初始化
const customConfig: DashboardConfig = {
  endpoint: 'https://custom-api.com/metrics',
  debug: process.env.NODE_ENV === 'development',
  batchSize: 15,
  flushInterval: 8000
};

const dashboard2 = initMonitoring(customConfig);

// ============================================
// 示例 5: 创建多个监控实例
// ============================================

// 为不同的功能模块创建独立的监控实例
const userActionMonitoring = createPerformanceDashboard({
  endpoint: '/api/user-metrics',
  debug: true
});

const pageLoadMonitoring = createPerformanceDashboard({
  endpoint: '/api/page-metrics',
  debug: false,
  batchSize: 5
});

// 分别初始化
userActionMonitoring.init();
pageLoadMonitoring.init();

// ============================================
// 示例 6: 环境配置
// ============================================

// 根据环境动态配置
const getMonitoringConfig = (): MonitoringPluginOptions => {
  const baseConfig: MonitoringPluginOptions = {
    autoInit: true,
    initDelay: 1000
  };

  if (import.meta.env.PROD) {
    // 生产环境配置
    return {
      ...baseConfig,
      endpoint: 'https://api.production.com/metrics',
      debug: false,
      enableInDev: false,
      batchSize: 50,
      flushInterval: 30000
    };
  } else if (import.meta.env.DEV) {
    // 开发环境配置
    return {
      ...baseConfig,
      endpoint: 'http://localhost:3001/api/metrics',
      debug: true,
      enableInDev: true,
      batchSize: 5,
      flushInterval: 3000
    };
  } else {
    // 测试环境配置
    return {
      ...baseConfig,
      endpoint: 'https://api.staging.com/metrics',
      debug: true,
      enableInDev: true,
      batchSize: 10,
      flushInterval: 5000
    };
  }
};

// 使用环境配置
app.use(MonitoringPlugin, getMonitoringConfig());

// ============================================
// 示例 7: 错误处理和调试
// ============================================

// 监听监控事件（如果实现了事件系统）
// const monitoringWithEvents = createPerformanceDashboard({
//   debug: true,
//   endpoint: '/api/metrics'
// });

// 手动发送自定义指标（如果需要扩展）
// 注意：这需要在实际实现中添加相应的方法
/*
monitoringWithEvents.sendCustomMetric({
  name: 'CUSTOM_METRIC',
  value: 123,
  timestamp: Date.now(),
  url: window.location.href,
  context: {
    userId: 'user123',
    feature: 'shopping-cart'
  }
});
*/

// ============================================
// 示例 8: TypeScript 类型使用
// ============================================

import type {
  // PerformanceMetrics,
  MetricData,
  // PerformanceReport,
  PerformanceRating
} from './index';

// 类型安全的配置
const typedConfig: DashboardConfig = {
  endpoint: '/api/metrics',
  debug: true,
  batchSize: 10,
  flushInterval: 5000,
  retryAttempts: 3,
  retryDelay: 1000
};

// 类型安全的指标数据
const sampleMetric: MetricData = {
  name: 'LCP',
  value: 2500,
  timestamp: Date.now(),
  url: 'https://example.com',
  userAgent: navigator.userAgent,
  sessionId: 'session123',
  userId: 'user456'
};

// 性能评级函数示例
const evaluatePerformance = (lcp: number): PerformanceRating => {
  if (lcp < 2500) return 'good';
  if (lcp < 4000) return 'needs-improvement';
  return 'poor';
};

console.log('LCP 评级:', evaluatePerformance(2500));

export {
  app,
  dashboard1,
  dashboard2,
  userActionMonitoring,
  pageLoadMonitoring,
  getMonitoringConfig,
  typedConfig,
  sampleMetric,
  evaluatePerformance
};
