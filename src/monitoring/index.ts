/**
 * BrickUI 监控系统入口文件
 * 统一导出所有监控相关的功能和类型
 */

// 核心类和函数
export {
  PerformanceDashboard,
  createPerformanceDashboard,
  defaultDashboard
} from './dashboard';

// Vue 插件
export {
  MonitoringPlugin,
  useMonitoring,
  getMonitoringInstance,
  initMonitoring,
  destroyMonitoring,
  type MonitoringPluginOptions
} from './plugin';

// 类型定义
export type {
  PerformanceMetrics,
  DashboardConfig,
  MetricData,
  BatchMetricData,
  MonitoringEventType,
  MonitoringEvent,
  MonitoringError,
  MonitoringStatus,
  PerformanceThresholds,
  PerformanceRating,
  PerformanceReport,
  MonitoringPlugin as IMonitoringPlugin
} from './types';

// 常量
export { DEFAULT_THRESHOLDS, DEFAULT_CONFIG } from './types';

// 默认导出插件（方便直接使用）
export { default } from './plugin';
