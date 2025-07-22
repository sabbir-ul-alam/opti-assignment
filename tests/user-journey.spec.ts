import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { TestDataGenerator, UserData, ContentData } from '../test-data/generateTestData';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


test.describe('End to end user journey', () => {
    const newBio: string = TestDataGenerator.uniqueBio();
    const content: ContentData = {
        title: TestDataGenerator.uniqueContentTitle(),
        body: TestDataGenerator.uniqueBio(),
        tags: TestDataGenerator.uniqueTag(),
        imageName: 'image1.png'
    };
    const img1 = path.join(__dirname, '../test-data/image1.png');
    const img2 = path.join(__dirname, '../test-data/image2.png');

    test("First user journey", async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await test.step('Visit dashboard and verify it loads correctly', async () => {
            await dashboardPage.visit();
            await dashboardPage.isLoaded();
        });

        const profilePage = await dashboardPage.visitProfilePage();
        await test.step('Visit and update profile with new bio', async () => {
            await profilePage.updateProfile(newBio);
            await profilePage.isProfileUpdated();
        });

        const imagePage = await profilePage.visitImagePage();

        await test.step('Visit image page and upload images', async () => {
            await imagePage.uploadImage(img1, img2);
            await imagePage.isImageUploaded();
        });

        const contentPage = await imagePage.visitContentPage();
        await test.step('Visit content page, create and publish content', async () => {
            await contentPage.createContent(content);
            await contentPage.isContentCreated();
            await contentPage.publishContent();
            await contentPage.isContentPublished();
        });

        await test.step('Logout and verify localStorage is cleared', async () => {
            await contentPage.logout();
            const value = await page.evaluate(() => localStorage.getItem('user'));
            expect(value).toBeNull();
        });
    });
});
