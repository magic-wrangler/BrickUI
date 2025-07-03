// 性能监控仪表板配置
import {
  onCLS as getCLS,
  onFCP as getFCP,
  onINP as getINP,
  onLCP as getLCP,
  onTTFB as getTTFB
} from 'web-vitals';
import type {
  PerformanceMetrics,
  DashboardConfig,
  MetricData
  // MonitoringStatus,
  // MonitoringError
} from './types';
import { DEFAULT_CONFIG } from './types';

// 重新导出类型以保持向后兼容
export type {
  PerformanceMetrics,
  DashboardConfig,
  MetricData,
  MonitoringStatus,
  MonitoringError
} from './types';

export class PerformanceDashboard {
  private metrics: PerformanceMetrics[] = [];
  private config: Required<DashboardConfig>;

  constructor(config: DashboardConfig = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    };
  }

  init() {
    getCLS(this.onCLS.bind(this));
    getINP(this.onFID.bind(this));
    getFCP(this.onFCP.bind(this));
    getLCP(this.onLCP.bind(this));
    getTTFB(this.onTTFB.bind(this));
  }

  private onCLS(metric: any) {
    this.sendMetric('cls', metric.value);
  }

  private onFID(metric: any) {
    this.sendMetric('fid', metric.value);
  }

  private onFCP(metric: any) {
    this.sendMetric('fcp', metric.value);
  }

  private onLCP(metric: any) {
    this.sendMetric('lcp', metric.value);
  }

  private onTTFB(metric: any) {
    this.sendMetric('ttfb', metric.value);
  }

  private async sendMetric(name: string, value: number): Promise<void> {
    const metric: MetricData = {
      name: name.toUpperCase() as MetricData['name'],
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (this.config.debug) {
        console.log('Metric sent successfully:', metric);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Failed to send metric:', error);
      }
      // 可以在这里实现重试机制或本地存储
    }
  }

  // 获取配置的公共方法
  public getConfig(): DashboardConfig {
    return { ...this.config };
  }

  // 更新配置的公共方法
  public updateConfig(newConfig: Partial<DashboardConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// 工厂函数
export const createPerformanceDashboard = (
  config?: DashboardConfig
): PerformanceDashboard => {
  return new PerformanceDashboard(config);
};

// 默认实例
export const defaultDashboard = new PerformanceDashboard();

// 默认导出类
export default PerformanceDashboard;
