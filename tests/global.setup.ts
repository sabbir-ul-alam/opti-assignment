import path from 'path';
import { expect, test as signupSetup } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestDataGenerator, UserData } from '../test-data/generateTestData';
import fs from 'fs';

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
  const signupPage = new RegistrationPage(page);

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
