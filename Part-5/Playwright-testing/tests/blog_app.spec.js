const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Abdullah Bedru",
        username: "abdu",
        password: "abdu",
      },
    });

    await page.goto('/')
  });

  test("Login form is shown", async ({ page }) => {
    const username = await page.getByTestId("username")
    const password = await page.getByTestId("password")

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId("username").fill("abdu");
      await page.getByTestId("password").fill("abdu");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("abdu is logged in")).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId("username").fill("abdu");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  
});
