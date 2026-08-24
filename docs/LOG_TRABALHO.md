# LOG DE TRABALHO — MARIA CONTROLA

Este arquivo registra o andamento operacional do projeto Maria Controla.

Ele deve ser atualizado ao final de cada lote de trabalho relevante, para que qualquer novo chat, agente ou retomada consiga entender rapidamente:

- o que foi feito;
- quais arquivos foram lidos;
- quais arquivos foram alterados;
- quais decisões foram tomadas;
- quais pendências ficaram;
- qual é o próximo passo recomendado.

## Quando atualizar este log

Atualizar este arquivo sempre que houver:

- criação ou alteração de documentação;
- criação ou alteração de protótipo;
- criação ou alteração de código;
- decisão de produto;
- decisão de escopo;
- decisão de regra de negócio;
- mudança de roadmap;
- revisão importante;
- encerramento de um lote de trabalho.

Não é necessário atualizar para perguntas rápidas sem alteração de contexto do projeto.

## Modelo de registro

```md
## AAAA-MM-DD — Nome do lote

### Objetivo do lote
...

### Arquivos lidos
- ...

### Arquivos criados ou alterados
- ...

### O que foi feito
- ...

### Decisões registradas
- ...

### Pendências
- ...

### Próximo passo recomendado
...
```

## 2026-08-20 — Criação do log de trabalho

### Objetivo do lote

Criar a memória operacional do projeto Maria Controla e definir quando ela deve ser atualizada.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ROADMAP.md`

### Arquivos criados ou alterados

- Criado `docs/LOG_TRABALHO.md`.
- Alterado `AGENTS.md`.

### O que foi feito

- Criado o modelo de registro do andamento operacional.
- Incluída no `AGENTS.md` a orientação para atualizar o log ao final de lotes relevantes.

### Decisões registradas

- O log passa a ser a memória operacional para novos chats, agentes e retomadas do projeto.
- Perguntas rápidas sem alteração do contexto do projeto não exigem registro.

### Pendências

- Nenhuma pendência neste lote.

### Próximo passo recomendado

Retomar o Lote 1 pelo brief da Home mobile-first, somente após aprovação da owner do produto.

## 2026-08-20 — Lote 2: wireframe mobile da Home

### Objetivo do lote

Traduzir o brief aprovado em um wireframe mobile de baixa fidelidade, sem código, arquitetura ou identidade visual final.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/BRIEF_HOME.md`
- `docs/DECISOES.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Criado `docs/WIREFRAME_HOME.md`.
- Alterado `docs/BRIEF_HOME.md` para registrar sua aprovação.
- Alterado `README.md` para indicar o Lote 2 como etapa atual.
- Alterado `docs/ROADMAP.md` para registrar o andamento dos lotes da Home.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Definida uma estrutura de Home em coluna única para tela de aproximadamente 360 × 800 px.
- Posicionados atenção, prioridade de reposição e ações rápidas antes da primeira rolagem.
- Organizados produtos acabando, pendências com parceiros e atividades recentes.
- Documentados estados alternativos, itens ausentes e critérios de aprovação.
- Mantidos todos os nomes e números como dados mockados e fictícios.

### Decisões registradas

- O brief do Lote 1 foi aprovado pela owner do produto.
- O wireframe é uma hipótese estrutural para revisão e ainda não representa decisão visual final.
- Navegação global e telas secundárias permanecem fora deste lote.

### Pendências

- Revisão e aprovação do wireframe pela owner do produto.
- Validar a posição de reposição, compra, acerto e devolução na hierarquia.

### Próximo passo recomendado

Após aprovação do wireframe, planejar o Lote 3 para criar somente o protótipo visual mobile-first da Home.

## 2026-08-20 — Encerramento do Lote 2

### Objetivo do lote

Registrar a aprovação do wireframe e preparar a retomada do projeto em uma nova sessão.

### Arquivos lidos

- `docs/WIREFRAME_HOME.md`
- `README.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `docs/WIREFRAME_HOME.md` para registrar sua aprovação.
- Alterado `README.md` para indicar o próximo lote.
- Alterado `docs/ROADMAP.md` para registrar o wireframe aprovado.
- Alterado `docs/LOG_TRABALHO.md` com este encerramento.

### O que foi feito

- Lote 2 encerrado após aprovação da owner do produto.
- Registrado que o Lote 3 será iniciado em outra sessão para manter o contexto controlado.

### Decisões registradas

