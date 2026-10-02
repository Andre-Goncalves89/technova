# CT-01: Visualização da Listagem Inicial de Produtos no Catálogo

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Alta
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Quantidade de Produtos Esperada:** 14 cards de produtos.

---

### Passos de Execução
1. Acessar a página inicial da aplicação TechNova.
2. Aguardar o carregamento do grid de produtos (`[data-cy="product-grid"]`).
3. Validar a quantidade total de cards de produtos exibidos na tela.

---

### Resultado Esperado
A página inicial é carregada com sucesso exibindo o grid com exatamente 14 cards de produtos.

---

# CT-02: Adição de Produto ao Carrinho com Sucesso

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Alta
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente com o catálogo visível.

---

### Dados do Teste
* **Nome do Produto:** Placa de Vídeo RX 7900 XTX Nitro
* **Valor do Produto:** R$ 7.800,00
* **Quantidade Esperada de Itens:** 1

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. Localizar o card do produto **'Placa de Vídeo RX 7900 XTX Nitro'**.
3. Clicar no botão **'Comprar'** relativo ao produto.
4. Clicar no ícone do carrinho de compras no menu superior para abrir a barra lateral (`cart-sidebar`).
5. Validar se a barra lateral do carrinho está visível.
6. Validar se o produto inserido consta na lista de itens do carrinho.
7. Validar se o valor total acumulado no carrinho é igual a **'R$ 7.800,00'**.

---

### Resultado Esperado
O produto é adicionado ao carrinho com sucesso, a barra lateral exibe o item selecionado e calcula corretamente o valor total de R$ 7.800,00.

---

# CT-03: Remoção de Item do Carrinho e Validação de Estado Vazio

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Alta
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Índice do Produto Adicionado:** 0 (Primeiro produto do catálogo).
* **Quantidade Esperada de Itens após Remoção:** 0
* **Mensagem Esperada:** "Seu laboratório de compras está vazio."

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. Clicar no botão **'Comprar'** do primeiro produto da listagem.
3. Clicar no ícone do carrinho de compras no cabeçalho superior para abrir a barra lateral (`cart-sidebar`).
4. Validar se o carrinho contém 1 item.
5. Clicar no botão de remoção (ícone de lixeira) correspondente ao produto.
6. Validar se o item é removido do carrinho.
7. Validar se a mensagem **'Seu laboratório de compras está vazio.'** fica visível.
8. Validar se a contagem de itens do carrinho é zerada.

---

### Resultado Esperado
O item é removido da barra lateral do carrinho e o componente atualiza seu estado para vazio, exibindo a mensagem afirmativa de carrinho sem itens.