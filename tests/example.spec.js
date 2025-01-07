const { test, expect } = require('@playwright/test');

test('first test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('Products')).toBeVisible();
});

test('second test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('Products')).toBeVisible();

  // Add items to the cart
  await page.locator('div').filter({ hasText: /^\$15\.99ADD TO CART$/ }).getByRole('button').first().click();
  await page.locator('div').filter({ hasText: /^\$15\.99ADD TO CART$/ }).getByRole('button').last().click();

  // Go to the cart
  await page.locator('#shopping_cart_container').click();
  await expect(page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Test.allTheThings() T-Shirt (Red' })).toBeVisible();

  // Proceed to checkout
  await page.getByRole('link', { name: 'CHECKOUT' }).click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.getByRole('button', { name: 'CONTINUE' }).click();


  // Finish the checkout
  await page.getByRole('link', { name: 'FINISH' }).click();
  await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
});