- O wireframe mobile da Home foi aprovado.
- O protótipo visual ainda não foi iniciado.

### Pendências

- Planejar o Lote 3 antes de criar ou alterar arquivos de protótipo.

### Próximo passo recomendado

Na nova sessão, ler o método e a memória operacional, consultar o brief e o wireframe aprovados e apresentar o plano do Lote 3 antes de implementar.

## 2026-08-20 — Lote 3: protótipo visual mobile-first da Home

### Objetivo do lote

Transformar o brief e o wireframe aprovados em um protótipo visual estático da Home para revisão da owner do produto, sem backend ou definição de arquitetura técnica.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/LOG_TRABALHO.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/ROADMAP.md`

### Arquivos criados ou alterados

- Criado `prototipo/home.html`.
- Alterado `README.md` para registrar o protótipo em revisão.
- Alterado `docs/ROADMAP.md` para atualizar o andamento do Lote 3.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Criado um protótipo visual autocontido, sem dependências externas e aberto diretamente no navegador.
- Aplicada a paleta indicada no brief, com hierarquia visual, cartões, botões e espaçamentos mobile-first.
- Preservada a ordem dos blocos definida no wireframe aprovado.
- Mantidos todos os dados mockados e as diferenças entre compra, envio, venda, acerto e devolução.
- Preparado comportamento responsivo para larguras de celular, sem rolagem horizontal prevista.
- Inspecionado o protótipo em 320, 360 e 430 px de largura, com as ações rápidas legíveis e o início de “Produtos acabando” visível na primeira dobra.

### Decisões registradas

- O protótipo usa um único arquivo HTML autocontido para esta validação visual.
- As ações são apenas representações visuais e não abrem fluxos ou telas secundárias.
- O Lote 3 permanece em revisão e não foi registrado como aprovado.

### Pendências

- Revisar o protótipo visual com a owner do produto.
- Ajustar eventuais pontos visuais antes de encerrar o Lote 3.
- Preparar o roteiro de validação somente no Lote 4, após aprovação.

### Próximo passo recomendado

Abrir o protótipo em largura de celular, revisar hierarquia, linguagem, legibilidade e destaque das ações e registrar a aprovação ou os ajustes necessários.

## 2026-08-20 — Ajuste do Lote 3: navegação e redução da Home

### Objetivo do lote

Ajustar o protótipo visual após a revisão da owner, facilitando o acesso às movimentações e reduzindo a rolagem da Home.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/DECISOES.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`
- `prototipo/home.html`

### Arquivos criados ou alterados

- Alterado `docs/BRIEF_HOME.md` para registrar a navegação aprovada e o conteúdo mais compacto.
- Alterado `docs/WIREFRAME_HOME.md` para representar a barra inferior e o painel de registro.
- Alterado `prototipo/home.html` com o ajuste visual e a interação local do painel.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Substituída a assinatura “Maria Controla” no cabeçalho por “[C] Controla”, sem mudar o nome oficial do produto.
- Criada uma barra inferior fixa com Início, Estoque, Registrar, Parceiros e Acertos, sempre acompanhados por texto.
- Destacado o botão central “Registrar” e criado um painel com venda, envio, compra, acerto e devolução.
- Removido o bloco de ações rápidas do corpo da Home.
- Reduzidas as listas para dois produtos críticos e duas atividades recentes.
- Mantidos os dois casos prioritários de parceiros.
- Preservado espaço inferior para a barra não cobrir o último conteúdo.

### Decisões registradas

- “Registrar” funciona no protótipo como entrada central para diferentes movimentações.
- Ícones da navegação devem permanecer acompanhados por descrições textuais.
- A assinatura visual compacta no cabeçalho não altera a decisão D-001 sobre o nome Maria Controla.
- As telas secundárias dos itens da barra continuam fora do escopo.

### Validação realizada

- Inspeção visual do estado principal em 320, 360 e 430 px de largura.
- Inspeção visual do painel de registro aberto em 360 px.
- Confirmada a abertura local do painel pelo botão central.
- Confirmada a ausência de rolagem horizontal nas larguras inspecionadas.
- Confirmada a exibição da lista de produtos mais cedo na primeira dobra.

### Pendências

- Revisar o ajuste visual com a owner do produto.
- Validar com usuárias reais se “Registrar” e os cinco rótulos da barra são compreendidos sem explicação.
- Não iniciar telas secundárias antes de novo lote aprovado.

### Próximo passo recomendado

