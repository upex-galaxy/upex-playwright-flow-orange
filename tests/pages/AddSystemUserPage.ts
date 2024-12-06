import type { Page, Locator } from '@playwright/test';
import { SuperPage } from './SuperPage';

export class AddSystemUserPage extends SuperPage {
	adminTab: Locator;
	addButton: Locator;
	userRoleOptionDropdown: Locator;
	employeeNameInputDropdown: Locator;
	statusOptionDropdown: Locator;
	usernameInput: Locator;
	passwordInput: Locator;
	confirmPasswordInput: Locator;
	saveButton: Locator;

	constructor(page: Page) {
		super(page);
		this.adminTab = this.page.locator('.oxd-main-menu').getByText('Admin', { exact: true });
		this.addButton = this.page.locator('button', { hasText: 'Add' });

		this.userRoleOptionDropdown = this.page.locator('.oxd-grid-item', { hasText: 'User Role' });
		this.employeeNameInputDropdown = this.page.locator('.oxd-grid-item', { hasText: 'Employee Name' });
		this.statusOptionDropdown = this.page.locator('.oxd-grid-item', { hasText: 'Status' });
		this.usernameInput = this.page.locator('.oxd-grid-item', { hasText: 'Username' });
		this.passwordInput = this.page.locator('.oxd-grid-item').filter({ has: this.page.getByText('Password', { exact: true }) });
		this.confirmPasswordInput = this.page.locator('.oxd-grid-item', { hasText: 'Confirm Password' });
		this.saveButton = this.page.locator('button[type=submit]', { hasText: 'Save' });
	}

	async fillAddUserFields(arg?: {
		userRole?: 'Admin' | 'ESS',
		employeeName?: string,
		status?: 'Enabled' | 'Disabled',
		username?: string,
		password?: string,
		confirmPassword?: string
	}) {
		if (arg) {
			arg.userRole && await this.selectDropdownOption(this.userRoleOptionDropdown, arg.userRole);
			arg.employeeName && await this.selectDropdownInput(this.employeeNameInputDropdown, arg.employeeName);
			arg.status && await this.selectDropdownOption(this.statusOptionDropdown, arg.status);
			arg.username && await this.input(this.usernameInput).fill(arg.username);
			arg.password && await this.input(this.passwordInput).fill(arg.password);
			arg.confirmPassword && await this.input(this.confirmPasswordInput).fill(arg.confirmPassword);
		}
		await this.saveButton.click();
		return arg;
	}
	
	async gotoAdminTab() {
		await this.adminTab.click();
		await this.expect(this.page).toHaveURL('index.php/admin/viewSystemUsers');
	}

	async gotoSaveSystemUser() {
		await this.addButton.click();
		await this.expect(this.page).toHaveURL('index.php/admin/saveSystemUser');
	}
}