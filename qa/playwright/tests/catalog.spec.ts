import { test } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';

test.describe('TechNova - Catálogo e Fluxo de Carrinho', () => {
    let catalogPage: CatalogPage;

    test.beforeEach(async ({ page }) => {
        catalogPage = new CatalogPage(page);
        await catalogPage.openCatalog();
    });

    test('Deve exibir os 14 produtos iniciais do catálogo', async () => {
        await catalogPage.validateTotalProductsCount(14);
    });

    test('Deve adicionar um produto e verificar presença no carrinho', async () => {
        // Adiciona o 2º produto (RX 7900 XTX Nitro)
        await catalogPage.addProductToCartByName('RX 7900 XTX Nitro');

        // Valida que o carrinho tem 1 item e o valor corresponde
        await catalogPage.validateCartHasItems(1);
        await catalogPage.validateCartTotal('R$ 7.800,00');
        await catalogPage.openCart();
        await catalogPage.removeItemFromCart(0);
        await catalogPage.validateCartIsEmpty();
    });

    test('Deve remover item do carrinho e validar estado vazio', async () => {
      await catalogPage.addProductToCartByIndex(2);
      await catalogPage.openCart();
      await catalogPage.validateCartHasItems(1);
  
      // Remove o item e valida se a mensagem de carrinho vazio é exibida
      await catalogPage.removeItemFromCart(0);
      await catalogPage.validateCartIsEmpty();
    });
});