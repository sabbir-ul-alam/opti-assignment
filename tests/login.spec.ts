import { test, expect, request } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestDataGenerator, UserRegistrationData } from "../test-data/generateTestData";
import path from "path";
import fs from 'fs';
import { ApiHelper } from "../utils/apiHelper";



test.describe("Login Scenario", () => {
    const em = TestDataGenerator.uniqueEmail();
    const fn =  TestDataGenerator.uniqueFullname();
    const loginData: UserRegistrationData = {
        email: em,
        fullName: fn,
        password: '1234',
        confirmPassword: '1234'
    };

    test.beforeAll('Create users from api', async ({ request }) => {
        const api = new ApiHelper(request);
        const response = await api.registerUser(loginData);
        expect(response.status()).toBe(200);

        const filePath = path.resolve(__dirname, '../test-data/user-data.json');
        fs.writeFileSync(filePath, JSON.stringify(loginData, null, 2), 'utf-8');

    });
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
    });

    test('Login with valid data', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('Visit login page', async () => {
            await loginPage.visit();
        });

        await test.step('Login using valid credentials', async () => {
            const dashboardPage = await loginPage.login(loginData, true);
            expect(dashboardPage).toBeTruthy();
            await dashboardPage?.isLoaded();
        });
    });

    test('Login with invalid data', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('Visit login page', async () => {
            await loginPage.visit();
        });

        loginData.password = '123'//actual pass 1234

        await test.step('Login using invalid credentials', async () => {
            await loginPage.login(loginData, false);
            await loginPage.checkLoginFailure();
        });
    })

})