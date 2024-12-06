/* eslint-disable no-empty-pattern */
import { test as driver, type Expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { AddSystemUserPage } from '@pages/AddSystemUserPage';

const test = driver.extend<{
	loginPage: LoginPage
	expect: Expect
	addUserPage: AddSystemUserPage
	// dashboard: DashboardPage
}>({
	expect: async ({}, use) => await use(test.expect),
	loginPage: async ({ page }, use) => await use(new LoginPage(page)),
	addUserPage: async ({ page }, use) => await use(new AddSystemUserPage(page))
	// dashboard: async ({page}, use) => await use(new DashboardPage(page))
});

export { test };
export const expect = test.expect;