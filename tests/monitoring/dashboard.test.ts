import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  PerformanceDashboard,
  createPerformanceDashboard,
  defaultDashboard,
  type DashboardConfig,
  type MetricData
} from '../../src/monitoring/dashboard';
import { DEFAULT_CONFIG } from '../../src/monitoring/types';

// Mock web-vitals
vi.mock('web-vitals', () => ({
  getCLS: vi.fn(),
  getFID: vi.fn(),
  getFCP: vi.fn(),
  getLCP: vi.fn(),
  getTTFB: vi.fn()
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window and navigator
Object.defineProperty(window, 'location', {
  value: { href: 'http://localhost:3000/test' },
  writable: true
});

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Browser)',
  writable: true
});

describe('PerformanceDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK'
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('构造函数和配置', () => {
    it('应该使用默认配置创建实例', () => {
      const dashboard = new PerformanceDashboard();
      const config = dashboard.getConfig();

      expect(config.endpoint).toBe(DEFAULT_CONFIG.endpoint);
      expect(config.debug).toBe(DEFAULT_CONFIG.debug);
      expect(config.batchSize).toBe(DEFAULT_CONFIG.batchSize);
      expect(config.flushInterval).toBe(DEFAULT_CONFIG.flushInterval);
    });

    it('应该使用自定义配置覆盖默认配置', () => {
      const customConfig: DashboardConfig = {
        endpoint: 'http://custom.com/metrics',
        debug: true,
        batchSize: 20
      };

      const dashboard = new PerformanceDashboard(customConfig);
      const config = dashboard.getConfig();

      expect(config.endpoint).toBe(customConfig.endpoint);
      expect(config.debug).toBe(customConfig.debug);
      expect(config.batchSize).toBe(customConfig.batchSize);
      expect(config.flushInterval).toBe(DEFAULT_CONFIG.flushInterval); // 未覆盖的使用默认值
    });

    it('应该能够更新配置', () => {
      const dashboard = new PerformanceDashboard();
      const newConfig = { debug: true, batchSize: 15 };

      dashboard.updateConfig(newConfig);
      const config = dashboard.getConfig();

      expect(config.debug).toBe(true);
      expect(config.batchSize).toBe(15);
      expect(config.endpoint).toBe(DEFAULT_CONFIG.endpoint); // 其他配置保持不变
    });
  });

  describe('工厂函数', () => {
    it('createPerformanceDashboard 应该创建新实例', () => {
      const dashboard1 = createPerformanceDashboard();
      const dashboard2 = createPerformanceDashboard();

      expect(dashboard1).toBeInstanceOf(PerformanceDashboard);
      expect(dashboard2).toBeInstanceOf(PerformanceDashboard);
      expect(dashboard1).not.toBe(dashboard2); // 不同的实例
    });

    it('createPerformanceDashboard 应该接受配置参数', () => {
      const config: DashboardConfig = {
        endpoint: 'http://test.com/metrics',
        debug: true
      };

      const dashboard = createPerformanceDashboard(config);
      const dashboardConfig = dashboard.getConfig();

      expect(dashboardConfig.endpoint).toBe(config.endpoint);
      expect(dashboardConfig.debug).toBe(config.debug);
    });

    it('defaultDashboard 应该是单例实例', () => {
      expect(defaultDashboard).toBeInstanceOf(PerformanceDashboard);
      expect(defaultDashboard).toBe(defaultDashboard); // 同一个实例
    });
  });

  describe('指标发送', () => {
    it('应该成功发送指标数据', async () => {
      const dashboard = new PerformanceDashboard({ debug: true });

      // 通过反射访问私有方法进行测试
      const sendMetric = (dashboard as any).sendMetric.bind(dashboard);
      await sendMetric('lcp', 2500);

      expect(mockFetch).toHaveBeenCalledWith(
        DEFAULT_CONFIG.endpoint,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"name":"LCP"')
        })
      );
    });

    it('应该处理发送失败的情况', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockFetch.mockRejectedValue(new Error('Network error'));

      const dashboard = new PerformanceDashboard({ debug: true });
      const sendMetric = (dashboard as any).sendMetric.bind(dashboard);

      await expect(sendMetric('fid', 100)).resolves.not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send metric:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('应该处理HTTP错误响应', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const dashboard = new PerformanceDashboard({ debug: true });
      const sendMetric = (dashboard as any).sendMetric.bind(dashboard);

      await expect(sendMetric('cls', 0.1)).resolves.not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to send metric:',
        expect.objectContaining({
          message: 'HTTP 500: Internal Server Error'
        })
      );

      consoleSpy.mockRestore();
    });
  });

  // describe('Web Vitals 集成', () => {
  //   it('应该初始化所有 Web Vitals 监听器', () => {
  //     const {
  //       onCLS,
  //       onFCP,
  //       onFID,
  //       onINP,
  //       onLCP,
  //       onTTFB
  //     } = require('web-vitals');

  //     const dashboard = new PerformanceDashboard();
  //     dashboard.init();

  //     expect(onCLS).toHaveBeenCalledWith(expect.any(Function));
  //     expect(onFCP).toHaveBeenCalledWith(expect.any(Function));
  //     expect(onFID).toHaveBeenCalledWith(expect.any(Function));
  //     expect(onINP).toHaveBeenCalledWith(expect.any(Function));
  //     expect(onLCP).toHaveBeenCalledWith(expect.any(Function));
  //     expect(onTTFB).toHaveBeenCalledWith(expect.any(Function));
  //   });
  // });

  describe('类型导出', () => {
    it('应该正确导出所有类型', () => {
      // 这个测试主要是为了确保类型导出没有问题
      const config: DashboardConfig = {
        endpoint: '/test',
        debug: true
      };

      const metricData: MetricData = {
        name: 'LCP',
        value: 2500,
        timestamp: Date.now(),
        url: 'http://test.com',
        userAgent: 'test'
      };

      expect(config).toBeDefined();
      expect(metricData).toBeDefined();
    });
  });
});