Revisar o protótipo ajustado e registrar a aprovação do Lote 3 ou indicar correções pontuais antes de preparar o roteiro de validação.

## 2026-08-20 — Ajuste do Lote 3: menu radial de registro

### Objetivo do lote

Substituir o painel inferior de registro por ações distribuídas ao redor do botão central, seguindo a referência visual aprovada pela owner.

### Arquivos lidos

- `AGENTS.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/LOG_TRABALHO.md`
- `prototipo/home.html`

### Arquivos criados ou alterados

- Alterado `docs/BRIEF_HOME.md` para registrar o menu semicircular.
- Alterado `docs/WIREFRAME_HOME.md` para representar o novo estado expandido.
- Alterado `prototipo/home.html` para substituir o painel inferior pelo menu radial.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Removida a caixa inferior que listava as ações de registro.
- Distribuídas Compra, Envio, Venda e Devolução em semicírculo ao redor do botão “Registrar”.
- Adicionados ícones e descrições de uma palavra para todas as ações.
- Configurado o botão central para alternar visualmente entre “+” e “×”.
- Mantido “Acertos” como item direto da barra inferior.
- Adicionado escurecimento leve do conteúdo enquanto o menu está aberto, sem criar caixa atrás das ações.
- Mantido o fechamento pelo botão central, por toque fora do menu ou pela tecla `Esc`.

### Decisões registradas

- O menu radial usa quatro ações para manter legibilidade e áreas de toque em celulares estreitos.
- “Acertos” não se repete no menu porque já possui acesso direto na navegação inferior.
- Os rótulos permanecem obrigatórios; os ícones não comunicam as ações sozinhos.

### Validação realizada

- Inspeção visual do menu aberto em 320, 360 e 430 px de largura.
- Confirmado que “Devolução” cabe sem corte.
- Confirmado que ícones e rótulos não colidem entre si nem ultrapassam as laterais.
- Confirmada a ausência da antiga caixa inferior.
- Confirmada a abertura e o fechamento local do menu.

### Pendências

- Revisar o menu radial com a owner do produto.
- Validar com usuárias reais se o padrão expandido é percebido e compreendido sem explicação.
- Não implementar os fluxos das quatro ações antes de novo lote aprovado.

### Próximo passo recomendado

Revisar o estado aberto do botão “Registrar” e registrar a aprovação do Lote 3 ou solicitar ajustes visuais pontuais.

## 2026-08-20 — Registro de melhoria futura dos ícones radiais

### Objetivo do lote

Registrar a preferência da owner por ícones maiores no menu radial, sem modificar o protótipo atual.

### Arquivos lidos

- `AGENTS.md`
- `docs/WIREFRAME_HOME.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `docs/WIREFRAME_HOME.md` com a orientação para a implementação funcional.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Registrado que os ícones atuais são suficientes para a validação visual do protótipo.
- Adiada a ampliação dos ícones para a futura implementação funcional.
- Mantida a exigência de rótulos visíveis, áreas de toque confortáveis e ausência de colisões em celulares estreitos.

### Decisões registradas

- O protótipo não será alterado somente para aumentar os ícones neste momento.
- O tamanho visual maior deverá ser avaliado quando houver implementação funcional, considerando também os resultados da validação com usuárias.

### Pendências

- Confirmar explicitamente a aprovação e o encerramento do Lote 3.
- Planejar o Lote 4 somente após esse encerramento.

### Próximo passo recomendado

Encerrar formalmente o Lote 3 e iniciar uma nova sessão para planejar o roteiro de validação do Lote 4 com contexto reduzido.

## 2026-08-20 — Encerramento do Lote 3

### Objetivo do lote

Registrar a aprovação final do protótipo visual mobile-first da Home e encerrar formalmente o Lote 3.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `README.md` para registrar o Lote 3 aprovado e indicar o Lote 4 como próximo passo.
- Alterado `docs/ROADMAP.md` para atualizar o andamento dos lotes da Home.
- Alterado `docs/LOG_TRABALHO.md` com este encerramento.

### O que foi feito

- Registrada a aprovação da versão do protótipo com assinatura “[C] Controla”.
- Aprovadas a navegação inferior fixa e a ação central “Registrar”.
- Aprovado o menu radial com Compra, Envio, Venda e Devolução.
- Mantido “Acertos” como acesso direto na barra inferior.
- Preservada a melhoria futura de ampliar visualmente os ícones na implementação funcional.

### Decisões registradas

- O Lote 3 está aprovado e encerrado pela owner do produto.
- A aprovação é visual e não substitui a validação com usuárias reais.
- Nenhuma tela secundária, backend ou arquitetura técnica foi iniciada.

### Pendências

- Planejar o Lote 4 antes de criar ou alterar o roteiro de validação.
- Validar o protótipo com a Anona Presentes e com o caso adicional da manicure após aprovação do roteiro.

### Próximo passo recomendado

Iniciar uma nova sessão, ler somente as fontes necessárias e apresentar o planejamento do Lote 4 — roteiro de validação — antes de alterar qualquer arquivo.

## 2026-08-20 — Lote 4: roteiro de validação da Home

### Objetivo do lote

Preparar um roteiro para validar a compreensão, a linguagem, as prioridades e a descoberta das ações da Home com usuárias reais, sem implementar fluxos ou telas secundárias.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/LOG_TRABALHO.md`
- `docs/DECISOES.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/ROADMAP.md`

