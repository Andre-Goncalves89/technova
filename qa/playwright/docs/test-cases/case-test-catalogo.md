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

---

# CT-04: Realizar busca com menos de 3 caracteres na barra de pesquisa

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Média
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Termo digitado:** 'AA'.
* **Quantidade Esperada de Itens:** 0
* **Mensagem Esperada:** "O termo de busca deve ter no mínimo 3 caracteres."

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. Na barra de pesquisa, digitar 2 caracteres
3. Clicar no botão de **'pesquisa'** representado por um ícone de busca ao lado da barra de pesquisa.
4. validar se mensagem de aviso/erro aparece na parte superior da página em **vermelho** 

---

### Resultado Esperado
Ao digitar menos de 3 caracteres e clicar no botão de pesquisa uma mensagem de aviso/erro ao usuário deve aparecer, contendo o seguinte conteúdo:
"O termo de busca deve ter no mínimo 3 caracteres.", em cor vermelha

---

# CT-05: Tentar adicionar um produto com o valor acima do valor em carteira

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Alta
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Nome do produto:** 'Placa de Vídeo RTX 4090 Phantom'.
* **Quantidade Esperada de Itens:** 0
* **Valor do produto:** R$ 13.499,00

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. Localizar o card do produto **Placa de Vídeo RTX 4090 Phantom**
3. Clicar no botão de **'comprar'** relativo ao produto.
4. validar se mensagem de aviso/erro aparece na parte superior da página em **vermelho** 

---

### Resultado Esperado
Ao clicar no botão de **'comprar'** do primeiro card da página(Placa de Vídeo RTX 4090 Phantom), uma mensagem de aviso/erro deve aparecer, contendo o seguinte conteúdo: **"Saldo insuficiente! O limite da sua carteira é R$10.000,00"**

---

# CT-06: Tentar inserir mais de 100 caracteres no campo de busca da página

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Baixa
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Termo digitado:** inserir 100+ caracteres no campo de busca.
* **Quantidade Esperada de Itens:** 0

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. inserir **100+ caracteres** no campo de busca
3. Validar se o contador trava no número **100** impedindo o usuário de digitar mais caracteres

---

### Resultado Esperado
Ao inserir no campo de busca **100 caracteres**, o contador deve **travar** no caractere número **100** e impedir o usuário de **digitar mais de 100 caracteres**.

---

# CT-07: Tentar inserir código malicioso no campo de busca

**Suíte de Testes:** Catálogo / Carrinho
**Prioridade:** Altíssmo
**Tipo de Teste:** Funcional / E2E

---

### Pré-condições
1. O navegador deve estar aberto na URL base (`http://localhost:3000`).
2. A página inicial deve carregar completamente.

---

### Dados do Teste
* **Termo digitado:** inserir código malicioso no campo de busca

---

### Passos de Execução
1. Acessar a página inicial do catálogo.
2. inserir **código malicioso(ex: '<script>alert("XSS")</script>')** no campo de busca
3. Validar se o código não é executado(nenhum diálogo deve ser disparado)
4. Validar se a aplicação trata a busca com segurança (ex: mensagem de produto não encontrado)

---

### Resultado Esperado
Ao inserir no campo de busca **algum código malicioso**, a página deve trata-lo apenas como uma string, retornando a mensagem **Nenhum produto encontrado.**

