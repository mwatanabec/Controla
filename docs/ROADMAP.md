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

**Situação:** em andamento. A arquitetura foi aprovada pela owner em 21 de agosto de 2026. O [modelo detalhado dos dados](MODELO_DADOS.md) e o [protocolo de sincronização offline](SINCRONIZACAO_OFFLINE.md) foram preparados e aguardam revisão e aprovação antes de virarem migrations, políticas ou código. Antes da implementação técnica, foi iniciado um protótipo navegável de [fluxos funcionais da V1](FLUXOS_V1.md), com dados mockados, para testar compreensão, ordem das ações e estados offline.

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

**Critério de conclusão:** arquitetura e modelagem inicial do banco documentadas e aprovadas antes da implementação.

## Etapa 3 — V1 funcional para o cliente pagante

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
