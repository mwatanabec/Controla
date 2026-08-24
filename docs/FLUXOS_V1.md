# Fluxos funcionais da V1

**Status:** proposta para protótipo navegável com dados mockados.

Este documento traduz o modelo de dados e a sincronização offline em caminhos de tela para testar entendimento, ordem das ações e linguagem antes da implementação real.

O protótipo deste lote não cria dados reais, não usa backend, não instala tecnologia e não substitui as futuras migrations, políticas RLS ou contratos de sincronização.

## 1. Objetivo

Validar se uma comerciante consegue percorrer os fluxos principais da V1 pelo celular:

- registrar compra;
- enviar mercadoria para Ponto Parceiro;
- registrar venda direta ou venda informada por parceiro;
- registrar devolução;
- registrar acerto com pagamento parcial;
- entender quando algo ficou salvo apenas no aparelho, sincronizado ou com divergência.

## 2. Principios de tela

- Usar dados mockados da Anona Presentes.
- Evitar campos vazios quando o objetivo for testar o caminho.
- Mostrar primeiro a ação, depois os detalhes.
- Preservar termos simples: Compra, Envio, Venda, Devolução, Acerto, Estoque e Ponto Parceiro.
- Diferenciar envio, venda, devolução e acerto em todas as telas.
- Exibir estado de sincronização em linguagem visível, sem jargao tecnico.
- Não transformar saldo estimado em saldo confirmado.

## 3. Dados mockados usados

### Produtos

| Produto | Estoque próprio | Salão Bella | Loja da Ana | Preço padrão |
| --- | ---: | ---: | ---: | ---: |
| Caneca Flores | 2 | 4 | 1 | R$ 39,90 |
| Kit Presente Lavanda | 0 | 2 | 0 | R$ 74,90 |
| Vela Baunilha | 4 | 3 | 2 | R$ 29,90 |

### Pontos Parceiros

| Ponto Parceiro | Situação |
| --- | --- |
| Salão Bella | 1 venda para acertar |
| Loja da Ana | Sem atualização há 12 dias |

### Acertos

| Parceiro | Calculado | Acordado | Pago |
| --- | ---: | ---: | ---: |
| Salão Bella | R$ 119,70 | R$ 110,00 | R$ 60,00 |
| Loja da Ana | R$ 59,80 | R$ 59,80 | R$ 0,00 |

## 4. Fluxos do botao Registrar

### Compra

1. Abrir Registrar > Compra.
2. Conferir produto, fornecedor, quantidade, custo e destino.
3. Confirmar a compra.
4. Mostrar efeito esperado: aumenta estoque próprio.
5. Mostrar estado: Sincronizado, se online, ou Salvo neste aparelho, se offline.

### Envio

1. Abrir Registrar > Envio.
2. Conferir parceiro, produto, quantidade, origem e destino.
3. Confirmar o envio.
4. Mostrar efeito esperado: reduz estoque próprio e aumenta estoque do parceiro.
5. Reforçar que envio não é venda.

### Venda

1. Abrir Registrar > Venda.
2. Escolher entre venda direta e venda em Ponto Parceiro.
3. Conferir origem, produto, quantidade e preço usado.
4. Confirmar a venda.
5. Venda direta reduz estoque próprio e não cria acerto.
6. Venda em parceiro reduz estoque do parceiro e cria pendência de acerto.
7. Quando o exemplo simular disputa pela última unidade, mostrar Precisa revisar.

### Devolução

1. Abrir Registrar > Devolução.
2. Conferir parceiro, produto e quantidade que voltou.
3. Confirmar devolução.
4. Mostrar efeito esperado: reduz estoque do parceiro e aumenta estoque próprio.
5. Reforçar que devolução não é venda cancelada.

### Acerto

1. Abrir Acertos ou Registrar > Acerto, quando existir atalho futuro.
2. Escolher o parceiro com venda pendente.
3. Conferir valor calculado, valor acordado e pagamento recebido.
4. Confirmar acerto parcial ou total.
5. Mostrar valor calculado e acordado separadamente.
6. Manter venda vinculada ao acerto.

## 5. Fluxos de apoio

### Estoque

Tela de consulta para comparar estoque próprio, estoque em parceiros e saldo estimado quando houver movimentação local pendente.

### Parceiros

Tela de consulta por Ponto Parceiro, mostrando mercadorias enviadas, vendas informadas, devoluções e pendências.

### Sincronização

O protótipo deve permitir alternar visualmente entre:

- **Online:** ao salvar, mostra Sincronizado.
- **Sem internet:** ao salvar, mostra Salvo neste aparelho.
- **Divergência:** em um exemplo controlado, mostra Precisa revisar.

## 6. Critérios de pronto do protótipo

- Home continua reconhecível a partir do protótipo aprovado.
- Os cinco caminhos principais podem ser percorridos por toque.
- A usuaria não precisa digitar dados para testar o fluxo.
- Cada confirmação mostra o efeito no estoque, parceiro ou acerto.
- Estados offline aparecem em linguagem simples.
- O protótipo roda localmente em HTML estático.
- Não ha backend, banco, autenticação, instalação, commit ou deploy.

