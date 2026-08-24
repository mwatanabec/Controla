# Wireframe mobile da Home

**Lote:** 2 — Wireframe mobile de baixa fidelidade  
**Status:** aprovado em 2026-08-20; navegação ajustada e aprovada em 2026-08-20  
**Referência:** [Brief da Home aprovado](BRIEF_HOME.md)  
**Tela de estudo:** aproximadamente 360 × 800 px, com rolagem vertical

Este documento traduz o brief aprovado em uma estrutura de tela. Ele define hierarquia e posição relativa dos conteúdos, mas não define componentes finais, tecnologia ou arquitetura.

Todos os dados exibidos são mockados e fictícios.

## 1. Objetivo do wireframe

Validar se a ordem dos blocos ajuda a comerciante a perceber rapidamente:

- o que precisa de atenção;
- o que precisa comprar;
- onde há pendências;
- qual ação pode registrar;
- o que aconteceu recentemente.

## 2. Estrutura geral

A Home usa uma única coluna, rolagem vertical reduzida e uma barra de navegação inferior fixa. Não haverá gráficos, tabelas densas ou carrosséis obrigatórios.

Ordem dos blocos:

1. identificação compacta do produto e do negócio;
2. resumo do que exige atenção;
3. prioridade do dia;
4. produtos acabando;
5. pendências com Pontos Parceiros;
6. atividades recentes.

A barra inferior permanece visível e contém Início, Estoque, Registrar, Parceiros e Acertos. O botão central “Registrar” expande as opções de movimentação em um menu semicircular.

## 3. Wireframe principal

```text
┌──────────────────────────────────┐
│ [C] Controla                     │
│                                  │
│ Olá, Anona Presentes             │
│ Veja o que precisa da sua        │
│ atenção hoje.                    │
├──────────────────────────────────┤
│  3 produtos  │ 4 envios │   2    │
│  acabando    │ abertos  │ acertos│
│              │          │pendentes│
├──────────────────────────────────┤
│ ATENÇÃO                          │
│ 3 produtos precisam de reposição │
│ Confira o que está acabando      │
│ antes da próxima compra.         │
│                                  │
│ [ Ver reposição                ] │
╞════════ PRIMEIRA DOBRA ══════════╡
│ Produtos acabando       Ver todos│
│                                  │
│ Caneca Flores                    │
│ 2 em estoque · mínimo 5          │
│ [Abaixo do mínimo]               │
│ ──────────────────────────────── │
│ Kit Presente Lavanda             │
│ 0 em estoque · mínimo 3          │
│ [Sem estoque próprio]            │
├──────────────────────────────────┤
│ Pendências com parceiros         │
│                                  │
│ Salão Bella                      │
│ 1 venda para acertar             │
│                         [Ver >]  │
│ ──────────────────────────────── │
│ Loja da Ana                      │
│ Sem atualização há 12 dias       │
│                         [Ver >]  │
├──────────────────────────────────┤
│ Atividades recentes              │
│                                  │
│ Compra registrada                │
│ 12 Canecas Flores · Hoje         │
│ ──────────────────────────────── │
│ Envio para Salão Bella           │
│ 6 Kits Presente · Ontem          │
├──────────────────────────────────┤
│                                  │
│ Início  Estoque  (+)  Parceiros  │
│                 Registrar Acertos│
└──────────────────────────────────┘
```

“Primeira dobra” representa aproximadamente o conteúdo percebido antes da primeira rolagem. A barra inferior fica fixa, e o início da lista de produtos deve aparecer sem uma rolagem longa.

Ao tocar no botão central:

```text
│         (Envio)     (Venda)      │
│                                  │
│  (Compra)             (Devolução)│
│                                  │
│ Início  Estoque  (×)  Parceiros  │
│                 Registrar Acertos│
```

## 4. Anotações por bloco

### 4.1 Identificação

- “[C] Controla” é a assinatura visual compacta do produto no cabeçalho; o nome oficial permanece Maria Controla.
- “Anona Presentes” identifica o negócio da usuária.
- Não incluir menu, perfil ou notificações enquanto essas funções não fizerem parte do escopo.

### 4.2 Indicadores

- Usar três indicadores no máximo.
- Número e rótulo devem permanecer juntos.
- Cor e ícone podem apoiar a leitura no protótipo, mas não substituir o texto.
- Os indicadores funcionam como resumo; não precisam ser botões neste lote.

### 4.3 Prioridade do dia

- É o primeiro bloco de destaque.
- Explica o problema antes de apresentar a ação.
- “Ver reposição” não pressupõe que uma tela de reposição será implementada no protótipo.
- A prioridade em reposição continua sendo hipótese de produto.

### 4.4 Navegação e registro

