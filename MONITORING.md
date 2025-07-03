# BrickUI 监控与安全系统

本文档介绍 BrickUI 项目中集成的性能监控、安全审计和报告系统的使用方法。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动监控服务器

```bash
# 启动监控服务器（端口 3001）
pnpm run monitor:start
```

### 在应用中集成性能监控

```typescript
// 在你的 Vue 应用中引入监控
import { PerformanceDashboard } from './src/monitoring/dashboard';

// 初始化监控
const dashboard = new PerformanceDashboard({
  endpoint: 'http://localhost:3001/api/metrics',
  debug: true
});

// 开始收集指标
dashboard.init();
```

## 📊 性能监控

### 可用脚本

```bash
# 生成性能报告
pnpm run report:performance

# 运行 Lighthouse 分析
pnpm run lighthouse

# 分析打包体积
pnpm run analyze
pnpm run build:analyze
```

### 监控指标

- **LCP (Largest Contentful Paint)**: 最大内容绘制时间
- **FID (First Input Delay)**: 首次输入延迟
- **CLS (Cumulative Layout Shift)**: 累积布局偏移
- **FCP (First Contentful Paint)**: 首次内容绘制
- **TTFB (Time to First Byte)**: 首字节时间

### 性能阈值

| 指标 | 良好    | 需要改进      | 差      |
| ---- | ------- | ------------- | ------- |
| LCP  | < 2.5s  | 2.5s - 4.0s   | > 4.0s  |
| FID  | < 100ms | 100ms - 300ms | > 300ms |
| CLS  | < 0.1   | 0.1 - 0.25    | > 0.25  |

## 🔒 安全审计

### 可用脚本

```bash
# 运行安全审计
pnpm run audit

# 生成安全报告
pnpm run report:security

# 自动修复安全漏洞
pnpm run security:auto-fix
```

### 自动化安全修复

系统会自动：

1. 扫描依赖漏洞
2. 尝试自动修复
3. 生成修复报告
4. 创建 Pull Request（在 CI/CD 环境中）

## 📈 报告系统

### 生成报告

```bash
# 生成完整的性能和安全报告
node scripts/generate-reports.js
```

### 报告内容

#### 性能报告

- Lighthouse 分析结果
- Bundle 大小分析
- 性能指标趋势
- 优化建议

#### 安全报告

- 依赖漏洞扫描
- 安全风险评估
- 修复建议
- 合规性检查

### 查看报告

报告生成后会保存在以下位置：

- `reports/performance-report.html` - 性能报告
- `reports/security-report.html` - 安全报告
- `reports/performance-data.json` - 性能数据
- `reports/security-data.json` - 安全数据

## 🔄 自动化工作流

### GitHub Actions

项目配置了以下自动化工作流：

1. **安全自动修复** (`.github/workflows/security-auto-fix.yml`)
   - 每周一凌晨运行
   - 自动扫描和修复安全漏洞
   - 创建 Pull Request

2. **报告生成** (`.github/workflows/reports.yml`)
   - 每周一早上6点运行
   - 生成性能和安全报告
   - 部署到 GitHub Pages

### 手动触发

你也可以在 GitHub Actions 页面手动触发这些工作流。

## 🛠️ 配置

### Lighthouse 配置

编辑 `lighthouserc.js` 文件来自定义 Lighthouse 配置：

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm run dev',
      url: ['http://localhost:5173'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    }
  }
};
```

### 监控服务器配置

监控服务器默认运行在端口 3001，你可以通过环境变量修改：

```bash
PORT=3001 node scripts/monitoring-server.js
```

## 📱 监控仪表板

访问 `http://localhost:3001/dashboard` 查看实时监控仪表板，包括：

- 实时性能指标
- 性能趋势图
- 状态监控
- 自动刷新功能

## 🚨 告警和通知

### 性能告警

当性能指标超过阈值时，系统会：

1. 在控制台输出警告
2. 记录到日志文件
3. 发送到监控服务器

### 安全告警

当发现安全漏洞时，系统会：

1. 生成详细的安全报告
2. 尝试自动修复
3. 创建 GitHub Issue（如果配置）

## 🔧 故障排除

### 常见问题

1. **监控服务器无法启动**
   - 检查端口 3001 是否被占用
   - 确保所有依赖已正确安装

2. **Lighthouse 报告生成失败**
   - 确保开发服务器正在运行
   - 检查 `lighthouserc.js` 配置

3. **安全扫描失败**
   - 更新 `pnpm` 到最新版本
   - 检查网络连接

### 调试模式

启用调试模式获取更多信息：

```bash
DEBUG=true pnpm run monitor:start
```

## 📚 更多资源

- [Web Vitals 文档](https://web.dev/vitals/)
- [Lighthouse 文档](https://developers.google.com/web/tools/lighthouse)
- [Snyk 安全扫描](https://snyk.io/)
- [PNPM 审计文档](https://pnpm.io/cli/audit)

## 🤝 贡献

如果你发现问题或有改进建议，请：

1. 创建 Issue 描述问题
2. 提交 Pull Request
3. 更新相关文档

---

**注意**: 这些工具主要用于开发和测试环境。在生产环境中使用时，请确保适当配置安全设置和访问控制。
