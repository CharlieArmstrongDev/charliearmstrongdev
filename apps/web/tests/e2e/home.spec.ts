import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Charlie Armstrong - CharlieArmstrongDev/);
  });

  test('should display the navigation menu', async ({ page }) => {
    const navigation = await page.locator('nav');
    await expect(navigation).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    const heroSection = await page.locator('.hero');
    await expect(heroSection).toBeVisible();
  });

  test('should navigate to the projects page', async ({ page }) => {
    await page.click('text=Projects');
    await expect(page).toHaveURL(/.*projects/);
  });

  test('should navigate to the blog page', async ({ page }) => {
    await page.click('text=Blog');
    await expect(page).toHaveURL(/.*blog/);
  });
});
