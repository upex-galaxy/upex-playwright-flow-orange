import { expect, type Page, type Locator } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.ORANGE_USERNAME ?? new Error('Missing USERNAME in ENV VARS');
const PASSWORD = process.env.ORANGE_PASSWORD ?? new Error('Missing USERNAME in ENV VARS');

export class SuperPage {
	page: Page;
	popup: (text?: string) => Locator;
	username: string | Error;
	password: string | Error;

	constructor(page: Page) {
		this.page = page;
		this.username = USERNAME;
		this.password = PASSWORD;

		//*---- Locators Utilities:
		this.popup = (text?: string) => this.page.getByRole('dialog', { name: text });
	}

	async getPopup(name?: string) {
		const popup = this.popup(name);
		await expect(popup).toBeVisible();
		return popup;
	}
}