/**
 * 监控系统类型定义
 */

// 性能指标类型
export interface PerformanceMetrics {
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  ttfb: number; // Time to First Byte
  timestamp: number;
}

// 仪表板配置
export interface DashboardConfig {
  endpoint?: string;
  debug?: boolean;
  batchSize?: number;
  flushInterval?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

// 指标数据
export interface MetricData {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  timestamp: number;
  url: string;
  userAgent?: string;
  sessionId?: string;
  userId?: string;
}

// 批量指标数据
export interface BatchMetricData {
  metrics: MetricData[];
  sessionId: string;
  timestamp: number;
}

// 监控事件类型
export type MonitoringEventType =
  | 'metric-collected'
  | 'metric-sent'
  | 'metric-failed'
  | 'batch-sent'
  | 'config-updated';

// 监控事件
export interface MonitoringEvent {
  type: MonitoringEventType;
  data: any;
  timestamp: number;
}

// 错误信息
export interface MonitoringError {
  message: string;
  code?: string;
  timestamp: number;
  context?: Record<string, any>;
}

// 监控状态
export interface MonitoringStatus {
  isActive: boolean;
  lastMetricTime?: number;
  totalMetrics: number;
  failedMetrics: number;
  errors: MonitoringError[];
}

// 性能阈值配置
export interface PerformanceThresholds {
  lcp: {
    good: number; // < 2500ms
    needsImprovement: number; // 2500-4000ms
    poor: number; // > 4000ms
  };
  fid: {
    good: number; // < 100ms
    needsImprovement: number; // 100-300ms
    poor: number; // > 300ms
  };
  cls: {
    good: number; // < 0.1
    needsImprovement: number; // 0.1-0.25
    poor: number; // > 0.25
  };
  fcp: {
    good: number; // < 1800ms
    needsImprovement: number; // 1800-3000ms
    poor: number; // > 3000ms
  };
  ttfb: {
    good: number; // < 800ms
    needsImprovement: number; // 800-1800ms
    poor: number; // > 1800ms
  };
}

// 性能评级
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

// 性能报告
export interface PerformanceReport {
  metrics: PerformanceMetrics;
  ratings: Record<keyof PerformanceMetrics, PerformanceRating>;
  recommendations: string[];
  timestamp: number;
  url: string;
}

// 监控插件接口
export interface MonitoringPlugin {
  name: string;
  version: string;
  init(dashboard: any): void;
  destroy?(): void;
}

// 默认性能阈值
export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000, poor: Infinity },
  fid: { good: 100, needsImprovement: 300, poor: Infinity },
  cls: { good: 0.1, needsImprovement: 0.25, poor: Infinity },
  fcp: { good: 1800, needsImprovement: 3000, poor: Infinity },
  ttfb: { good: 800, needsImprovement: 1800, poor: Infinity }
};

// 默认配置
export const DEFAULT_CONFIG: Required<DashboardConfig> = {
  endpoint: '/api/metrics',
  debug: false,
  batchSize: 10,
  flushInterval: 5000,
  retryAttempts: 3,
  retryDelay: 1000
};
