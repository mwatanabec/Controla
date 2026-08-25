# Maria Controla

O **Maria Controla** é uma caderneta inteligente de mercadorias para pequenos comerciantes e revendedores. O produto ajuda a controlar compras, estoque próprio, mercadorias em pontos parceiros, vendas informadas, devoluções, acertos e reposição pelo celular.

O produto não pretende ser um ERP, sistema fiscal, PDV ou plataforma financeira completa. A prioridade é oferecer uma experiência simples, rápida e compreensível para pessoas que hoje dependem de papel, planilhas, memória e conversas no WhatsApp.

## Momento atual

Os Lotes 0 a 8 foram concluídos conforme seus escopos. O protótipo mobile-first da Home e dos fluxos principais da V1 está aprovado, incluindo Estoque, Pontos Parceiros e Acertos. Por decisão da owner do produto, não haverá sessões de validação antecipada como condição para a implementação. A arquitetura da V1, o modelo detalhado dos dados e o protocolo offline estão aprovados para o próximo lote técnico. Até aqui, o projeto continua sem backend, banco real ou instalação de tecnologia.

O cliente piloto é a **Anona Presentes**. Esse nome representa o primeiro caso de uso e não o nome do produto.

## Base técnica inicial da V1

O Lote 9 registrou migrations SQL locais, políticas RLS, funções transacionais iniciais, contratos versionados de sincronização e testes estruturais. Nenhuma migration foi aplicada em banco remoto, nem houve instalação, credencial, deploy ou alteração do protótipo visual.

## Fontes de verdade

1. [Contexto do produto](docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md)
2. [Decisões](docs/DECISOES.md)
3. [Regras de negócio](docs/REGRAS_NEGOCIO.md)
4. [Roadmap](docs/ROADMAP.md)
5. [Arquitetura aprovada](docs/ARQUITETURA.md)
6. [Modelo de dados aprovado para o esquema](docs/MODELO_DADOS.md)
7. [Sincronização offline aprovada para a base técnica](docs/SINCRONIZACAO_OFFLINE.md)
8. [Fluxos funcionais da V1](docs/FLUXOS_V1.md)
9. [Brief da Home](docs/BRIEF_HOME.md)
10. [Wireframe da Home](docs/WIREFRAME_HOME.md)
11. [Roteiro de validação da Home](docs/ROTEIRO_VALIDACAO_HOME.md)
12. [Método de trabalho com IA](AGENTS.md)

As regras de separação de ferramentas, ambientes e contextos estão definidas no `AGENTS.md`.