### Arquivos criados ou alterados

- Criado `docs/ROTEIRO_VALIDACAO_HOME.md`.
- Alterado `README.md` para registrar o roteiro em revisão.
- Alterado `docs/ROADMAP.md` para atualizar o andamento do Lote 4.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Definidos objetivo, hipóteses, participantes, preparação e conduta da moderação.
- Criadas tarefas para observar a leitura da Home, a prioridade de reposição, a navegação e o menu “Registrar”.
- Incluída a distinção entre compra, envio, venda, devolução e acerto.
- Definidas perguntas de encerramento e uma ficha de observação por tarefa.
- Estabelecida a separação entre evidência, padrão recorrente, achado individual, sugestão espontânea e limitação do protótipo.
- Registrado que as sessões serão executadas somente depois da aprovação do roteiro.

### Decisões registradas

- O Lote 4 prepara o roteiro, mas não executa a validação com usuárias reais.
- O sucesso das tarefas que apontam para telas inexistentes termina na localização e compreensão da entrada correta.
- Pedidos individuais não serão incorporados automaticamente ao escopo do produto.
- O roteiro está em revisão e o Lote 4 ainda não foi encerrado.

### Validação realizada

- Conferida a cobertura das hipóteses registradas no brief e no wireframe.
- Confirmado que o roteiro não exige telas secundárias para aplicar as tarefas.
- Confirmada a separação entre observação, interpretação e sugestão.

### Pendências

- Revisar e aprovar o roteiro com a owner do produto.
- Executar as sessões com a Anona Presentes e com o caso da manicure somente em lote posterior aprovado.

### Próximo passo recomendado

Revisar `docs/ROTEIRO_VALIDACAO_HOME.md` e registrar a aprovação ou solicitar ajustes antes de encerrar o Lote 4.

## 2026-08-20 — Encerramento do Lote 4

### Objetivo do lote

Registrar a aprovação do roteiro de validação da Home e encerrar formalmente o Lote 4, sem iniciar as sessões com usuárias reais.

### Arquivos lidos

