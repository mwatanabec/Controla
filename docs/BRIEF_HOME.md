# Brief da Home mobile-first

**Lote:** 1 — Brief da Home  
**Status:** aprovado em 2026-08-20; navegação ajustada e aprovada em 2026-08-20  
**Cliente piloto:** Anona Presentes

Este documento define o conteúdo e as prioridades da Home que será prototipada posteriormente. Ele não é um wireframe, não define arquitetura e não autoriza implementação.

Todos os nomes de produtos, parceiros, quantidades e atividades apresentados abaixo são **dados mockados e fictícios**, criados apenas para validar a experiência.

## 1. Objetivo da Home

Ao abrir o Maria Controla, a comerciante deve entender rapidamente:

- o que precisa comprar;
- o que está acabando;
- onde existem pendências;
- o que precisa ser acertado;
- qual ação pode registrar em seguida.

A Home deve funcionar como uma visão prática do dia, não como um painel de gestão complexo.

## 2. Usuária principal desta validação

Responsável pela Anona Presentes, em contexto de comércio familiar, usando o celular durante a rotina do negócio.

Características consideradas:

- baixa tolerância a telas complexas;
- necessidade de localizar problemas rapidamente;
- familiaridade maior com linguagem cotidiana do que com termos técnicos;
- possível uso em celular simples e com internet instável;
- controle atual apoiado por papel, memória, planilhas ou WhatsApp.

## 3. Princípios da experiência

- Priorizar o que exige ação.
- Usar frases curtas e linguagem humana.
- Mostrar poucos indicadores por vez.
- Evitar gráficos, tabelas densas e jargões.
- Tornar a ação principal evidente.
- Diferenciar atenção de informação sem transmitir alarme excessivo.
- Não confundir mercadoria enviada com mercadoria vendida.
- Não confundir venda informada com valor já acertado.

## 4. Hierarquia de conteúdo

### 4.1 Identificação

Conteúdo sugerido:

- assinatura visual compacta **“C Controla”** no cabeçalho;
- saudação curta: **“Olá, Anona Presentes”**;
- apoio: **“Veja o que precisa da sua atenção hoje.”**

“C Controla” é uma abreviação visual usada somente na interface. O nome oficial do produto permanece Maria Controla. Anona Presentes aparece como negócio da usuária, nunca como nome do produto.

### 4.2 Resumo do que exige atenção

Exibir até três indicadores compactos:

| Indicador | Mock | Significado |
| --- | ---: | --- |
| Produtos acabando | 3 | Estoque próprio igual ou abaixo do mínimo |
| Envios em aberto | 4 | Pontos Parceiros com mercadorias em acompanhamento |
| Acertos pendentes | 2 | Parceiros com vendas informadas ainda não acertadas |

Os indicadores devem usar texto, número e rótulo. A compreensão não pode depender somente de cor ou ícone.

### 4.3 Prioridade do dia

O primeiro destaque deve ser reposição:

- título: **“3 produtos precisam de reposição”**;
- apoio: **“Confira o que está acabando antes da próxima compra.”**;
- ação: **“Ver reposição”**.

Essa prioridade é uma hipótese para validação, baseada na necessidade recorrente de evitar compras em cima da hora.

### 4.4 Navegação e registro

Usar uma barra inferior fixa, com ícone e descrição textual sempre visível:

- **Início**;
- **Estoque**;
- **Registrar**;
- **Parceiros**;
- **Acertos**.

**Registrar** ocupa a posição central e recebe maior destaque visual. Ele funciona como entrada para as principais movimentações, sem transformar uma única rotina em ação universal. Ao ser acionado, expande um menu semicircular ao redor do botão, sem abrir uma caixa inferior.

Ao tocar em **Registrar**, mostrar ícones com descrições de uma palavra:

- **Compra**;
- **Envio**;
- **Venda**;
- **Devolução**.

**Acertos** permanece como acesso direto na barra inferior e não se repete no menu semicircular, preservando espaço e legibilidade em celulares de 320 px. Enquanto o menu estiver aberto, o conteúdo da Home pode receber um escurecimento leve, sem caixa ou painel atrás das ações.

As descrições devem acompanhar os ícones. O protótipo deverá avaliar se a usuária entende as ações pelos nomes, sem explicação técnica. **Ver reposição** permanece no destaque do dia, e o antigo bloco de ações rápidas deixa de ocupar espaço no corpo da Home.

### 4.5 Produtos acabando

Lista curta com no máximo dois itens na Home para reduzir a rolagem. Os três mocks continuam como referência para a futura lista completa:

