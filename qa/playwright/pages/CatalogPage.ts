import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  // --- Locators da Header e Barra Superior ---
  readonly walletDisplay: Locator;
  readonly cartBadge: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly actionUserMsg: Locator
  readonly charCounterBar: Locator

  // --- Locators do Catálogo ---
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly buyButtons: Locator;

  // --- Locators do Carrinho Lateral (Sidebar) ---
  readonly cartSidebar: Locator;
  readonly cartCloseBtn: Locator;
  readonly cartItemsContainer: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMsg: Locator;
  readonly cartTotalValue: Locator;
  readonly checkoutBtn: Locator;
  readonly cartRemoveButtons: Locator;

  constructor(page: Page) {
    super(page);

    // Header & Busca
    this.walletDisplay = this.page.locator('[data-cy="wallet-display"]');
    this.cartBadge = this.page.locator('[data-cy="cart-badge"]');
    this.searchInput = this.page.locator('[data-cy="search-input"]');
    this.searchBtn = this.page.locator('[data-cy="search-btn"]');
    this.actionUserMsg = this.page.locator('[data-cy="search-notification"]');
    this.charCounterBar = this.page.locator('[data-cy="char-counter"]');

    // Catálogo
    this.productGrid = this.page.locator('[data-cy="product-grid"]');
    this.productCards = this.page.locator('[data-cy="product-card"]');
    this.buyButtons = this.page.locator('.buy-btn');

    // Sidebar do Carrinho
    this.cartSidebar = this.page.locator('[data-cy="cart-sidebar"]');
    this.cartCloseBtn = this.page.locator('[data-cy="cart-close-btn"]');
    this.cartItemsContainer = this.page.locator('[data-cy="cart-items"]');
    // Mapeia as divs filhas de produtos dentro de cart-items
    this.cartItems = this.cartItemsContainer.locator('> div');
    this.emptyCartMsg = this.cartSidebar.locator('.empty-cart-msg').first();
    this.cartTotalValue = this.page.locator('[data-cy="cart-total-value"]');
    this.checkoutBtn = this.page.locator('[data-cy="checkout-btn"]');
    // Mapeia os botões com ícone de lixeira dentro do carrinho
    this.cartRemoveButtons = this.cartItemsContainer.locator('button');
  }

  // =========================================================================
  //  AÇÕES / FLUXOS DA PÁGINA
  // =========================================================================

  /**
   * Abre a página inicial e garante que o catálogo foi carregado
   */
  async openCatalog(): Promise<void> {
    await this.navigateTo('/');
    await this.validateIsVisible(this.productGrid);
  }

  /**
   * Executa a busca de produtos pelo termo digitado
   */
  async searchProduct(term: string): Promise<void> {
    await this.fillInput(this.searchInput, term);
    await this.clickElement(this.searchBtn);
  }

  /**
   * Preenche o campo de busca com o texto fornecido
   */
  async fillSearchInput(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  /**
   * Valida o valor retido no input de busca
   */
  async validateSearchInputValue(expectedValue: string): Promise<void> {
    await expect(this.searchInput).toHaveValue(expectedValue);
  }

  /**
   * Valida o texto exibido no contador de caracteres
   */
  async validateCharCounter(expectedText: string): Promise<void> {
    await expect(this.charCounterBar).toHaveText(expectedText);
  }

  /**
   *  Valida mensagem de ação de usuário
   */
  async validateUserMsg(term: string): Promise<void> {
    await this.validateText(this.actionUserMsg, term)
    await this.clickElement(this.searchBtn)
  }

   /**
   *  Valida mensagem de ação de usuário
   */
  async validateProductGridMsg(term: string): Promise<void> {
    await this.validateText(this.productGrid, term)
  }

  /**
   * Adiciona o produto ao carrinho pelo seu índice (0 a 13)
   */
  async addProductToCartByIndex(index: number = 0): Promise<void> {
    const targetBuyBtn = this.buyButtons.nth(index);
    await this.clickElement(targetBuyBtn);
  }

  /**
   * Adiciona um produto buscando pelo título exato ou parcial
   */
  async addProductToCartByName(productName: string): Promise<void> {
    const targetCard = this.productCards.filter({ hasText: productName });
    const targetBuyBtn = targetCard.locator('.buy-btn');
    await this.clickElement(targetBuyBtn);
  }

  /**
   * Abre a barra lateral do carrinho clicando no ícone do header
   */
  async openCart(): Promise<void> {
    await this.clickElement(this.cartBadge);
    await this.validateIsVisible(this.cartSidebar);
  }

  /**
   * Fecha a barra lateral do carrinho
   */
  async closeCart(): Promise<void> {
    await this.clickElement(this.cartCloseBtn);
  }

  /**
   * Remove um item específico do carrinho pelo índice
   */
  async removeItemFromCart(index: number = 0): Promise<void> {
    const removeBtn = this.cartRemoveButtons.nth(index);
    await this.clickElement(removeBtn);
  }

  /**
   * Finaliza a compra clicando no botão de checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutBtn);
  }

  // =========================================================================
  //  VALIDAÇÕES / ASSERÇÕES
  // =========================================================================

  /**
   * Valida o número total de cards de produtos exibidos (ex: 14)
   */
  async validateTotalProductsCount(expectedCount: number = 14): Promise<void> {
    await expect(this.productCards).toHaveCount(expectedCount);
  }

  /**
   * Valida se o carrinho está visível e VAZIO
   */
  async validateCartIsEmpty(): Promise<void> {
    await this.validateIsVisible(this.cartSidebar);
    await this.validateIsVisible(this.emptyCartMsg);
  }

  /**
   * Valida se o carrinho contém itens e compara com a quantidade esperada
   */
  async validateCartHasItems(expectedItemCount?: number): Promise<void> {
    await this.validateIsVisible(this.cartSidebar);
    await expect(this.emptyCartMsg).not.toBeVisible();
    
    if (expectedItemCount !== undefined) {
      await expect(this.cartItems).toHaveCount(expectedItemCount);
    } else {
      const count = await this.cartItems.count();
      expect(count).toBeGreaterThan(0);
    }
  }

  /**
   * Valida o valor do total estimado do carrinho
   */
  async validateCartTotal(expectedTotalFormatted: string): Promise<void> {
    await this.validateText(this.cartTotalValue, expectedTotalFormatted);
  }

  /**
   * Valida o contador exibido no badge do ícone do carrinho
   */
  async validateCartBadgeCount(expectedBadgeValue: string): Promise<void> {
    await this.validateText(this.cartBadge, expectedBadgeValue);
  }
}