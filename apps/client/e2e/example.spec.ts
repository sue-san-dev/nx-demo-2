import { test, expect } from '@playwright/test';

test('動画クリック', async ({ page }) => {
  await page.goto('http://127.0.0.1:4200/');

  const [request, response] = await Promise.all([
    page.waitForRequest(request => request.url().includes('video')),
    page.waitForResponse(response => response.url().includes('video')),
   
    await page.getByRole('link', { name: '1:20:50 窓待合こっせつ 渡辺 翔 2.1' }).click()
  ])
  expect(request.url()).toContain('e10caa9e839e');
  // レスポンスのステータスが200かどうか
  expect(response.status()).toBe(200);
});

test('動画クリック', async ({ page }) => {
  await page.goto('http://127.0.0.1:4200/');

  const [request, response] = await Promise.all([
    page.waitForRequest(request => request.url().includes('video')),
    page.waitForResponse(response => response.url().includes('video')),
   
    await page.getByRole('link', { name: '1:20:50 窓待合こっせつ 渡辺 翔 2.1' }).click()
  ])
  expect(request.url()).toContain('e10caa9e839e');
  // レスポンスのステータスが200かどうか
  expect(response.status()).toBe(200);
});