- `README.md`
- `docs/ROTEIRO_VALIDACAO_HOME.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `docs/ROTEIRO_VALIDACAO_HOME.md` para registrar sua aprovação.
- Alterado `README.md` para registrar o Lote 4 aprovado e indicar a próxima etapa.
- Alterado `docs/ROADMAP.md` para concluir a Etapa 1 e atualizar o andamento do Lote 4.
- Alterado `docs/LOG_TRABALHO.md` com este encerramento.

### O que foi feito

- Registrada a aprovação do roteiro pela owner do produto.
- Encerrados formalmente o Lote 4 e a Etapa 1 do roadmap.
- Mantida a execução das sessões com usuárias reais para um novo lote previamente planejado e aprovado.

### Decisões registradas

- O roteiro está aprovado e pronto para orientar a validação futura.
- A aprovação do roteiro não significa que as hipóteses da Home foram validadas com usuárias reais.
- Nenhuma alteração foi feita no protótipo, e nenhuma sessão foi executada neste encerramento.

### Pendências

- Planejar a execução das sessões com a Anona Presentes e com o caso adicional da manicure.
- Não iniciar a validação real sem definir e aprovar o lote correspondente.

### Próximo passo recomendado

Em nova sessão, planejar somente a execução da validação com usuárias reais, usando `docs/ROTEIRO_VALIDACAO_HOME.md` como referência aprovada.

## 2026-08-20 — Mudança da estratégia de construção da V1

### Objetivo do lote

Alinhar a documentação à decisão da owner de construir a V1 funcional antes de apresentar o produto às pessoas interessadas.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `README.md` para indicar a definição técnica como próxima etapa.
- Alterado `docs/DECISOES.md` para registrar a nova estratégia da V1.
- Alterado `docs/ROADMAP.md` para retirar a validação antecipada como condição para arquitetura e implementação.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Registrado que a V1 funcional será construída antes das apresentações às pessoas interessadas.
- Mantido o roteiro de validação como referência, sem tratá-lo como bloqueio para a evolução técnica.
- Reorganizado o roadmap para iniciar a definição da arquitetura e do banco de dados.
- Incluída uma etapa posterior de apresentação do produto e organização das sugestões na fila de melhorias.
- Delimitado que “produto pronto” representa a V1 vigente, sem incluir automaticamente V2 ou evoluções posteriores.

### Decisões registradas

- Não haverá sessões de validação antecipada como condição para definir a arquitetura ou implementar a V1.
- Sugestões recebidas depois da apresentação serão registradas, avaliadas e priorizadas pela owner.
- Sugestões não serão incorporadas automaticamente ao escopo do produto.

### Pendências

- Planejar a Etapa 2 de definição técnica antes de escolher tecnologias ou modelar o banco de dados.
- Resolver, durante a definição técnica e de produto, as decisões pendentes que afetarem diretamente a V1.

### Próximo passo recomendado

Apresentar para aprovação o primeiro lote da Etapa 2, dedicado aos requisitos técnicos, opções de arquitetura e critérios de decisão, sem implementar código.

## 2026-08-20 — Etapa 2: proposta inicial de arquitetura

### Objetivo do lote

Preparar uma proposta técnica proporcional para a V1 funcional, comparando alternativas e definindo uma recomendação de arquitetura sem instalar tecnologias, modelar tabelas ou implementar código.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ROADMAP.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Criado `docs/ARQUITETURA.md` com a proposta técnica em revisão.
- Alterado `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md` para remover o conflito com a decisão D-009.
- Alterado `README.md` para registrar a proposta de arquitetura em revisão.
- Alterado `docs/ROADMAP.md` para indicar a Etapa 2 em andamento.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Comparadas as alternativas PWA, aplicação full-stack com servidor próprio e Flutter.
- Recomendada uma PWA React com TypeScript e Vite, hospedada no Cloudflare Pages.
- Recomendado Supabase gerenciado para PostgreSQL, autenticação e arquivos opcionais.
- Definida a proposta de isolamento por negócio com Row Level Security.
- Definidas operações críticas como transações no banco, com histórico de movimentos e proteção contra duplicidade.
- Recomendada uma V1 online-first, sem sincronização automática de lançamentos offline.
- Documentados autenticação, licença, limites de dispositivo, ambientes, backups, custos e riscos.
- Registradas as decisões de produto que precisam ser resolvidas antes do modelo físico do banco.

### Decisões registradas

- Nenhuma tecnologia foi registrada como decisão vigente; toda a arquitetura permanece como proposta até aprovação da owner.
- O próximo lote recomendado é a modelagem detalhada do banco, somente depois da aprovação da base arquitetural.

### Validação realizada

- Conferidas as recomendações com documentação oficial de React, Vite, MDN, Supabase e Cloudflare.
- Conferida a aderência da proposta às regras de rastreabilidade, isolamento de clientes, licenças e simplicidade operacional.
- Corrigido o conflito entre a instrução histórica do documento de contexto e a decisão D-009.

### Pendências

- Revisar e aprovar ou ajustar os dez itens listados em `docs/ARQUITETURA.md`.
- Confirmar se os clientes iniciais terão e-mail utilizável.
- Resolver as decisões de produto necessárias para fechar a modelagem detalhada do banco.
- Autorizar separadamente qualquer instalação, implementação, teste, servidor, commit ou deploy futuro.

### Próximo passo recomendado

Após aprovação da proposta de arquitetura, registrar as decisões técnicas vigentes e apresentar o plano do lote de modelagem detalhada do banco de dados.

## 2026-08-21 — Aprovação da arquitetura e do modelo SaaS com operação offline

### Objetivo do lote

Registrar a aprovação da arquitetura da V1, do modelo comercial SaaS e da operação offline com sincronização, encerrando a proposta técnica inicial e preparando a modelagem detalhada dos dados.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ROADMAP.md`
- `docs/ARQUITETURA.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `README.md` para registrar a arquitetura aprovada e a modelagem de dados como próxima etapa.
- Alterado `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md` para alinhar o modelo SaaS, a operação offline e a arquitetura vigente.
- Alterado `docs/DECISOES.md` com as decisões D-010, D-011 e D-012.
- Alterado `docs/REGRAS_NEGOCIO.md` com regras de operação offline e sincronização.
- Alterado `docs/ROADMAP.md` para registrar a aprovação da arquitetura e incluir armazenamento local e sincronização.
- Alterado `docs/ARQUITETURA.md` para registrar a aprovação e substituir a estratégia online-first por operação offline.
- Alterado `docs/LOG_TRABALHO.md` com este encerramento.

### O que foi feito

- Aprovado o modelo SaaS com infraestrutura e banco central sob administração da MarIA Soluções.
- Definida licença por negócio e plano, sem cobrança direta do provedor de banco ao cliente.
- Mantida a possibilidade de cobrança inicial de implantação sem transferência do código-fonte.
- Aprovada a PWA em React e TypeScript, com Vite, Cloudflare Pages e Supabase/PostgreSQL.
- Definido acesso inicial por link, instalação na tela do celular e Play Store como evolução posterior.
- Incluída operação offline das rotinas principais com IndexedDB, fila de comandos, estados visíveis e sincronização posterior.
- Definidos fallback de sincronização ao reabrir o app e ação manual, sem depender exclusivamente de execução em segundo plano.
- Registrada a necessidade de preservar eventos e tratar conflitos sem sobrescrita silenciosa.

### Decisões registradas

- D-010: modelo comercial e responsabilidade pela infraestrutura.
- D-011: arquitetura técnica da V1.
- D-012: operação offline e sincronização.

### Validação realizada

- Conferida a coerência entre README, contexto, decisões, regras, roadmap e arquitetura.
- Mantida a separação entre tecnologia aprovada e tecnologia ainda não instalada.
- Mantidos valores comerciais, forma de cobrança, política de dados e método operacional de login como decisões pendentes.

### Pendências

- Planejar e aprovar o lote de modelagem detalhada do banco central, banco local e protocolo de sincronização.
- Resolver as decisões de negócio que afetam diretamente tabelas, relacionamentos e conflitos.
- Confirmar a disponibilidade de e-mail para os usuários iniciais antes do lote de autenticação.
- Autorizar separadamente instalação, implementação, testes, servidor, commit e deploy.

### Próximo passo recomendado

Apresentar para aprovação o lote de modelagem de dados, incluindo entidades, relacionamentos, movimentos, armazenamento local, fila de sincronização, conflitos e critérios de pronto.

## 2026-08-21 — Decisões de produto para a modelagem de dados

### Objetivo do lote

Registrar as decisões da owner sobre acertos, preços, catálogo, venda direta, categorias, estoque mínimo, conflitos offline, cadastro e suporte antes da modelagem detalhada dos dados.

### Arquivos lidos

- `AGENTS.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ARQUITETURA.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `docs/DECISOES.md` com as decisões D-013 a D-017.
- Alterado `docs/REGRAS_NEGOCIO.md` com regras detalhadas de catálogo, preços, vendas, acertos, reposição, acesso e suporte.
- Alterado `docs/ARQUITETURA.md` com os requisitos que o próximo modelo deve representar.
- Alterado `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md` para substituir perguntas resolvidas por decisões e pendências atuais.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Definido catálogo de produtos separado por negócio.
- Definidos preço padrão do produto, preço específico por Ponto Parceiro e edição do preço no lançamento.
- Definidas categorias iniciais copiadas para cada negócio e manutenção livre pelo cliente.
- Definido estoque mínimo por produto e localização.
- Incluída venda direta pelo Cliente 1.
- Permitidos pagamentos parciais, preservando valor calculado e valor acordado separadamente.
- Definido que conflitos offline preservam eventos e geram alerta para o Cliente 1.
- Definido cadastro com e-mail verificado por código, nome completo, nome de usuário e senha.
- Registrada a necessidade de uma camada segura para login por nome de usuário sobre o Supabase.
- Registrada biometria por passkey como possibilidade ainda pendente para a V1.
- Definido suporte inicial pelo WhatsApp com código público do negócio e diagnóstico sem dados sensíveis.
- Definida a comunicação comercial inicial como “consignado com controle de estoque”.

