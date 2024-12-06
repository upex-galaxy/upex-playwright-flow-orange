import { test } from '@TestBase';

test.describe(() => {
	test('Login', async ({ loginPage }) => {
		await loginPage.loginSuccess();
	});
});