| Produto fictício | Estoque próprio | Mínimo | Estado |
| --- | ---: | ---: | --- |
| Caneca Flores | 2 | 5 | Abaixo do mínimo |
| Kit Presente Lavanda | 0 | 3 | Sem estoque próprio |
| Vela Baunilha | 4 | 6 | Abaixo do mínimo |

Cada item deve destacar nome, quantidade atual e motivo da atenção. O protótipo principal mostra Caneca Flores e Kit Presente Lavanda; a lista completa, incluindo Vela Baunilha, pertence à futura visão de reposição.

### 4.6 Pendências com Pontos Parceiros

Mostrar no máximo dois casos prioritários:

| Parceiro fictício | Situação mockada | Texto sugerido |
| --- | --- | --- |
| Salão Bella | Uma venda informada aguardando acerto | **“1 venda para acertar”** |
| Loja da Ana | Mercadorias sem atualização recente | **“Sem atualização há 12 dias”** |

Não exibir valor financeiro como regra nesta etapa. O nível de detalhe dos valores de acerto ainda é uma decisão pendente.

### 4.7 Atividades recentes

Exibir até dois eventos, em linguagem simples:

- **“Compra registrada: 12 Canecas Flores”** — Hoje;
- **“6 Kits Presente enviados para Salão Bella”** — Ontem;

A atividade deve preservar a diferença entre compra, envio e venda.

## 5. Estados previstos no brief

### Estado principal

Home com alertas, listas compactas, atividades e navegação inferior usando os mocks deste documento.

### Sem itens críticos

- mensagem: **“Seu estoque está em dia.”**;
- apoio: **“Nenhum produto precisa de reposição agora.”**

### Sem acertos pendentes

- mensagem: **“Nenhum acerto pendente.”**

### Sem atividades

- mensagem: **“Você ainda não registrou movimentações.”**;
- ação sugerida: **“Registrar primeira compra”**.

Esses estados serão referências de conteúdo. O primeiro protótipo pode representar apenas o estado principal.

## 6. Linguagem e tom de voz

Usar:

- Produtos;
- Compras;
- Estoque;
- Pontos Parceiros;
- Envios;
- Vendas;
- Acertos;
- Reposição.

O tom deve ser claro, acolhedor e objetivo. Evitar linguagem técnica, promessas financeiras e mensagens que culpem a usuária.

## 7. Direção visual de referência

A futura exploração visual deve seguir a marca MarIA:

- Ameixa Profundo: `#5B3A5E`;
- Carvão Suave: `#2E2A2F`;
- Creme Quente: `#FFF9F6`;
- Lavanda Suave: `#B79AC8`;
- Pêssego Blush: `#F3D7CF`;
- Rosa Atenuado: `#D9B8C3`.

Características desejadas:

- feminina sem ser infantil;
- acolhedora sem perder credibilidade;
- simples sem parecer amadora;
- tecnológica sem parecer fria;
- legível e organizada em tela pequena.

A definição de componentes, tipografia e layout pertence aos lotes de wireframe e protótipo.

## 8. Roteiro de validação

Apresentar a futura Home sem explicar previamente seu funcionamento e pedir que a participante:

1. diga o que precisa de atenção hoje;
2. identifique qual produto precisa ser comprado;
3. encontre onde registraria uma nova compra;
4. encontre onde informaria uma venda feita por parceiro;
5. identifique se existe algum acerto pendente;
6. explique, com suas palavras, a diferença entre envio, venda e acerto.

Registrar:

- onde houve hesitação;
- termos que precisaram de explicação;
- informações ignoradas;
- ações confundidas;
- sugestões espontâneas, sem convertê-las automaticamente em escopo.

## 9. Critérios de aprovação do brief

- A hierarquia responde às quatro perguntas centrais da Home.
- O botão central “Registrar” reúne as rotinas prioritárias do cliente pagante.
- Os mocks não são apresentados como dados reais da Anona Presentes.
- Venda, envio, devolução e acerto permanecem conceitos distintos.
- O conteúdo cabe em uma experiência mobile sem exigir painel denso.
- Nenhuma regra pendente foi convertida em decisão definitiva.
- O documento permite iniciar um wireframe sem inventar requisitos.

## 10. Hipóteses a validar

- Reposição deve ser o primeiro destaque da Home.
- “Registrar” deve funcionar como entrada central para diferentes movimentações.
- A navegação inferior com rótulos deve reduzir a dependência de rolagem e de ícones isolados.
- Três indicadores são suficientes para a visão inicial.
- “Pontos Parceiros” é um termo compreensível para a usuária piloto.
- A usuária entende “acerto pendente” sem confundir com venda ou recebimento.
- Duas atividades recentes agregam valor sem sobrecarregar a tela.
