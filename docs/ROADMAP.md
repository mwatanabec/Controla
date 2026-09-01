# Roadmap do Maria Controla

O roadmap organiza a evolução do produto por resultados esperados. Ele não define tecnologia, banco de dados ou arquitetura.

## Etapa 0 — Base documental

**Situação:** concluída e aprovada.

**Objetivo:** estabelecer fontes de verdade mínimas antes de desenhar ou implementar o produto.

Inclui:

- visão executável no README;
- contexto consolidado;
- decisões vigentes;
- regras de negócio;
- roadmap inicial.

**Critério de conclusão:** documentos revisados, coerentes entre si e aprovados pela owner do produto.

## Etapa 1 — Protótipo mobile-first da Home

**Situação:** concluída e aprovada. O [brief da Home](BRIEF_HOME.md), o [wireframe mobile](WIREFRAME_HOME.md), o protótipo visual e o [roteiro de validação](ROTEIRO_VALIDACAO_HOME.md) foram aprovados. O roteiro permanece como referência, mas sua execução não é condição para a evolução técnica.

**Objetivo:** definir e representar uma Home mobile-first simples, capaz de mostrar o que exige atenção e quais ações estão disponíveis.

Inclui:

- dados totalmente mockados;
- estoque crítico e produtos acabando;
- envios em aberto;
- acertos pendentes;
- compras ou atividades recentes;
- ações rápidas principais.

Não inclui backend, autenticação real, integrações ou arquitetura final.

**Critério de conclusão:** protótipo utilizável em largura de celular e roteiro de validação preparado.

Lotes operacionais desta etapa:

1. **Aprovado:** brief de conteúdo e prioridades da Home;
2. **Aprovado:** wireframe mobile de baixa fidelidade;
3. **Aprovado:** protótipo visual da Home;
4. **Aprovado:** roteiro de validação preparado; sua execução antecipada deixou de ser uma etapa obrigatória por decisão posterior da owner.

## Etapa 2 — Definição técnica proporcional

**Situação:** concluída e aprovada. A arquitetura, o modelo detalhado dos dados, o protocolo offline e os fluxos principais foram aprovados. O Lote 9 transformou o desenho em migrations SQL locais, RLS, funções, contratos e testes estruturais, sem aplicar banco remoto.

**Objetivo:** definir a arquitetura e o banco de dados necessários para construir a V1 funcional, sem antecipar complexidades das evoluções futuras.

Inclui:

- requisitos funcionais e técnicos da V1;
- opções de tecnologia, hospedagem e autenticação;
- segurança e separação dos dados de cada cliente;
- modelagem do domínio e do banco de dados;
- armazenamento local e protocolo de sincronização offline;
- estratégia de histórico e rastreabilidade das movimentações;
- protótipo funcional mockado para testar Compra, Envio, Venda, Devolução, Acertos, Estoque e Parceiros;
- riscos, custos e sequência de implementação.

**Critério de conclusão:** arquitetura, modelagem inicial do banco, protocolo offline e fluxos principais documentados e aprovados antes da implementação técnica.

## Etapa 3 — V1 funcional para o cliente pagante

**Situação:** em andamento. O Lote 10 criou a fundação da PWA em React, TypeScript e Vite, sem biblioteca de componentes, e converteu a Home aprovada para o frontend com dados mockados. Os Lotes 11 a 13 converteram Estoque, Pontos Parceiros e Acertos. Os Lotes 14 a 18 implementaram formulários editáveis para os fluxos principais. O Lote 19 criou a fundação IndexedDB v1 e a outbox local. Os Lotes 20 a 24 conectaram os cinco fluxos principais à outbox com uma identidade temporária de demonstração. Os Lotes 25 a 29 passaram a refletir operações pendentes nas consultas e validações como valores estimados. O Lote 30 tornou a fila local visível em linguagem humana. O Lote 31 completou o cálculo estimado para Compras repetidas. Backend, autenticação, banco ativo e sincronização ainda não foram conectados.

**Objetivo:** entregar um produto pronto para uso que permita ao cliente pagante controlar manualmente o ciclo de mercadorias.

Escopo da V1:

- produtos e fornecedores;
- compras e estoque próprio;
- Pontos Parceiros e envios;
- vendas informadas manualmente;
- devoluções, perdas e avarias;
- acertos;
- reposição básica;
- controles essenciais de acesso e licença;
- operação offline das rotinas principais e sincronização posterior.

**Critério de conclusão:** o cliente consegue rastrear o que entrou, onde está, o que vendeu, o que voltou e o que falta acertar.

Lotes técnicos desta etapa:

