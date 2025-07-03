const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SecurityAutoFix {
  constructor() {
    this.reportPath = path.join(__dirname, '../reports');
    this.ensureReportDir();
  }

  ensureReportDir() {
    if (!fs.existsSync(this.reportPath)) {
      fs.mkdirSync(this.reportPath, { recursive: true });
    }
  }

  async runAudit() {
    console.log('🔍 Running security audit...');

    try {
      // NPM audit
      const auditResult = execSync('pnpm audit --json', { encoding: 'utf8' });
      const auditData = JSON.parse(auditResult);

      // 保存审计报告
      fs.writeFileSync(
        path.join(this.reportPath, 'npm-audit.json'),
        JSON.stringify(auditData, null, 2)
      );

      return auditData;
    } catch (error) {
      console.error('Audit failed:', error.message);
      return null;
    }
  }

  async autoFix() {
    console.log('🔧 Attempting auto-fix...');

    try {
      // 自动修复npm漏洞
      execSync('pnpm audit --fix', { stdio: 'inherit' });

      // 更新过时依赖
      execSync('pnpm update', { stdio: 'inherit' });

      console.log('✅ Auto-fix completed');
      return true;
    } catch (error) {
      console.error('Auto-fix failed:', error.message);
      return false;
    }
  }

  generateReport(auditData) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: auditData?.metadata?.vulnerabilities?.total || 0,
        high: auditData?.metadata?.vulnerabilities?.high || 0,
        moderate: auditData?.metadata?.vulnerabilities?.moderate || 0,
        low: auditData?.metadata?.vulnerabilities?.low || 0
      },
      fixed: [],
      remaining: []
    };

    fs.writeFileSync(
      path.join(this.reportPath, 'security-fix-report.json'),
      JSON.stringify(report, null, 2)
    );

    return report;
  }
}

module.exports = SecurityAutoFix;

// 如果直接运行此脚本
if (require.main === module) {
  const autoFix = new SecurityAutoFix();

  (async () => {
    const auditData = await autoFix.runAudit();
    if (auditData) {
      await autoFix.autoFix();
      autoFix.generateReport(auditData);
    }
  })();
}