### Decisões registradas

- D-013: catálogo, categorias, preços e reposição.
- D-014: venda direta e acertos.
- D-015: cadastro e identificação do usuário.
- D-016: suporte inicial.
- D-017: comunicação comercial inicial.

### Validação realizada

- Conferida a separação do catálogo, custos e preços por negócio.
- Conferida a preservação histórica dos preços e valores de acerto.
- Conferida a diferença entre venda direta e venda em Ponto Parceiro.
- Conferida a coerência entre decisões, regras, contexto e arquitetura.
- Mantidas como pendentes apenas as escolhas que a owner ainda não definiu.

### Pendências

- Definir limites dos planos e comportamento exato do limite de dispositivos.
- Definir unicidade do nome de usuário e momento da biometria/passkey.
- Definir valores, teste, implantação e forma de cobrança.
- Definir política de exportação, retenção e exclusão de dados.
- Definir eventuais condições futuras de instalação exclusiva ou banco dedicado.

### Próximo passo recomendado

Planejar o lote de modelagem detalhada do banco central, armazenamento local e sincronização usando as novas regras aprovadas.

## 2026-08-21 — Biometria em standby e simplificação das aprovações

### Objetivo do lote

Retirar biometria/passkey do escopo da V1 e ajustar o método de trabalho para evitar pedidos repetidos de autorização dentro de lotes já aprovados.

