import {test, expect} from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { TestDataGenerator, UserData } from '../test-data/generateTestData';

test.describe('End to end user journer', async()=>{
    const newBio: string = TestDataGenerator.uniqueBio();
    const imageUrls: string[] = ['sd','sdf'];

    test("First user journey", async ({page})=>{
        //visit dashboad
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.visit();

        //update profile
        const profilePage = await dashboardPage.visitProfilePage();
        await profilePage.updateProfile(newBio);

        //upload image
        const imagePage = await profilePage.visitImagePage();
        await imagePage.uploadImage();

        //goto content page
        const contentPage = await imagePage.visitContentPage();
        await contentPage.createContent();
        await contentPage.publishContent();

        await contentPage.logout();

        //logout



        

        // await page.getByRole('link', { name: 'Content', exact: true }).click();
        // await expect(page.getByRole('heading', { name: 'No content found' })).toBeVisible();
        // await page.getByRole('button', { name: 'Create Content' }).nth(1).click();
        
        // await page.getByRole('link', { name: 'Images' }).click();
        // await expect(page.getByText('No images uploaded yet')).toBeVisible();
        // await page.locator('.mantine-focus-auto.m_d46a4834').click();
        // await page.locator('.mantine-focus-auto.m_d46a4834').setInputFiles(['Screenshot 2024-11-10 202911.png', 'Screenshot 2024-10-19 153829.png']);
        // await page.getByRole('link', { name: 'Content', exact: true }).click();
        // await page.getByRole('button').nth(2).click();
        // await page.getByRole('button', { name: 'Browse' }).click();
        // await page.getByRole('button', { name: 'Screenshot 2024-11-10 202911.' }).click();
        // await page.getByRole('button', { name: 'Save Content' }).click();
        // await expect(page.getByRole('cell', { name: 'Draft' }).locator('div')).toBeVisible();
        // await page.getByRole('button').nth(3).click();
        // await page.getByRole('textbox', { name: 'Search content...' }).click();
        // await page.getByRole('textbox', { name: 'Search content...' }).fill('first');
        // await page.getByRole('textbox', { name: 'All Types' }).click();
        // await page.getByRole('option', { name: 'Social Media' }).click();
        // await page.getByRole('textbox', { name: 'Search content...' }).dblclick();
        // await page.getByRole('textbox', { name: 'Search content...' }).fill('');
        // await page.getByRole('textbox', { name: 'All Types' }).click();
        // await page.getByRole('option', { name: 'Blog Post' }).click();
        // await page.getByRole('textbox', { name: 'All Types' }).click();
        // await page.getByRole('option', { name: 'All Types' }).click();
        // await page.getByRole('textbox', { name: 'All Status' }).click();
        // await page.getByRole('option', { name: 'Published' }).click();
        // await page.getByRole('link', { name: 'Profile' }).click();
        // await page.getByRole('textbox', { name: 'Bio' }).click();
        // await page.getByRole('textbox', { name: 'Bio' }).fill('update bio');
        // await page.getByRole('button', { name: 'Update Profile' }).click();
        // await page.getByRole('button', { name: 'U user_a22680e2' }).click();
        // await page.getByRole('menuitem', { name: 'Logout' }).click();


    });


});