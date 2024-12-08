import { test } from '@TestBase';
import { faker } from '@faker-js/faker';

test.describe('GX3-5799: Admin | Agregar credenciales de usuario al empleado', () => {
	test.beforeEach(async ({ loginPage, addUserPage }) => {
		await loginPage.loginSuccess();
		await addUserPage.gotoAdminTab();
	});

	test('GX3-5799: TC1: Should add user credentials for employee', async ({ page, expect, addUserPage }) => {
		await addUserPage.gotoSaveSystemUser();
		const expectedUsername = faker.internet.userName();
		await addUserPage.fillAddUserFields({
			userRole: 'Admin',
			employeeName: 'a',
			status: 'Enabled',
			username: expectedUsername,
			password: 'HolaCrack12345',
			confirmPassword: 'HolaCrack12345'
		});
		await page.waitForURL('**/admin/viewSystemUsers', { timeout: 10000 });
		await page.waitForLoadState('domcontentloaded');

		const createdUserInTable = page.getByRole('table').getByText(expectedUsername);
		await expect(createdUserInTable).toBeVisible();
	});
});
