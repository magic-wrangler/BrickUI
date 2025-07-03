const http = require('http');
const fs = require('fs');
const path = require('path');

class MonitoringServer {
  constructor(port = 3000) {
    this.port = port;
    this.metricsPath = path.join(__dirname, '../reports/metrics');
    this.ensureMetricsDir();
    this.metrics = [];
    this.server = null;
  }

  ensureMetricsDir() {
    if (!fs.existsSync(this.metricsPath)) {
      fs.mkdirSync(this.metricsPath, { recursive: true });
    }
  }

  start() {
    this.server = http.createServer((req, res) => {
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // 处理OPTIONS请求
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // 处理API端点
      if (req.url === '/api/metrics' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const metric = JSON.parse(body);
            this.saveMetric(metric);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
          }
        });
      } else if (req.url === '/api/metrics' && req.method === 'GET') {
        // 返回所有收集的指标
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(this.metrics));
      } else if (req.url === '/dashboard') {
        // 提供简单的仪表板页面
        fs.readFile(
          path.join(__dirname, '../templates/monitoring-dashboard.html'),
          'utf8',
          (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        );
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    this.server.listen(this.port, () => {
      console.log(
        `🚀 Monitoring server running at http://localhost:${this.port}`
      );
      console.log(
        `📊 Dashboard available at http://localhost:${this.port}/dashboard`
      );
    });
  }

  saveMetric(metric) {
    // 添加到内存中
    this.metrics.push(metric);

    // 限制内存中存储的指标数量
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // 保存到文件
    const filename = `metric-${Date.now()}.json`;
    fs.writeFile(
      path.join(this.metricsPath, filename),
      JSON.stringify(metric, null, 2),
      err => {
        if (err) {
          console.error('Error saving metric:', err);
        }
      }
    );

    // 每小时生成一次汇总报告
    const now = new Date();
    if (now.getMinutes() === 0 && now.getSeconds() < 10) {
      this.generateSummaryReport();
    }
  }

  generateSummaryReport() {
    const summary = {
      timestamp: new Date().toISOString(),
      metrics: {
        cls: this.calculateAverage('cls'),
        fid: this.calculateAverage('fid'),
        lcp: this.calculateAverage('lcp'),
        fcp: this.calculateAverage('fcp'),
        ttfb: this.calculateAverage('ttfb')
      },
      count: this.metrics.length
    };

    const filename = `summary-${Date.now()}.json`;
    fs.writeFile(
      path.join(this.metricsPath, filename),
      JSON.stringify(summary, null, 2),
      err => {
        if (err) {
          console.error('Error saving summary report:', err);
        } else {
          console.log(`📊 Summary report generated: ${filename}`);
        }
      }
    );
  }

  calculateAverage(metricName) {
    const values = this.metrics
      .filter(m => m.name === metricName)
      .map(m => m.value);

    if (values.length === 0) return null;

    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  stop() {
    if (this.server) {
      this.server.close(() => {
        console.log('Monitoring server stopped');
      });
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const server = new MonitoringServer();
  server.start();

  // 优雅关闭
  process.on('SIGINT', () => {
    console.log('Shutting down monitoring server...');
    server.stop();
    process.exit(0);
  });
}

module.exports = MonitoringServer;
