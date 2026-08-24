# Maria Controla

O **Maria Controla** é uma caderneta inteligente de mercadorias para pequenos comerciantes e revendedores. O produto ajuda a controlar compras, estoque próprio, mercadorias em pontos parceiros, vendas informadas, devoluções, acertos e reposição pelo celular.

O produto não pretende ser um ERP, sistema fiscal, PDV ou plataforma financeira completa. A prioridade é oferecer uma experiência simples, rápida e compreensível para pessoas que hoje dependem de papel, planilhas, memória e conversas no WhatsApp.

## Momento atual

Os Lotes 0, 1, 2, 3 e 4 foram aprovados. A etapa do protótipo mobile-first da Home está concluída, incluindo o roteiro de validação. Por decisão da owner do produto, não haverá sessões de validação antecipada como condição para a implementação. A arquitetura da V1 foi aprovada em 21 de agosto de 2026. O modelo detalhado dos dados e o protocolo offline foram preparados para revisão. Em seguida, foi iniciado o Lote 5 para testar telas e fluxos principais da V1 com dados mockados, sem backend, sem banco real e sem instalação de tecnologia.

O cliente piloto é a **Anona Presentes**. Esse nome representa o primeiro caso de uso e não o nome do produto.

## Objetivo da próxima etapa

Revisar o protótipo navegável dos fluxos principais da V1, usando dados mockados da Anona Presentes para testar compreensão e ordem das ações. Depois dos ajustes de fluxo, revisar e aprovar o modelo detalhado dos dados e o protocolo de sincronização offline. Após essa aprovação, o próximo lote técnico poderá transformar o desenho em migrations SQL, políticas RLS e contratos versionados, ainda respeitando a separação entre arquitetura e implementação.

## Fontes de verdade

1. [Contexto do produto](docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md)
2. [Decisões](docs/DECISOES.md)
3. [Regras de negócio](docs/REGRAS_NEGOCIO.md)
4. [Roadmap](docs/ROADMAP.md)
5. [Arquitetura aprovada](docs/ARQUITETURA.md)
6. [Modelo de dados em revisão](docs/MODELO_DADOS.md)
7. [Sincronização offline em revisão](docs/SINCRONIZACAO_OFFLINE.md)
8. [Fluxos funcionais da V1](docs/FLUXOS_V1.md)
9. [Brief da Home](docs/BRIEF_HOME.md)
10. [Wireframe da Home](docs/WIREFRAME_HOME.md)
11. [Roteiro de validação da Home](docs/ROTEIRO_VALIDACAO_HOME.md)
12. [Método de trabalho com IA](AGENTS.md)

As regras de separação de ferramentas, ambientes e contextos estão definidas no `AGENTS.md`.
