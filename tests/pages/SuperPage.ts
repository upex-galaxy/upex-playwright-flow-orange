import { expect, type Expect, type Page, type Locator } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ORANGE_USERNAME;
const PASSWORD = process.env.ORANGE_PASSWORD;

export class SuperPage {
	page: Page;
	popup: (text?: string) => Locator;
	username: string | undefined;
	password: string | undefined;
	expect: Expect;
	optionDropdown: (contextElement: Locator) => Locator;
	autoinputDropdown: (contextElement: Locator) => Locator;
	input: (contextElement: Locator) => Locator;
	dropdown: (contextElement: Locator) => Locator;
	dropdownOptions: (contextElement: Locator) => Locator;

	constructor(page: Page) {
		this.page = page;
		this.expect = expect;
		this.username = USERNAME;
		this.password = PASSWORD;

		//*---- UI Locators Utilities:
		this.popup = (text?: string) => this.page.getByRole('dialog', { name: text });
		this.optionDropdown = (contextElement: Locator) => contextElement.locator('.oxd-select-text-input');
		this.autoinputDropdown = (contextElement: Locator) => contextElement.locator('input');
		this.dropdown = (contextElement: Locator) => contextElement.getByRole('listbox');
		this.dropdownOptions = (contextElement: Locator) => this.dropdown(contextElement).getByRole('option').filter({ hasNotText: '-- Select --' });
		this.input = (contextElement: Locator) => contextElement.locator('.oxd-input');
	}

	getCredentials() {
		const username = this.username;
		const password = this.password;
		if(!username || !password) {
			throw new Error('Missing CREDENTILAS in ENV VARS');
		}
		return { username, password };
	}

	async goHome() {
		await this.page.goto('/');
	}

	async getPopup(name?: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();
		return popup;
	}

	async selectDropdownOption(contextElement: Locator, option: string) {
		await this.optionDropdown(contextElement).click(); // open dropdown
		const dropdown = this.dropdown(contextElement);
		await this.expect(dropdown).toBeVisible();
		await this.expect(dropdown).toHaveAttribute('loading', 'false');
		await this.dropdownOptions(contextElement).filter({ hasText: option }).first().click(); // select option and close dropdown
		await this.expect(dropdown).not.toBeVisible();
	}
	async selectDropdownInput(contextElement: Locator, searchingText: string) {
		await this.autoinputDropdown(contextElement).fill(searchingText); // trigger dropdown
		const dropdown = this.dropdown(contextElement);
		await this.expect(dropdown).toBeVisible();
		await this.dropdownOptions(contextElement).filter({ hasText: searchingText }).first().click(); // select option and close dropdown
		await this.expect(dropdown).not.toBeVisible();
	}

}