1. **Concluído — Lote 10:** fundação da PWA, componentes próprios, Home mobile-first, dados mockados e validações automatizadas;
2. **Concluído — Lote 11:** tela Estoque com busca, filtros, lista, detalhes, distribuição por Ponto Parceiro e navegação;
3. **Concluído — Lote 12:** tela Pontos Parceiros com busca, filtros, lista, detalhes, folha de mercadorias e navegação;
4. **Concluído — Lote 13:** tela Acertos com busca, filtros, lista, detalhes, resumo financeiro e navegação;
5. **Concluído — Lote 14:** formulário de Compra com campos editáveis, validação, cálculo do efeito e confirmação explicitamente simulada;
6. **Concluído — Lote 15:** formulário de Envio com validação de saldo, transferência projetada entre localizações e confirmação explicitamente simulada;
7. **Concluído — Lote 16:** formulário de Venda direta ou em Ponto Parceiro, com preço editável, validação de saldo e efeito projetado no acerto;
8. **Concluído — Lote 17:** formulário de Devolução com validação do saldo no parceiro, retorno projetado ao estoque próprio e confirmação simulada;
9. **Concluído — Lote 18:** formulário de pagamento de Acerto parcial ou total, com valores separados, validação do saldo e preservação do vínculo com a venda;
10. **Concluído — Lote 19:** esquema IndexedDB v1, envelope tipado, sequência atômica por aparelho e operações básicas da outbox;
11. **Concluído — Lote 20:** identidade local de demonstração persistente e gravação do fluxo de Compra na outbox, com estado visível de registro salvo somente no aparelho;
12. **Concluído — Lote 21:** gravação do fluxo de Envio na outbox local, preservando origem, destino, parceiro e a distinção entre transferência e venda;
13. **Concluído — Lote 22:** gravação de Venda direta e Venda em Ponto Parceiro na outbox, preservando canal, origem, preço histórico e efeito financeiro distinto;
14. **Concluído — Lote 23:** gravação de Devolução na outbox como transferência do parceiro ao estoque próprio, sem cancelar ou reclassificar vendas;
15. **Concluído — Lote 24:** gravação de pagamento parcial ou total de Acerto na outbox, preservando os valores separados e o vínculo histórico;
16. **Concluído — Lote 25:** projeção local imutável de Compra, Envio, Venda e Devolução na tela Estoque, com distinção explícita entre saldo estimado e confirmado;
17. **Concluído — Lote 26:** carregador reutilizável do estoque estimado e validação de operações consecutivas em Envio, Venda e Devolução;
18. **Concluído — Lote 27:** quantidades estimadas na consulta e nos detalhes de Pontos Parceiros, preservando separadamente os dados financeiros mockados;
19. **Concluído — Lote 28:** projeção de pagamentos locais na consulta de Acertos, com valores e status estimados sem apagar a Venda vinculada;
20. **Concluído — Lote 29:** carregamento do Acerto estimado no formulário e bloqueio de pagamentos consecutivos acima do saldo local restante;
21. **Concluído — Lote 30:** contador na Home e visão somente de leitura das operações locais, com descrição humana e estado visível sem expor payload técnico;
22. **Concluído — Lote 31:** estoque estimado no formulário de Compra e recálculo acumulado após cada comando local;
23. **Próximos lotes:** autenticação, integração com o banco e sincronização.

## Etapa 4 — Apresentação do produto e fila de melhorias

**Objetivo:** apresentar a V1 funcional à Anona Presentes, ao caso da manicure e a outras pessoas interessadas, demonstrando como o produto funciona e coletando sugestões.

Inclui:

- apresentação do produto pronto para uso;
- registro das sugestões e dificuldades observadas;
- análise de aderência ao público-alvo;
- priorização das sugestões na fila de melhorias.

**Critério de conclusão:** retornos registrados e priorizados pela owner, sem incorporar automaticamente pedidos individuais ou interromper o escopo aprovado da V1.

## Evoluções posteriores

### V2 — Área do Ponto Parceiro

- acesso limitado por convite;
- consulta às mercadorias recebidas;
- informação de vendas e devoluções;
- solicitação de reposição;
- confirmação posterior pelo cliente pagante.

### V3 — WhatsApp e automação conversacional

- registro assistido a partir de mensagens;
- confirmação antes de criar movimentações;
- resumos de acerto.

### V4 — Recomendações

- produtos parados ou com maior saída;
- sugestão de reposição;
- apoio à escolha de fornecedor;
- alertas baseados em histórico.

### V5 — Fiscal e integrações

- leitura de documentos;
- importação e exportação;
- integrações fiscais ou contábeis, se houver validação comercial.

## Fora do horizonte imediato

- ERP completo;
- PDV completo;
- financeiro completo;
- e-commerce;
- emissão fiscal na V1;
- OCR na V1;
- automações de IA na V1;
- customizações individuais sem benefício geral comprovado.
