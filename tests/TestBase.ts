import { test as driver } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

driver.extend<{
	login: LoginPage
	// dashboard: DashboardPage
}>({
	login: async ({ page }, use) => await use(new LoginPage(page))
	// dashboard: async ({page}, use) => await use(new DashboardPage(page))
});