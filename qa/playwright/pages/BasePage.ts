import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega para uma rota específica da aplicação
   */
  async navigateTo(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Aguarda a visibilidade do elemento e preenche o campo
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /**
   * Limpa o campo antes de preencher com o novo valor
   */
  async clearAndFill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Aguarda a visibilidade do elemento e clica
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Valida se o elemento está visível e contém o texto esperado
   */
  async validateText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Valida estritamente se o elemento está visível no DOM
   */
  async validateIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Retorna o texto interno de um elemento visível para asserções dinâmicas
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  /**
   * Aguarda a mudança de rota/URL da página
   */
  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }
}