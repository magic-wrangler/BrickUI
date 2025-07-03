const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ReportGenerator {
  constructor() {
    this.reportsDir = path.join(__dirname, '../reports');
    this.templatesDir = path.join(__dirname, '../templates');
    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.reportsDir, this.templatesDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async generatePerformanceReport() {
    console.log('📊 Generating performance report...');

    // 运行Lighthouse
    const lighthouseResult = await this.runLighthouse();

    // 收集Bundle分析数据
    const bundleAnalysis = await this.analyzeBundles();

    // 生成报告
    const report = {
      timestamp: new Date().toISOString(),
      lighthouse: lighthouseResult,
      bundleAnalysis,
      recommendations: this.generateRecommendations(lighthouseResult)
    };

    const reportPath = path.join(
      this.reportsDir,
      `performance-${Date.now()}.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // 生成HTML报告
    await this.generateHTMLReport(report, 'performance');

    return report;
  }

  async generateSecurityReport() {
    console.log('🔒 Generating security report...');

    // 运行安全扫描
    const auditResults = await this.runSecurityAudit();

    // 依赖分析
    const dependencyAnalysis = await this.analyzeDependencies();

    const report = {
      timestamp: new Date().toISOString(),
      audit: auditResults,
      dependencies: dependencyAnalysis,
      recommendations: this.generateSecurityRecommendations(auditResults)
    };

    const reportPath = path.join(
      this.reportsDir,
      `security-${Date.now()}.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // 生成HTML报告
    await this.generateHTMLReport(report, 'security');

    return report;
  }

  async runLighthouse() {
    try {
      const result = execSync(
        'npx lighthouse http://localhost:5173 --output json --quiet',
        {
          encoding: 'utf8'
        }
      );
      return JSON.parse(result);
    } catch (error) {
      console.error('Lighthouse failed:', error.message);
      return null;
    }
  }

  async analyzeBundles() {
    try {
      // 构建并分析
      execSync('npm run build:analyze', { stdio: 'pipe' });

      // 读取分析结果
      const statsPath = path.join(__dirname, '../dist/stats.json');
      if (fs.existsSync(statsPath)) {
        return JSON.parse(fs.readFileSync(statsPath, 'utf8'));
      }
    } catch (error) {
      console.error('Bundle analysis failed:', error.message);
    }
    return null;
  }

  async runSecurityAudit() {
    try {
      const result = execSync('pnpm audit --json', { encoding: 'utf8' });
      return JSON.parse(result);
    } catch (error) {
      // audit命令在发现漏洞时会返回非零退出码
      if (error.stdout) {
        return JSON.parse(error.stdout);
      }
      console.error('Security audit failed:', error.message);
      return null;
    }
  }

  async analyzeDependencies() {
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
      );
      const lockFile = fs.readFileSync(
        path.join(__dirname, '../pnpm-lock.yaml'),
        'utf8'
      );

      return {
        dependencies: Object.keys(packageJson.dependencies || {}),
        devDependencies: Object.keys(packageJson.devDependencies || {}),
        totalPackages: lockFile.split('\n').filter(line => line.includes('/'))
          .length
      };
    } catch (error) {
      console.error('Dependency analysis failed:', error.message);
      return null;
    }
  }

  generateRecommendations(lighthouseData) {
    const recommendations = [];

    if (lighthouseData?.lhr?.audits) {
      const audits = lighthouseData.lhr.audits;

      // 性能建议
      if (audits['largest-contentful-paint']?.score < 0.9) {
        recommendations.push({
          type: 'performance',
          priority: 'high',
          title: '优化最大内容绘制 (LCP)',
          description: '考虑优化图片加载、减少渲染阻塞资源'
        });
      }

      if (audits['cumulative-layout-shift']?.score < 0.9) {
        recommendations.push({
          type: 'performance',
          priority: 'medium',
          title: '减少累积布局偏移 (CLS)',
          description: '为图片和广告预留空间，避免动态内容插入'
        });
      }
    }

    return recommendations;
  }

  generateSecurityRecommendations(auditData) {
    const recommendations = [];

    if (auditData?.metadata?.vulnerabilities) {
      const vulns = auditData.metadata.vulnerabilities;

      if (vulns.high > 0) {
        recommendations.push({
          type: 'security',
          priority: 'critical',
          title: `修复 ${vulns.high} 个高危漏洞`,
          description: '立即更新相关依赖包或寻找替代方案'
        });
      }

      if (vulns.moderate > 0) {
        recommendations.push({
          type: 'security',
          priority: 'medium',
          title: `修复 ${vulns.moderate} 个中危漏洞`,
          description: '计划在下个版本中更新相关依赖'
        });
      }
    }

    return recommendations;
  }

  async generateHTMLReport(data, type) {
    const templatePath = path.join(this.templatesDir, `${type}-report.html`);

    if (!fs.existsSync(templatePath)) {
      console.warn(`Template not found: ${templatePath}`);
      return;
    }

    const template = fs.readFileSync(templatePath, 'utf8');
    const html = template.replace('{{DATA}}', JSON.stringify(data, null, 2));

    const outputPath = path.join(this.reportsDir, `${type}-report.html`);
    fs.writeFileSync(outputPath, html);

    console.log(`📄 HTML report generated: ${outputPath}`);
  }
}

module.exports = ReportGenerator;

// 如果直接运行此脚本
if (require.main === module) {
  const generator = new ReportGenerator();

  (async () => {
    const args = process.argv.slice(2);

    if (args.includes('--performance')) {
      await generator.generatePerformanceReport();
    }

    if (args.includes('--security')) {
      await generator.generateSecurityReport();
    }

    if (args.length === 0) {
      // 默认生成所有报告
      await generator.generatePerformanceReport();
      await generator.generateSecurityReport();
    }
  })();
}
