import { test, expect } from '@playwright/test';

test.describe('BrickUI Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display BrickButton component', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 查找按钮组件
    const button = page.locator('button').first();
    await expect(button).toBeVisible();

    // 测试按钮点击
    await button.click();

    // 验证按钮可以被点击（没有抛出错误）
    await expect(button).toBeVisible();
  });

  test('should display BrickCard component', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 查找卡片组件
    const card = page.locator('.card').first();

    // 如果页面上有卡片组件，验证其可见性
    if ((await card.count()) > 0) {
      await expect(card).toBeVisible();
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // 设置移动设备视口
    await page.setViewportSize({ width: 375, height: 667 });

    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 验证页面在移动设备上正常显示
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // 验证没有水平滚动条
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // 允许1px的误差
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 检查页面是否有基本的可访问性属性
    const title = await page.title();
    expect(title).toBeTruthy();

    // 检查是否有 lang 属性
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBeTruthy();
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    // 监听控制台错误
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 验证没有控制台错误
    expect(consoleErrors).toHaveLength(0);
  });
});