- A barra inferior usa cinco opções com ícone e texto: Início, Estoque, Registrar, Parceiros e Acertos.
- “Registrar” ocupa a posição central e recebe maior destaque.
- O texto permanece visível abaixo de cada ícone; a compreensão não depende apenas do símbolo.
- “Registrar” expande um menu semicircular com Compra, Envio, Venda e Devolução.
- Cada opção usa ícone e descrição de uma palavra.
- “Acertos” permanece na barra inferior e não se repete no menu, evitando excesso de opções em 320 px.
- O símbolo central muda de “+” para “×” enquanto o menu está aberto.
- O conteúdo ao fundo pode ser suavemente escurecido para destacar as ações, sem criar caixa inferior.
- Os ícones atuais são suficientes para o protótipo; na implementação funcional, devem ser avaliados em tamanho visual maior, preservando os rótulos, as áreas de toque e a ausência de colisões em 320 px.
- As demais opções da barra não exigem telas secundárias funcionais neste protótipo.
- Não usar símbolo de leitura ou escaneamento, pois OCR não faz parte do escopo.

### 4.5 Produtos acabando

- Mostrar dois itens na Home; o terceiro permanece como referência da lista completa.
- Cada item informa quantidade atual, mínimo e motivo da atenção.
- “Ver todos” é apenas referência para uma evolução futura.
- Não exibir fornecedor, custo ou sugestão automática de quantidade na Home.

### 4.6 Pendências com parceiros

- Mostrar somente parceiro e situação que exige acompanhamento.
- Não exibir valores financeiros enquanto essa regra permanecer pendente.
- “1 venda para acertar” não significa pagamento recebido.
- “Sem atualização há 12 dias” indica acompanhamento, não venda ou perda.

### 4.7 Atividades recentes

- Limitar a dois eventos.
- Começar cada evento pelo tipo de movimentação.
- Manter compra, envio e venda visualmente distinguíveis pelo texto.
- Usar “Hoje” e “Ontem” no mock para leitura rápida.

## 5. Comportamento mobile esperado

- Uma única coluna em toda a tela.
- Conteúdo alinhado para leitura da esquerda para a direita.
- Áreas acionáveis com altura confortável para toque, preferencialmente a partir de 44 px.
- Textos não devem depender de gestos ocultos para serem compreendidos.
- Evitar rolagem horizontal.
- Manter a barra inferior fixa sem cobrir o último conteúdo da Home.
- Manter os rótulos visíveis sob os ícones da navegação.
- Abrir as ações de registro ao redor do botão central, sem caixa inferior.
- Preservar contraste e legibilidade em celulares simples.

## 6. Estados alternativos

Os estados abaixo não precisam aparecer simultaneamente no primeiro protótipo, mas orientam a substituição dos blocos.

### Estoque em dia

```text
┌──────────────────────────────────┐
│ Seu estoque está em dia.         │
│ Nenhum produto precisa de        │
│ reposição agora.                 │
└──────────────────────────────────┘
```

### Sem acertos pendentes

```text
┌──────────────────────────────────┐
│ Nenhum acerto pendente.          │
└──────────────────────────────────┘
```

### Primeira movimentação

```text
┌──────────────────────────────────┐
│ Você ainda não registrou         │
│ movimentações.                   │
│                                  │
│ [ Registrar primeira compra    ] │
└──────────────────────────────────┘
```

## 7. Itens deliberadamente ausentes

- busca;
- gráficos;
- valores de faturamento ou lucro;
- notificações;
- perfil da usuária;
- filtros;
- ações do Ponto Parceiro;
- telas secundárias funcionais para os itens da barra inferior;
- qualquer definição de backend ou autenticação.

Essas ausências preservam o escopo da Home e não significam decisões definitivas sobre versões futuras.

## 8. Critérios de aprovação

- Atenção e acesso a “Registrar” aparecem antes da primeira rolagem.
- “Registrar” é identificável como ação principal e expande as movimentações previstas.
- Todos os itens da barra inferior têm descrição textual visível.
- A Home apresenta menos conteúdo e exige menos rolagem que a versão anterior.
- A ordem dos blocos segue o brief aprovado.
- Produtos, envios e acertos não são confundidos.
- O wireframe não apresenta valor financeiro como regra definida.
- Nenhum elemento exige uma tela secundária funcional para ser compreendido.
- A estrutura pode ser transformada em protótipo visual sem criar novos requisitos.

## 9. Pontos para revisão

- A prioridade de reposição deve continuar no primeiro destaque?
- “Registrar” comunica com clareza que abre diferentes movimentações?
- Os três indicadores estão claros sem explicação?
- Os nomes Início, Estoque, Parceiros e Acertos são compreendidos sem explicação?
- A ordem das ações dentro do menu semicircular corresponde à rotina real?
- Duas atividades recentes ainda agregam valor à Home?
- A nova extensão da Home está confortável para uso diário?
