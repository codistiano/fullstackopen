const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    await page.getByTestId('username').fill("abdu")
    await page.getByTestId('password').fill("abdu")
    await page.getByRole('button', { name: 'Login'}).click()

    await expect(page.getByText('abdu is logged in')).toBeVisible()

  })
})