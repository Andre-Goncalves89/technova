import { test, expect } from '@playwright/test';
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

    test('Deve realizar busca com menos de 3 caracteres no campo search', async () => {
        await catalogPage.searchProduct('AA');
        await catalogPage.validateCartBadgeCount('0');
        await catalogPage.validateUserMsg('O termo de busca deve ter no mínimo 3 caracteres.');
    });

    test('Deve tentar adicionar um item com o valor acima do saldo em carteira', async () => {
        await catalogPage.addProductToCartByIndex(1);
        await catalogPage.validateCartBadgeCount('0');
        await catalogPage.validateUserMsg('❌ Saldo insuficiente! O limite da sua carteira é R$ 10.000,00.');
    });

    test('Deve limitar a busca em no máximo 100 caracteres e atualizar contador', async () => {
        // Cria uma string com 110 caracteres
        const longSearchText = 'a'.repeat(110);
        const expectedTruncatedText = 'a'.repeat(100);

        // 1. Tenta digitar 110 caracteres no campo de busca
        await catalogPage.fillSearchInput(longSearchText);

        // 2. Valida se o campo manteve apenas os 100 primeiros caracteres
        await catalogPage.validateSearchInputValue(expectedTruncatedText);

        // 3. Valida se o contador exibe 100/100
        await catalogPage.validateCharCounter('100/100');
    });

    test('Deve sanotizar e barrar tentativa de injeção de código XSS na busca', async ({ page }) => {
        // 1. Variável para monitorar se algum script/alerta malicioso foi executado
        let isXssExecuted = false;

        // Escuta se a aplicação disparar qualquer pop-up de alerta (alert, confirm, prompt)
        page.on('dialog', async dialog => {
            isXssExecuted = true;
            await dialog.dismiss();
        });

        // 2. Payload de teste de XSS
        const xssPayload = '<script>alert("XSS")</script>';

        // 3. Digita o código malicioso na busca e executa a pesquisa
        await catalogPage.searchProduct(xssPayload);

        // 4. Validação 1: O código JS NÃO pode ter sido executado (nenhum dialog disparado)
        expect(isXssExecuted).toBe(false);

        // 5. Validação 2: A aplicação deve tratar a busca com segurança (ex: mensagem de produto não encontrado)
        // Ajuste a mensagem esperada conforme o comportamento da sua aplicação ao não achar produtos
        await catalogPage.validateProductGridMsg('Nenhum produto encontrado.')
    });
}); 