### Arquivos lidos

- `AGENTS.md`
- `docs/DECISOES.md`
- `docs/ARQUITETURA.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `AGENTS.md` para definir aprovação única por lote.
- Alterado `docs/DECISOES.md` para retirar biometria/passkey da V1.
- Alterado `docs/ARQUITETURA.md` para manter biometria/passkey em standby.
- Alterado `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md` para remover biometria das pendências da V1.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Definido que biometria/passkey não faz parte da V1 e poderá ser retomada em evolução futura.
- Removida biometria das listas de decisões ainda pendentes para a primeira versão.
- Definido que cada lote exige somente uma aprovação inicial.
- Definido que uma solicitação direta, concreta e bem delimitada da owner já conta como aprovação inicial do lote.
- Registrado que a aprovação inicial cobre alterações, comandos e validações normais já descritos no lote.
- Limitados novos pedidos de autorização a expansão de escopo, decisões materiais, ações destrutivas, custos, publicação externa ou bloqueios reais.

### Decisões registradas

- A V1 usará o fluxo aprovado de cadastro e login sem biometria obrigatória.
- Biometria/passkey permanece em standby.
- Um lote aprovado deve ser executado até o critério de pronto sem reconfirmações desnecessárias.

### Pendências

- Nenhuma pendência adicional criada por este ajuste.

### Próximo passo recomendado

Prosseguir para o planejamento único do lote de modelagem detalhada dos dados e, após sua aprovação, executá-lo integralmente sem novos pedidos de autorização dentro do escopo.

## 2026-08-21 — Modelo de dados e sincronização offline da V1

### Objetivo do lote

Detalhar o banco central, o armazenamento local e o protocolo de sincronização da V1 antes de iniciar migrations ou código funcional.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/ROADMAP.md`
- `docs/ARQUITETURA.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Criado `docs/MODELO_DADOS.md`.
- Criado `docs/SINCRONIZACAO_OFFLINE.md`.
- Alterado `README.md` para registrar o momento atual, a próxima etapa e as novas fontes de verdade.
- Alterado `docs/ROADMAP.md` para registrar a modelagem preparada e ainda em revisão.
- Alterado `docs/LOG_TRABALHO.md` com este registro.

### O que foi feito

- Modeladas as entidades da plataforma, dos negócios, do catálogo, das operações, do estoque, dos acertos e da auditoria.
- Separados os registros que são fonte de verdade das projeções recalculáveis de saldo e total.
- Definido estoque por movimentos imutáveis e correções por estorno ou ajuste rastreável.
- Representadas venda direta, venda em Ponto Parceiro, compras, envios, devoluções, perdas, avarias, acertos e pagamentos parciais.
- Definida a caixa de entrada central idempotente e o fluxo incremental de mudanças.
- Definidos os armazenamentos locais do IndexedDB e a fila de comandos offline.
- Definidos estados visíveis de sincronização, tentativas, dependências e retomada segura.
- Definidas políticas para conflitos de estoque, cadastro, preço, licença, permissão e pagamento.
- Registrados os cenários críticos que a implementação futura deverá automatizar em testes.

### Decisões registradas

- Nenhuma nova decisão de produto foi tomada neste lote.
- A modelagem aplica as decisões já aprovadas e permanece como proposta técnica até revisão da owner.
- Nomes físicos, tipos SQL, índices e políticas RLS serão fechados no lote de implementação do esquema.

### Validação realizada

- Simulada a criação offline de produto seguida de compra dependente.
- Simuladas duas vendas offline concorrentes da última unidade, preservando os fatos e apontando divergência.
- Simulado o reenvio de comando cuja resposta foi perdida, sem duplicar movimentação.
- Simulada venda offline enquanto o preço do catálogo era alterado em outro aparelho.
- Simulado pagamento parcial offline e preservação separada dos valores calculado e acordado.
- Conferida a separação entre banco central, cópia local, fila pendente, histórico e projeções.
- Conferidos os vínculos entre o modelo de dados, as regras de negócio e a arquitetura aprovada.

### Pendências

- Revisar e aprovar `docs/MODELO_DADOS.md` e `docs/SINCRONIZACAO_OFFLINE.md`.
- Fechar nomes físicos, tipos, restrições, índices e políticas RLS ao transformar o desenho em SQL.
- As decisões comerciais e de acesso já listadas nas fontes de verdade continuam pendentes, sem bloquear esta modelagem.

### Próximo passo recomendado

Após a aprovação dos dois documentos, planejar um lote pequeno para criar a base técnica: estrutura do projeto, migrations SQL iniciais, políticas RLS e testes estruturais do isolamento entre negócios e da idempotência.

## 2026-08-24 — Lote 5: protótipo navegável dos fluxos da V1

### Objetivo do lote

Criar um protótipo funcional e navegável, com dados mockados, para testar a compreensão dos principais fluxos da V1 antes de iniciar backend, banco de dados, autenticação real ou implementação funcional.

### Arquivos lidos

- `README.md`
- `docs/ROADMAP.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/BRIEF_HOME.md`
- `docs/WIREFRAME_HOME.md`
- `docs/LOG_TRABALHO.md`
- `prototipo/home.html`

### Arquivos criados ou alterados

- Criado `docs/FLUXOS_V1.md`.
- Criado `prototipo/fluxos-v1.html`.
- Alterado `README.md`.
- Alterado `docs/ROADMAP.md`.
- Alterado `docs/LOG_TRABALHO.md`.

### O que foi feito

- Documentado um mapa curto dos fluxos Compra, Envio, Venda, Devolução e Acerto.
- Criado um protótipo HTML estático, autocontido e mobile-first para testar caminhos de tela.
- Mantidos dados mockados da Anona Presentes, sem criação real de dados.
- Incluídas telas de apoio para Estoque, Pontos Parceiros e Acertos.
- Incluído alternador visual Online/Sem internet para simular estados de sincronização.
- Simulados os estados `Sincronizado`, `Salvo neste aparelho` e `Precisa revisar`.
- Incluído exemplo de divergência offline em venda concorrente da última unidade.
- Preservada a Home aprovada em `prototipo/home.html`, criando um novo arquivo para os fluxos.

### Decisões registradas

- O foco imediato passa a ser testar fluxo e compreensão com mock antes da base técnica.
- O protótipo de fluxos não substitui o modelo de dados nem o protocolo offline.
- Não houve instalação de tecnologia, backend, banco, autenticação real, commit, push ou deploy.
- A organização no Git será tratada posteriormente, conforme decisão da owner.

### Validação realizada

- Conferida a criação dos arquivos do lote.
- Conferida a existência dos caminhos principais no protótipo.
- Conferida a separação entre envio, venda, devolução e acerto no texto das telas.
- Conferida a simulação visual dos estados de sincronização previstos no protocolo offline.
- Conferida a renderização do HTML estático pelo Edge em modo headless.
- Conferida a sintaxe do JavaScript do protótipo com `node --check`.

### Pendências

- Revisar o protótipo em largura de celular e indicar ajustes de linguagem, ordem ou passos.
- Decidir se o próximo lote deve aprofundar telas de cada fluxo ou voltar para a revisão técnica do modelo de dados e da sincronização.
- Validar posteriormente com usuárias reais quando a owner considerar oportuno.

### Próximo passo recomendado

Abrir `prototipo/fluxos-v1.html`, percorrer os fluxos pelo botão Registrar e pela barra inferior, testar o alternador Online/Sem internet e registrar ajustes pontuais de fluxo antes de iniciar qualquer implementação técnica.
