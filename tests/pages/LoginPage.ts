import type { Page, Locator } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class LoginPage extends SuperPage {
	usernameInput: Locator;
	passwordInput: Locator;
	submitButton: Locator;

	constructor(page: Page) {
		super(page);
		this.usernameInput = this.page.locator('input[name=username]');
		this.passwordInput = this.page.locator('input[name=password]');
		this.submitButton = this.page.locator('button[type=submit]');
	}

	async login(username?: string, password?: string) {
		username && await this.usernameInput.fill(username);
		password && await this.passwordInput.fill(password);
		await this.submitButton.click();
		await this.page.waitForLoadState('domcontentloaded');
	}

	async loginSuccess() {
		await this.goHome();
		const { username, password } = this.getCredentials();
		await this.login(username, password);
		await this.expect(this.page).toHaveURL('index.php/dashboard/index');
	}
}