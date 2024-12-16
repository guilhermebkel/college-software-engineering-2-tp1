# **TP1 Engenharia Software: Compra Online em Supermercado**

Este projeto foi desenvolvido como parte da disciplina Engenharia de Software 2. Ele implementa um sistema de gerenciamento de carrinho de compras, estoque de produtos e manipulação de preços. O sistema foi projetado com três classes principais e um módulo de utilitário:

  1.Cart: Gerencia o carrinho de compras.
  
  2.Inventory: Administra o estoque de produtos.
  
  3.Product: Representa os produtos com seus atributos.
  
  4.Utils: Fornece funções auxiliares como formatação de preços.

## **Tecnologias Utilizadas**

  Node.js: Ambiente de execução.

  JavaScript (ES6): Linguagem de programação.
  
  Módulos: Cada classe e função é exportada como um módulo independente.

 ## **O que foi testado** 
  Os testes unitários foram implementados para garantir o correto funcionamento das classes Product, Cart e Inventory, bem como da função utilitária formatPrice. 
  Os testes cobrem diversos cenários, incluindo:

  Produto: Verifica a criação, atualização de preço e quantidade, e exportação do produto para JSON, além de garantir que o preço não seja negativo.
  Carrinho: Testa a adição de produtos com quantidades válidas, a remoção de itens, a aplicação de cupons e a exportação do estado do carrinho.
  Inventário: Assegura a adição e remoção de produtos, a atualização da quantidade, a exportação para JSON e o cálculo do valor total do inventário.
  Função formatPrice: Garante que os preços sejam formatados corretamente para duas casas decimais, incluindo casos de preços negativos, zero e grandes valores
    
   
