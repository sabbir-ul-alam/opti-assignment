import path from 'path';
import { expect, test as signupSetup } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { TestDataGenerator, UserData } from '../test-data/generateTestData';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const user: UserData = {
  email: TestDataGenerator.uniqueEmail(),
  fullName: TestDataGenerator.uniqueFullname(),
  password: '1234',
  bio: ''
};

const filePath = path.resolve(__dirname, '../test-data/user-data.json');
fs.writeFileSync(filePath, JSON.stringify(user, null, 2), 'utf-8');

const authFile = path.join(__dirname, '../playwright/.auth/auth.json');

signupSetup('Global setup: Sign up user and store auth state', async ({ page }) => {
  const signupPage = new RegisterPage(page);

  await signupSetup.step('Visit login/signup page', async () => {
    await signupPage.visit();
  });

  await signupSetup.step('Sign up with new user', async () => {
    await signupPage.register(user);
  });

  await signupSetup.step('Verify register was successful', async () => {
    await expect(page.locator('a[href="/dashboard"]').first()).toBeVisible();
  });

  await signupSetup.step('Save authenticated state to file', async () => {
    await page.context().storageState({ path: authFile });
  });
});
