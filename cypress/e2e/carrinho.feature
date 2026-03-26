# language: pt
Funcionalidade: Regras do Carrinho de Compras do TechNova
  Como um usuário do e-commerce
  Quero poder adicionar itens ao carrinho
  Para que eu possa finalizar minha compra no checkout

  Cenario: Adicionar um item eletronico no carrinho com sucesso
    Dado que eu acesso a pagina inicial do TechNova
    Quando eu clico no botao "Comprar" do produto "Mouse Wireless Ultra-Light"
    Entao o carrinho deve exibir "1" item adicionado