/**
 * Vue 监控插件
 * 提供简单的方式将性能监控集成到 Vue 应用中
 */

import type { App, Plugin } from 'vue';
import { PerformanceDashboard, createPerformanceDashboard } from './dashboard';
import type { DashboardConfig } from './types';

// 插件选项
export interface MonitoringPluginOptions extends DashboardConfig {
  // 是否在开发环境中启用
  enableInDev?: boolean;
  // 是否自动初始化
  autoInit?: boolean;
  // 自定义初始化延迟（毫秒）
  initDelay?: number;
}

// 声明全局属性
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $monitoring: PerformanceDashboard;
//   }
// }

// 插件实例
let dashboardInstance: PerformanceDashboard | null = null;

/**
 * Vue 监控插件
 */
export const MonitoringPlugin: Plugin = {
  install(app: App, options: MonitoringPluginOptions = {}) {
    const {
      enableInDev = false,
      autoInit = true,
      initDelay = 1000,
      ...dashboardConfig
    } = options;

    // 检查是否应该在当前环境中启用
    const isDev = import.meta.env.DEV;
    if (isDev && !enableInDev) {
      console.log('[Monitoring] Disabled in development environment');
      return;
    }

    // 创建监控实例
    dashboardInstance = createPerformanceDashboard({
      debug: isDev,
      ...dashboardConfig
    });

    // 添加到全局属性
    app.config.globalProperties.$monitoring = dashboardInstance;

    // 提供注入
    app.provide('monitoring', dashboardInstance);

    // 自动初始化
    if (autoInit) {
      // 延迟初始化，确保应用完全加载
      setTimeout(() => {
        if (dashboardInstance) {
          dashboardInstance.init();
          console.log('[Monitoring] Performance monitoring initialized');
        }
      }, initDelay);
    }

    // 添加错误处理
    app.config.errorHandler = (err, instance, info) => {
      console.error('[Vue Error]', err, info);
      // 可以在这里发送错误到监控服务
    };
  }
};

/**
 * 获取监控实例
 */
export const getMonitoringInstance = (): PerformanceDashboard | null => {
  return dashboardInstance;
};

/**
 * Composition API 钩子
 */
export const useMonitoring = () => {
  if (!dashboardInstance) {
    console.warn('[Monitoring] Plugin not installed or not initialized');
    return null;
  }
  return dashboardInstance;
};

/**
 * 手动初始化监控（用于非插件使用场景）
 */
export const initMonitoring = (
  config?: DashboardConfig
): PerformanceDashboard => {
  if (dashboardInstance) {
    console.warn('[Monitoring] Already initialized');
    return dashboardInstance;
  }

  dashboardInstance = createPerformanceDashboard(config);
  dashboardInstance.init();

  return dashboardInstance;
};

/**
 * 销毁监控实例
 */
export const destroyMonitoring = (): void => {
  if (dashboardInstance) {
    // 这里可以添加清理逻辑
    dashboardInstance = null;
    console.log('[Monitoring] Monitoring instance destroyed');
  }
};

// 默认导出插件
export default MonitoringPlugin;
