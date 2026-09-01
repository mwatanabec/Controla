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

## 2026-08-25 — Lote 6: reorganização da tela de Estoque

### Objetivo do lote

Reduzir a poluição visual da tela de Estoque para comportar vários produtos e permitir consulta rápida ou investigação detalhada sem misturar o estoque próprio com os Pontos Parceiros.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`
- `docs/DECISOES.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/FLUXOS_V1.md`
- `docs/LOG_TRABALHO.md`
- `prototipo/fluxos-v1.html`

### Arquivos criados ou alterados

- Alterado `prototipo/fluxos-v1.html`.
- Alterado `docs/LOG_TRABALHO.md`.

### O que foi feito

- Reorganizada a tela para abrir em lista curta, com foto ilustrativa, nome, status por bolinha, estoque próprio, total nos Pontos Parceiros e estoque total.
- Adicionados busca e filtros por Todos, Baixo estoque, Em pontos e Sem estoque.
- Adicionada alternância entre Lista e Detalhes.
- Adicionado bottom sheet com a distribuição do produto em cada Ponto Parceiro.
- Adicionado menu de três pontos com ações de produto representadas no protótipo.
- Mantidos os dados mockados da Anona Presentes e os fluxos existentes sem backend.

### Decisões registradas

- A lista curta é a visualização padrão da tela Estoque.
- O detalhamento por Ponto Parceiro fica sob demanda, ao tocar no total em pontos ou ao escolher a visão Detalhes.
- O termo de interface permanece `Pontos Parceiros`.
- Os três pontos representam ações do produto, começando por editar produto, registrar compra e ajustar estoque.

### Validação realizada

- JavaScript embutido validado com `new Function`.
- `git diff --check` executado sem erros.
- Conferida a presença dos controles de filtro, busca, alternância de visualização, detalhe por produto e menu de ações.

### Pendências

- Substituir as miniaturas ilustrativas por fotos reais quando os ativos dos produtos estiverem disponíveis.
- Validar a hierarquia visual com a owner em largura de celular.

### Próximo passo recomendado

Abrir `prototipo/fluxos-v1.html`, entrar em Estoque, testar os filtros, a busca, a visão Detalhes, os três pontos e o bottom sheet de cada produto.

## 2026-08-25 — Lote 7: reorganização das telas de Parceiros e Acertos

### Objetivo do lote

Aplicar a mesma lógica de consulta compacta da tela Estoque nas telas Pontos Parceiros e Acertos, sem usar fotos, para facilitar a leitura quando houver vários parceiros e pendências.

### Arquivos lidos

- `AGENTS.md`
- `docs/FLUXOS_V1.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/LOG_TRABALHO.md`
- `prototipo/fluxos-v1.html`

### Arquivos criados ou alterados

- Alterado `prototipo/fluxos-v1.html`.
- Alterado `docs/LOG_TRABALHO.md`.

### O que foi feito

- Reorganizada a tela Pontos Parceiros em lista curta, com nome, situação, mercadorias no ponto, valor a conferir e busca.
- Adicionados filtros por Todos, Com pendência e Sem atualização nos parceiros.
- Adicionada alternância entre Lista e Detalhes nos parceiros.
- Adicionada folha inferior com mercadorias e situação de cada Ponto Parceiro.
- Reorganizada a tela Acertos em lista curta, com parceiro, situação do pagamento, valor acordado, valor já pago e busca.
- Adicionados filtros por Todos, Em aberto, Parcial e Pagos nos acertos.
- Adicionada alternância entre Lista e Detalhes nos acertos.
- Mantidos os botões existentes de registrar venda, envio, devolução e pagamento dentro da visão detalhada.
- Adicionados menus de três pontos para ações de parceiro e acerto.

### Decisões registradas

- Parceiros e Acertos não usam foto; o nome e a situação são o sinal principal de identificação.
- A lista curta é a visualização padrão nas duas telas.
- A visão detalhada fica sob demanda e concentra os números e ações operacionais.
- O termo `Pontos Parceiros` permanece na interface.

### Validação realizada

- JavaScript embutido validado com `new Function`.
- `git diff --check` executado sem erros.
- Conferida a presença dos filtros, busca, alternância de visualização, menus e folhas de detalhe das duas telas.

### Pendências

- Validar a hierarquia visual das três telas em largura de celular.
- Decidir em lote futuro quais ações dos menus devem abrir fluxos completos de edição ou histórico.

### Próximo passo recomendado

Abrir `prototipo/fluxos-v1.html`, navegar por Pontos Parceiros e Acertos, testar filtros, busca, visão Detalhes, menus e folhas inferiores.

## 2026-08-25 — Lote 8: fechamento das regras antes do SQL

### Objetivo do lote

Incorporar as decisões da owner sobre acertos divididos, devoluções posteriores, estoque negativo offline, estados da fila, recuperação de processamento, retenção do histórico e dados locais antes de iniciar migrations SQL.

### Arquivos lidos

- `AGENTS.md`
- `README.md`
- `docs/ROADMAP.md`
- `docs/MODELO_DADOS.md`
- `docs/SINCRONIZACAO_OFFLINE.md`
- `docs/REGRAS_NEGOCIO.md`
- `docs/DECISOES.md`
- `docs/LOG_TRABALHO.md`

### Arquivos criados ou alterados

- Alterado `docs/MODELO_DADOS.md`.
- Alterado `docs/SINCRONIZACAO_OFFLINE.md`.
- Alterado `docs/REGRAS_NEGOCIO.md`.
- Alterado `docs/DECISOES.md`.
- Alterado `README.md`.
- Alterado `docs/ROADMAP.md`.
- Alterado `docs/LOG_TRABALHO.md`.

### O que foi feito

- Definida a alocação de uma venda entre vários acertos por quantidade, com limite de integridade e distribuição proporcional do valor acordado.
- Criada a entidade lógica `settlement_item_adjustments` para devoluções, estornos e correções sem apagar histórico.
- Definido o tratamento de devolução em acerto aberto, parcial ou já pago.
- Separada a rejeição de estoque insuficiente comum do conflito de saldo negativo causado por operações offline concorrentes.
- Definido bloqueio por produto e localização enquanto houver conflito aberto, com resolução por owner ou admin.
- Incluídos `waiting_dependency`, `retry_wait` e `failed_transient`, além de prazo de processamento e recuperação de comandos interrompidos.
- Definida retenção mínima de 180 dias para `change_log` e exigência de fotografia completa quando o cursor estiver fora da janela.
- Definida a janela local de 180 dias ou 10.000 operações, dados obrigatórios para continuidade offline e comportamento para armazenamento cheio.
- Marcados o modelo de dados e o protocolo offline como aprovados para o próximo lote técnico.

### Decisões registradas

- Registrada a decisão D-018 sobre integridade de acertos, conflitos e dados offline.
- D-012 e D-014 foram detalhadas com as novas regras operacionais.

### Validação realizada

- Conferida a presença das regras nos quatro documentos de produto, dados e sincronização.
- Removida a duplicidade do estado `retry_wait` na tabela de estados visíveis.
- Conferida a coerência entre `MODELO_DADOS.md`, `SINCRONIZACAO_OFFLINE.md`, `REGRAS_NEGOCIO.md` e `DECISOES.md`.

### Pendências

- Definir nomes físicos finais, tipos SQL, índices, funções transacionais e políticas RLS no próximo lote.
- Manter fora deste lote as decisões comerciais ainda listadas como pendentes.

### Próximo passo recomendado

Iniciar o lote técnico de migrations SQL iniciais, políticas RLS, funções transacionais de estoque/acerto e contratos versionados de sincronização.

## 2026-08-25 — Lote 9: base técnica SQL da V1

### Objetivo do lote

Criar a primeira base técnica versionada da V1, sem banco remoto, credenciais, instalação ou mudança no protótipo visual.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/ROADMAP.md`, `docs/DECISOES.md`, `docs/REGRAS_NEGOCIO.md`
- `docs/MODELO_DADOS.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/LOG_TRABALHO.md` e `docs/ARQUITETURA.md`

### Arquivos criados ou alterados

- Criadas quatro migrations em `supabase/migrations/`.
- Criados contratos JSON versionados em `contracts/sync/v1/`.
- Criados testes estruturais em `tests/`.
- Alterados `README.md`, `docs/ROADMAP.md` e este log.

### O que foi feito

- Criadas estruturas de negócio, catálogo, estoque, operações, acertos, créditos, fila idempotente, conflitos e feed de mudanças.
- Definidas funções para saldo, alocação limitada de vendas, ajuste posterior de acerto, recuperação de processamento e retenção de 180 dias.
- Habilitada RLS e removida escrita direta das tabelas expostas; operações críticas passam por funções controladas.
- Versionados os envelopes, respostas e fotografia completa de sincronização V1.

### Pendências

- Aplicar e executar testes de integração das migrations somente em ambiente local de banco autorizado em lote futuro.
- Definir autenticação por nome de usuário e limites comerciais antes desses respectivos lotes.

### Próximo passo recomendado

Criar ambiente local Supabase/PostgreSQL e testes transacionais reais para validar concorrência, RLS e os fluxos críticos contra o banco.

## 2026-08-31 — Lote 10: fundação da PWA e Home em React

### Objetivo do lote

Iniciar a implementação da Etapa 3 com a fundação do frontend e converter a Home aprovada para React, TypeScript e Vite, mantendo dados mockados e sem conectar backend.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md`, `docs/DECISOES.md` e `docs/REGRAS_NEGOCIO.md`.
- `docs/ROADMAP.md`, `docs/ARQUITETURA.md`, `docs/MODELO_DADOS.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/FLUXOS_V1.md` e `docs/LOG_TRABALHO.md`.
- `prototipo/home.html` e a estrutura de `prototipo/fluxos-v1.html`.

### Arquivos criados ou alterados

- Criada a aplicação frontend em `app/`, incluindo configurações, código React, estilos, dados mockados, ativos da PWA e testes.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Os protótipos aprovados foram preservados sem alteração.

### O que foi feito

- Configurados React, TypeScript, Vite, ESLint e Vitest.
- Implementada a Home aprovada com componentes próprios, sem biblioteca visual.
- Separados os dados mockados da Anona Presentes dos componentes da interface.
- Mantidos resumo de atenção, reposição, produtos acabando, pendências com parceiros, atividades recentes e navegação inferior.
- Implementado o menu radial de Compra, Envio, Venda e Devolução como navegação preparatória, sem criar operações reais.
- Adicionados manifesto, ícone e service worker inicial para a fundação da PWA.
- Adicionadas mensagens explícitas nas áreas reservadas aos próximos lotes.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A interface da V1 será construída inicialmente com componentes próprios, sem biblioteca de componentes.
- O HTML aprovado permanece como referência visual e não foi substituído ou removido.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com três testes aprovados.
- `npm run build` executado com sucesso.
- Home revisada em navegador, preservando a hierarquia visual e a navegação do protótipo aprovado.
- Instalação concluída sem vulnerabilidades conhecidas reportadas pelo npm neste lote.

### Pendências

- Implementar as demais telas e os formulários dos fluxos aprovados.
- Criar armazenamento local e fila offline.
- Validar as migrations em Supabase/PostgreSQL local quando o ambiente estiver disponível.
- Implementar autenticação, licença, integração com o banco e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para converter a tela Estoque aprovada para React e ligar a navegação da Home, ainda com dados mockados e sem antecipar a integração com o banco.

## 2026-08-31 — Lote 11: tela Estoque em React

### Objetivo do lote

Converter a tela Estoque aprovada para React e ligá-la à Home, preservando a consulta compacta e a separação entre estoque próprio e estoque nos Pontos Parceiros.

### Arquivos lidos

- `AGENTS.md`, `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md` e `docs/LOG_TRABALHO.md`.
- `prototipo/fluxos-v1.html`.
- Componentes, estilos, dados e testes existentes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/AppHeader.tsx` e `app/src/components/StockPage.tsx`.
- Criados `app/src/data/stock.ts`, `app/src/types/stock.ts` e `app/src/types/navigation.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/index.css`, `app/src/components/HomePage.tsx` e `app/src/components/BottomNavigation.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Ligados os acessos `Estoque` e `Ver todos` da Home à nova tela.
- Adicionada rota local `#estoque`, sem instalar biblioteca de rotas.
- Implementadas busca e contagem dinâmica de produtos.
- Implementados filtros por Todos, Baixo estoque, Em pontos e Sem estoque.
- Implementadas as visões Lista e Detalhes.
- Preservada a separação entre estoque próprio, quantidades por Ponto Parceiro e estoque total.
- Implementados menu de ações preparatórias e folha de distribuição por produto.
- Adicionados fechamento por botão, fundo ou tecla Escape e bloqueio de rolagem durante a folha de detalhe.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A navegação inicial usa estado React e endereço por fragmento, sem nova dependência.
- Ações que dependem de fluxos futuros continuam informativas e não alteram os dados mockados.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com oito testes aprovados.
- `npm run build` executado com sucesso.
- Dois testes estruturais existentes da base SQL executados com sucesso.
- Tela Estoque revisada em navegador com lista, saldos, filtros e navegação inferior visíveis.

### Pendências

- Converter Pontos Parceiros e Acertos para React.
- Implementar formulários reais de cadastro e movimentação.
- Criar armazenamento local, integração com banco, autenticação e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para converter a tela Pontos Parceiros aprovada para React e ligar sua navegação, ainda com dados mockados.

## 2026-09-01 — Lote 12: tela Pontos Parceiros em React

### Objetivo do lote

Converter a tela Pontos Parceiros aprovada para React e ligá-la à Home e à navegação inferior, preservando a consulta compacta e a distinção entre mercadorias, vendas, envios, devoluções e acertos.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/DECISOES.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md` e `prototipo/fluxos-v1.html`.
- Componentes, estilos, dados, tipos e testes existentes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/PartnerPage.tsx`, `app/src/data/partners.ts` e `app/src/types/partner.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/HomePage.tsx`, `app/src/components/BottomNavigation.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligados os acessos de pendências da Home e o item Parceiros da navegação inferior à nova tela.
- Adicionada rota local `#parceiros`, sem instalar biblioteca de rotas.
- Implementadas busca e contagem dinâmica de Pontos Parceiros.
- Implementados filtros por Todos, Com pendência e Sem atualização.
- Implementadas as visões Lista e Detalhes.
- Preservadas as informações de mercadorias no ponto, responsável, situação e valor a conferir.
- Implementados menu de ações preparatórias e folha inferior com mercadorias e situação de cada ponto.
- Adicionados fechamento da folha por botão, fundo ou tecla Escape e bloqueio de rolagem durante sua exibição.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A consulta segue os componentes próprios e a navegação por fragmento adotados nos lotes anteriores.
- Ações que dependem de formulários futuros continuam informativas e não alteram os dados mockados.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com quatorze testes aprovados.
- `npm run build` executado com sucesso.
- Busca, filtros, alternância de visualização, menu de ações, folha de detalhes e navegação cobertos pelos testes do frontend.

### Pendências

- Converter a tela Acertos para React.
- Implementar formulários reais de cadastro e movimentação.
- Criar armazenamento local, integração com banco, autenticação e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para converter a tela Acertos aprovada para React e ligar sua navegação, ainda com dados mockados.

## 2026-09-01 — Lote 13: tela Acertos em React

### Objetivo do lote

Converter a tela Acertos aprovada para React e ligá-la à navegação inferior, preservando a separação entre valor calculado, valor acordado, valor pago e valor pendente.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md` e `prototipo/fluxos-v1.html`.
- Componentes, estilos, dados, tipos e testes existentes em `app/src/`, incluindo a implementação do Lote 12.

### Arquivos criados ou alterados

- Criados `app/src/components/SettlementPage.tsx`, `app/src/data/settlements.ts` e `app/src/types/settlement.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/BottomNavigation.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligado o item Acertos da navegação inferior à nova tela.
- Adicionada rota local `#acertos`, sem instalar biblioteca de rotas.
- Implementadas busca por parceiro e contagem dinâmica de acertos.
- Implementados filtros por Todos, Em aberto, Parcial e Pagos, incluindo estado vazio quando não há exemplo mockado.
- Implementadas as visões Lista e Detalhes.
- Preservados separadamente valor calculado, valor acordado, valor já pago e valor que falta acertar.
- Mantida visível a venda que originou cada pendência.
- Implementados menu de ações preparatórias e folha inferior com o resumo completo do acerto.
- Adicionados fechamento da folha por botão, fundo ou tecla Escape e bloqueio de rolagem durante sua exibição.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A consulta segue os componentes próprios e a navegação por fragmento adotados nos lotes anteriores.
- Registro de pagamento, acerto parcial, pagamento total e histórico permanecem informativos até os lotes dos formulários reais.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com dezenove testes aprovados.
- `npm run build` executado com sucesso.
- Busca, filtros, estado vazio, alternância de visualização, valores financeiros, menu de ações, folha de detalhes e navegação cobertos pelos testes do frontend.

### Pendências

- Implementar formulários reais de cadastro e movimentação.
- Criar armazenamento local e fila offline.
- Conectar banco, autenticação e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para implementar o primeiro formulário real de movimentação aprovado, ainda com dados mockados e sem antecipar persistência ou sincronização.

## 2026-09-01 — Lote 14: formulário de Compra em React

### Objetivo do lote

Implementar o primeiro formulário editável de movimentação da V1 para conferir e simular uma Compra, mantendo dados mockados e sem persistência, backend ou sincronização.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md` e `prototipo/fluxos-v1.html`.
- Dados, tipos, navegação, componentes, estilos e testes existentes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/PurchasePage.tsx`, `app/src/data/purchase.ts` e `app/src/types/purchase.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/BottomNavigation.tsx`, `app/src/components/StockPage.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligada a ação Compra do menu radial Registrar ao novo formulário.
- Ligada a ação Registrar compra do menu de cada produto no Estoque ao mesmo fluxo.
- Adicionada rota local `#registrar-compra`, sem instalar biblioteca de rotas.
- Implementados campos editáveis de produto, fornecedor, quantidade, custo unitário e data.
- Mantido o destino explícito como Estoque próprio.
- Implementadas validações para fornecedor, quantidade inteira positiva, custo positivo e data.
- Implementado cálculo imediato do saldo projetado de estoque próprio conforme produto e quantidade.
- Implementada confirmação com resumo da compra, efeito projetado e opção de repetir o fluxo.
- Exibidos avisos claros antes e depois da confirmação de que os dados são mockados e não foram salvos no banco.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A Compra é o primeiro formulário editável dos fluxos de movimentação.
- A confirmação deste lote é uma simulação e não altera permanentemente os dados mockados.
- Os fluxos Envio, Venda e Devolução permanecem informativos até seus lotes próprios.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com vinte e quatro testes aprovados.
- `npm run build` executado com sucesso.
- Abertura pelas duas entradas, preenchimento inicial, recálculo do saldo, validação obrigatória e confirmação não persistida cobertos pelos testes do frontend.

### Pendências

- Implementar os formulários de Envio, Venda, Devolução e pagamento de Acerto.
- Definir em lote próprio quando os formulários passarão a alterar estado local persistido.
- Criar fila offline, integração com banco, autenticação e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para implementar o formulário de Envio com dados mockados, preservando a distinção entre transferência para Ponto Parceiro e venda.

## 2026-09-01 — Lote 15: formulário de Envio em React

### Objetivo do lote

Implementar o formulário editável de Envio para simular a transferência de mercadoria do estoque próprio para um Ponto Parceiro, sem confundir envio com venda e sem persistência, backend ou sincronização.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md` e `prototipo/fluxos-v1.html`.
- Dados de estoque e parceiros, navegação, componentes, estilos e testes existentes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/ShippingPage.tsx`, `app/src/data/shipping.ts` e `app/src/types/shipping.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/BottomNavigation.tsx`, `app/src/components/PartnerPage.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligada a ação Envio do menu radial Registrar ao novo formulário.
- Ligadas as ações Registrar envio e Registrar novo envio da tela Pontos Parceiros ao mesmo fluxo.
- Adicionada rota local `#registrar-envio`, sem instalar biblioteca de rotas.
- Implementados campos editáveis de Ponto Parceiro, produto, quantidade e data.
- Mantidas origem e destino visíveis como Estoque próprio e Ponto Parceiro selecionado.
- Implementadas validações para quantidade inteira positiva, data e saldo suficiente no estoque próprio.
- Implementado bloqueio da simulação quando a quantidade supera o saldo mockado disponível.
- Implementado cálculo imediato da redução no estoque próprio e do aumento no parceiro.
- Quando aberto pela ação de um parceiro, o formulário inicia com esse destino selecionado.
- Implementada confirmação com resumo, efeito projetado e opção de repetir o fluxo.
- Reforçado antes e depois da confirmação que envio não é venda e que os dados não foram persistidos.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Envio permanece uma transferência entre localizações e não cria venda ou acerto.
- A confirmação deste lote é uma simulação e não altera permanentemente os dados mockados.
- Saldo insuficiente impede a confirmação, evitando projeção de estoque próprio negativo em operação comum.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com vinte e nove testes aprovados.
- `npm run build` executado com sucesso.
- Abertura pelas duas entradas, seleção prévia do parceiro, cálculo dos dois saldos, bloqueio por saldo insuficiente e confirmação não persistida cobertos pelos testes do frontend.

### Pendências

- Implementar os formulários de Venda, Devolução e pagamento de Acerto.
- Definir em lote próprio quando os formulários passarão a alterar estado local persistido.
- Criar fila offline, integração com banco, autenticação e sincronização em lotes próprios.

### Próximo passo recomendado

Planejar um lote pequeno para implementar o formulário de Venda com dados mockados, distinguindo venda direta de venda em Ponto Parceiro e seus efeitos sobre estoque e acerto.

## 2026-09-01 — Lote 16: formulário de Venda em React

### Objetivo do lote

Implementar o formulário editável de Venda com dados mockados, distinguindo venda direta de venda em Ponto Parceiro e mostrando seus efeitos diferentes sobre estoque e acerto.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/DECISOES.md`, `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `prototipo/fluxos-v1.html` e os componentes, dados, tipos, estilos e testes relevantes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/SalePage.tsx`, `app/src/data/sale.ts` e `app/src/types/sale.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/BottomNavigation.tsx`, `app/src/components/PartnerPage.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligada a ação Venda do menu radial Registrar ao novo formulário.
- Ligada a ação Registrar venda da tela Pontos Parceiros ao mesmo fluxo, com o parceiro de origem previamente selecionado.
- Adicionada rota local `#registrar-venda`, sem instalar biblioteca de rotas.
- Implementada alternância entre venda em Ponto Parceiro e venda direta.
- Implementados campos de parceiro, produto, quantidade, preço usado e data conforme o canal.
- Preenchido preço sugerido por produto, mantendo o campo editável para a simulação.
- Implementadas validações de quantidade, saldo disponível na origem, preço positivo e data.
- Implementados cálculo do valor total e projeção da baixa no estoque da origem.
- Venda em parceiro projeta pendência de acerto; venda direta informa explicitamente que não cria acerto.
- Implementada confirmação com resumo, efeito projetado e opção de repetir o fluxo, sem persistir dados.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Venda direta e venda em Ponto Parceiro permanecem canais distintos.
- Venda informada pelo parceiro não representa pagamento recebido e cria pendência de acerto.
- O preço efetivamente usado na simulação pode diferir do preço sugerido.
- Conflito offline concorrente permanece fora deste formulário mockado e será tratado junto da persistência e sincronização.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com trinta e cinco testes aprovados.
- `npm run build` executado com sucesso.
- Os dois canais, preço editável, saldo da origem, bloqueio por saldo insuficiente, cálculo do acerto e confirmação não persistida foram cobertos pelos testes do frontend.

### Pendências

- Implementar os formulários de Devolução e pagamento de Acerto.
- Implementar o cenário de conflito offline concorrente no lote de estado local e sincronização.
- Definir em lote próprio quando os formulários passarão a alterar estado local persistido.

### Próximo passo recomendado

Planejar um lote pequeno para implementar o formulário de Devolução com dados mockados, transferindo mercadoria do Ponto Parceiro de volta ao estoque próprio sem tratar a operação como venda cancelada.

## 2026-09-01 — Lote 17: formulário de Devolução em React

### Objetivo do lote

Implementar o formulário editável de Devolução com dados mockados, transferindo mercadoria do Ponto Parceiro de volta ao estoque próprio sem tratar a operação como venda cancelada.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `prototipo/fluxos-v1.html` e os dados, componentes, tipos, navegação e testes relevantes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/ReturnPage.tsx`, `app/src/data/return.ts` e `app/src/types/return.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.test.tsx`, `app/src/components/BottomNavigation.tsx`, `app/src/components/PartnerPage.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligada a ação Devolução do menu radial Registrar ao novo formulário.
- Ligada a ação Registrar devolução da visão detalhada do parceiro ao mesmo fluxo, com a origem previamente selecionada.
- Adicionada rota local `#registrar-devolucao`, sem instalar biblioteca de rotas.
- Implementados campos editáveis de Ponto Parceiro, produto, quantidade e data.
- Mantidos origem e destino visíveis como Ponto Parceiro selecionado e Estoque próprio.
- Exibido o saldo de cada produto no parceiro dentro da seleção.
- Implementadas validações de quantidade inteira positiva, data e saldo suficiente no parceiro.
- Implementado cálculo imediato da redução no parceiro e do aumento no estoque próprio.
- Implementada confirmação com resumo, efeito projetado e opção de repetir o fluxo, sem persistir dados.
- Reforçado antes e depois da confirmação que devolução é movimentação de volta e não venda cancelada.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Devolução permanece uma movimentação própria e distinta de venda, estorno ou cancelamento.
- A confirmação deste lote é uma simulação e não altera permanentemente os dados mockados.
- Ajustes financeiros de devoluções posteriores a acertos permanecem para o lote de persistência e regras transacionais.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com quarenta testes aprovados.
- `npm run build` executado com sucesso.
- Abertura pelas duas entradas, origem contextual, cálculo dos saldos, bloqueio por saldo insuficiente e confirmação não persistida cobertos pelos testes do frontend.

### Pendências

- Implementar o formulário de pagamento de Acerto.
- Implementar ajustes financeiros de devoluções posteriores a acertos quando houver estado persistido.
- Definir em lote próprio quando os formulários passarão a alterar estado local persistido.

### Próximo passo recomendado

Planejar um lote pequeno para implementar o formulário de pagamento de Acerto com dados mockados, permitindo pagamento parcial ou total sem apagar o histórico das vendas.

## 2026-09-01 — Lote 18: formulário de pagamento de Acerto em React

### Objetivo do lote

Implementar o formulário editável de pagamento de Acerto com dados mockados, permitindo pagamento parcial ou total e preservando separadamente valores, venda vinculada e histórico.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/DECISOES.md`, `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `prototipo/fluxos-v1.html` e os componentes, dados, tipos, navegação e testes de Acertos em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/SettlementPaymentPage.tsx`, `app/src/data/settlementPayment.ts` e `app/src/types/settlementPayment.ts`.
- Alterados `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/components/SettlementPage.tsx` e `app/src/types/navigation.ts`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- O protótipo aprovado foi preservado sem alteração.

### O que foi feito

- Ligada a ação Registrar pagamento do menu de cada acerto ao novo formulário.
- Ligados os botões Registrar acerto parcial e Registrar pagamento total da visão detalhada ao mesmo fluxo.
- Adicionada rota local `#registrar-pagamento`, sem instalar biblioteca de rotas.
- Implementada seleção do acerto com parceiro e venda vinculada.
- Implementada alternância entre pagamento parcial e total.
- Mantidos separados valor calculado, valor acordado, valor já pago, pagamento atual e saldo restante.
- Mantido o valor acordado editável e adicionada justificativa opcional para diferença.
- Implementadas validações para valores positivos, acordo não inferior ao já pago, pagamento não superior ao saldo e data obrigatória.
- Implementado cálculo imediato do saldo antes e depois do pagamento.
- Implementada confirmação com resumo, efeito projetado e opção de repetir, sem persistir dados.
- Reforçado que o pagamento não apaga a venda vinculada nem o histórico do acerto.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Pagamentos parciais e totais seguem o mesmo fluxo e preservam a venda de origem.
- Pagamento acima do saldo acordado é bloqueado neste formulário mockado; confirmação especial e conflito rastreável permanecem para o lote transacional.
- A confirmação deste lote é uma simulação e não altera permanentemente os dados mockados.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com quarenta e seis testes aprovados.
- `npm run build` executado com sucesso.
- Entradas por lista e detalhes, troca de acerto, modos parcial e total, valores separados, bloqueio de excedente e preservação do histórico cobertos pelos testes do frontend.

### Pendências

- Criar estado local persistido para substituir confirmações somente simuladas.
- Implementar fila offline, comandos idempotentes e estados visíveis de sincronização.
- Conectar banco, autenticação e sincronização em lotes próprios.
- Implementar distribuição transacional entre itens, ajustes posteriores e pagamento excedente no banco.

### Próximo passo recomendado

Revisar a arquitetura e o protocolo offline aprovados para planejar um lote pequeno de estado local e fila de comandos, sem conectar ainda o banco remoto.

## 2026-09-01 — Lote 19: fundação IndexedDB e outbox local

### Objetivo do lote

Criar a fundação versionada do banco local e da fila de comandos offline, compatível com a arquitetura e o contrato de sincronização aprovados, sem conectar ainda os formulários ou o banco remoto.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/ARQUITETURA.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/MODELO_DADOS.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- `contracts/sync/v1/command-envelope.schema.json`, configurações e estrutura de testes do frontend.

### Arquivos criados ou alterados

- Criados `app/src/services/localDatabase.ts`, `app/src/services/localDatabase.test.ts` e `app/src/types/sync.ts`.
- Alterado `app/src/test/setup.ts`.
- Alterados `app/package.json` e `app/package-lock.json` pela inclusão de `fake-indexeddb` como dependência de desenvolvimento.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criado banco IndexedDB `maria-controla-local` na versão 1.
- Criados os armazenamentos `local_meta`, `catalog_cache`, `operations_cache`, `balances_cache`, `outbox`, `local_conflicts` e `sync_history`.
- Criados índices iniciais para operações, estados da fila, sequência do aparelho, criação local, conflitos e histórico.
- Tipado o envelope de comandos conforme o contrato v1 existente.
- Implementados UUID local, `payload_version` 1, dependências, versões-base, tentativas e estados aprovados.
- Implementada gravação atômica do comando e do próximo `device_sequence` por negócio e aparelho.
- Implementadas listagem ordenada e contagem da outbox.
- Centralizados os textos visíveis de todos os estados de sincronização.
- Adicionado `fake-indexeddb` somente ao ambiente de testes, sem dependência adicional em produção.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A implementação usa diretamente a API IndexedDB do navegador, sem biblioteca de produção.
- `pending_files` permanece fora da primeira implementação porque anexos ainda não entraram no produto.
- Comandos começam em `queued`, exibido como `Salvo neste aparelho`.
- Os formulários ainda não gravam comandos porque identidade de negócio, usuário e aparelho será tratada no próximo lote apropriado.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test` executado com quarenta e nove testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Esquema, stores obrigatórios, UUID, sequência crescente e independente por aparelho, dependências, contagem e textos de estado cobertos por testes reais de IndexedDB.
- Instalação concluída sem vulnerabilidades conhecidas reportadas pelo npm neste lote.

### Pendências

- Definir a identidade usada antes de conectar os formulários à outbox.
- Criar projeções locais e atualizar consultas a partir dos comandos pendentes.
- Implementar processamento da fila, integração com banco, autenticação e sincronização.

### Próximo passo recomendado

Definir se a próxima integração usará um modo de demonstração local explicitamente identificado ou se começará pela autenticação e pelo contexto real de negócio, usuário e aparelho.

## 2026-09-01 — Lote 20: Compra conectada à outbox local

### Objetivo do lote

Criar uma identidade temporária e explícita para a demonstração local e fazer o formulário de Compra gravar um comando pendente no IndexedDB, sem apresentar a operação como sincronizada.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/DECISOES.md`, `docs/ARQUITETURA.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Contratos, tipos, serviços, formulário de Compra, estilos e testes relevantes em `app/src/`.

### Arquivos criados ou alterados

- Criado `app/src/services/demoIdentity.ts`.
- Alterados `app/src/services/localDatabase.ts`, `app/src/services/localDatabase.test.ts`, `app/src/components/PurchasePage.tsx`, `app/src/types/purchase.ts`, `app/src/App.css` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/DECISOES.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criados identificadores fictícios e estáveis para negócio e usuário no modo de demonstração.
- Criado um identificador UUID do aparelho na primeira utilização e preservado no armazenamento `local_meta`.
- Adicionado ao serviço local o recurso atômico de consultar ou criar um metadado persistente.
- Conectada a confirmação de Compra ao comando `purchase.confirm` da outbox.
- Incluídos no comando produto, fornecedor, quantidade, custo unitário em centavos, data, destino e identificador próprio da compra.
- Mantida a sequência crescente por aparelho já criada no lote anterior.
- Alterado o retorno visual para `Salvo neste aparelho`, deixando explícito que a operação ainda não foi enviada ao banco central.
- Bloqueada a conclusão visual quando a gravação local falha, preservando o formulário para nova tentativa.
- Mantidos os demais fluxos como simulações, sem ampliar o escopo deste lote.

### Decisões registradas

- A identidade fictícia é exclusiva da demonstração e será substituída pela identidade autenticada antes do uso real.
- O identificador do aparelho é persistente no IndexedDB; negócio e usuário usam identificadores fixos e claramente reservados ao modo de demonstração.
- Uma Compra só aparece como concluída quando seu comando foi persistido com sucesso na outbox.
- `queued` continua sendo exibido como `Salvo neste aparelho`, sem alegar sincronização inexistente.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Persistência do identificador do aparelho, identidade fictícia, conteúdo do comando de Compra e estado visual pendente cobertos por testes automatizados.

### Pendências

- Conectar Envio, Venda, Devolução e pagamento de Acerto à outbox local.
- Criar projeções locais para refletir os comandos pendentes nas consultas e saldos mockados.
- Substituir a identidade de demonstração pela autenticação e pelo contexto real antes da integração remota.
- Implementar processamento da fila, banco central e sincronização.

### Próximo passo recomendado

Conectar o formulário de Envio à outbox local usando a mesma identidade de demonstração, preservando a validação de saldo e deixando explícito que a transferência está salva somente no aparelho.

## 2026-09-01 — Lote 21: Envio conectado à outbox local

### Objetivo do lote

Fazer o formulário de Envio gravar uma transferência pendente no IndexedDB usando a identidade local de demonstração, sem confundir envio com venda ou apresentar a operação como sincronizada.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/FLUXOS_V1.md`, `docs/MODELO_DADOS.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Contrato de sincronização, dados, tipos, componente e testes do fluxo de Envio em `app/src/`.

### Arquivos criados ou alterados

- Alterados `app/src/services/demoIdentity.ts`, `app/src/components/ShippingPage.tsx`, `app/src/types/shipping.ts` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Adicionados identificadores fictícios estáveis para estoque próprio, Pontos Parceiros e suas localizações.
- Conectada a confirmação de Envio ao comando `transfer.confirm` da outbox local.
- Gravados no comando identificador próprio da transferência, tipo `send_to_partner`, origem, destino, parceiro, produto, quantidade e data.
- Preservadas as validações de quantidade inteira, data e saldo suficiente no estoque próprio antes da persistência.
- Alterado o retorno visual para `Salvo neste aparelho`, deixando explícito que a transferência ainda não foi enviada ao banco central.
- Mantida visível a explicação de que Envio não é Venda.
- Bloqueada a conclusão visual quando a gravação local falha, preservando o formulário para nova tentativa.
- Mantidos Venda, Devolução e pagamento de Acerto como simulações neste lote.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Envio usa o comando de transferência e o tipo `send_to_partner`, não o comando de Venda.
- O resultado só aparece depois que a transferência foi persistida na outbox.
- Os saldos mostrados permanecem projeções calculadas sobre os dados mockados até o lote específico de projeções locais.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Validação de saldo, conteúdo do comando, distinção entre Envio e Venda e estado local pendente cobertos por testes automatizados.

### Pendências

- Conectar Venda, Devolução e pagamento de Acerto à outbox local.
- Criar projeções locais para refletir Compras e Envios pendentes nas consultas e validações seguintes.
- Substituir a identidade de demonstração antes do uso real.
- Implementar processamento da fila, banco central, autenticação e sincronização.

### Próximo passo recomendado

Conectar o formulário de Venda à outbox local, tratando separadamente venda direta e venda em Ponto Parceiro e preservando o efeito financeiro apenas no segundo canal.

## 2026-09-01 — Lote 22: Venda conectada à outbox local

### Objetivo do lote

Fazer os canais de Venda direta e Venda em Ponto Parceiro gravarem comandos pendentes no IndexedDB, preservando origem, preço histórico e efeito financeiro distintos.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/MODELO_DADOS.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Migration transacional de Venda, contrato de sincronização, dados, tipos, componente e testes do fluxo em `app/src/`.

### Arquivos criados ou alterados

- Alterados `app/src/components/SalePage.tsx`, `app/src/types/sale.ts` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Conectada a confirmação dos dois canais ao comando `sale.confirm` da outbox local.
- Gravados no comando identificador da venda, canal, localização de origem, parceiro quando aplicável, data e item vendido.
- Preservados por item produto, quantidade, preço sugerido, preço efetivamente usado, total em centavos e origem manual do preço.
- Venda direta usa a localização do estoque próprio e não inclui Ponto Parceiro.
- Venda no parceiro usa a localização e o identificador do parceiro e mantém visível que cria valor para acerto, sem tratar isso como pagamento.
- Preservadas as validações de saldo, quantidade, preço positivo e data antes da persistência.
- Alterado o retorno visual dos dois canais para `Salvo neste aparelho`, sem alegar envio ao banco central.
- Bloqueada a conclusão visual quando a gravação local falha.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Os dois canais compartilham `sale.confirm`, diferenciados pelo campo `sale_channel` e pela presença do parceiro.
- O preço digitado fica preservado em centavos no item do comando.
- A pendência de acerto ainda é um efeito projetado; sua consulta será atualizada no lote de projeções locais.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Origem própria sem parceiro, origem no parceiro, preço histórico, efeito financeiro e estado local pendente cobertos por testes automatizados.

### Pendências

- Conectar Devolução e pagamento de Acerto à outbox local.
- Criar projeções locais para refletir comandos pendentes em Estoque, Parceiros e Acertos.
- Substituir a identidade de demonstração antes do uso real.
- Implementar processamento da fila, banco central, autenticação e sincronização.

### Próximo passo recomendado

Conectar o formulário de Devolução à outbox local como transferência `return_from_partner`, preservando a distinção entre devolução, venda cancelada e ajuste financeiro posterior.

## 2026-09-01 — Lote 23: Devolução conectada à outbox local

### Objetivo do lote

Fazer o formulário de Devolução gravar uma transferência pendente do Ponto Parceiro ao estoque próprio, sem transformar a operação em venda cancelada ou antecipar ajustes financeiros.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/MODELO_DADOS.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Contrato de sincronização, dados, tipos, componente e testes do fluxo de Devolução em `app/src/`.

### Arquivos criados ou alterados

- Alterados `app/src/components/ReturnPage.tsx`, `app/src/types/return.ts` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Conectada a confirmação de Devolução ao comando `transfer.confirm` da outbox local.
- Gravados no comando identificador da transferência, tipo `return_from_partner`, origem no parceiro, destino no estoque próprio, parceiro, produto, quantidade e data.
- Preservadas as validações de quantidade inteira, data e saldo disponível na localização do parceiro.
- Alterado o retorno visual para `Salvo neste aparelho`, deixando explícito que a transferência ainda não foi enviada ao banco central.
- Mantida a explicação de que Devolução é movimentação de volta e não cancelamento de Venda.
- Bloqueada a conclusão visual quando a gravação local falha.
- Mantidos ajustes financeiros posteriores e projeções fora deste lote.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Devolução compartilha o comando de transferência com Envio, mas usa o tipo e o trajeto inversos.
- O evento físico não apaga nem modifica uma Venda anterior.
- Eventual reflexo em Acerto permanece como ajuste rastreável a ser implementado em lote transacional próprio.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Validação de saldo, trajeto inverso, conteúdo do comando, preservação da Venda e estado local pendente cobertos por testes automatizados.

### Pendências

- Conectar pagamento de Acerto à outbox local.
- Criar projeções locais para refletir comandos pendentes em Estoque, Parceiros e Acertos.
- Implementar ajustes financeiros rastreáveis para devolução posterior a Acerto.
- Substituir a identidade de demonstração e implementar processamento da fila, banco central e sincronização.

### Próximo passo recomendado

Conectar o pagamento de Acerto à outbox local, preservando valor calculado, acordado, já pago e pagamento atual sem apagar as vendas vinculadas.

## 2026-09-01 — Lote 24: pagamento de Acerto conectado à outbox local

### Objetivo do lote

Fazer o pagamento parcial ou total de Acerto gravar um comando pendente no IndexedDB, preservando valores separados e o vínculo histórico sem modificar a Venda de origem.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/MODELO_DADOS.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Contrato de sincronização, migration de pagamentos, dados, tipos, componente e testes do fluxo em `app/src/`.

### Arquivos criados ou alterados

- Alterados `app/src/services/demoIdentity.ts`, `app/src/components/SettlementPaymentPage.tsx`, `app/src/types/settlementPayment.ts` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Adicionados identificadores fictícios estáveis para os Acertos da demonstração.
- Conectada a confirmação ao comando `settlement.payment` da outbox local.
- Gravados no comando identificadores de pagamento, Acerto e parceiro, referência textual da Venda, modo parcial ou total, data e valores em centavos.
- Preservados separadamente valor calculado, valor acordado, valor já pago e pagamento atual.
- Preservada a justificativa da diferença quando preenchida.
- Mantidas as validações de valor positivo, acordo não inferior ao já pago, pagamento não superior ao saldo e data obrigatória.
- Alterado o retorno visual para `Salvo neste aparelho`, sem alegar envio ao banco central.
- Mantidas visíveis a nova situação do saldo e a explicação de que o pagamento não apaga a Venda nem o histórico.
- Bloqueada a conclusão visual quando a gravação local falha.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- O envelope preserva o valor acordado editável e a justificativa para que o futuro processador aplique as regras de forma transacional.
- Pagamento excedente continua bloqueado; confirmação especial e conflito rastreável permanecem para lote futuro.
- A consulta de Acertos ainda não aplica o comando pendente até a implementação das projeções locais.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta testes aprovados em dois arquivos.
- `npm run build` executado com sucesso.
- Valores separados, vínculo histórico, conteúdo do comando, bloqueio de excedente e estado local pendente cobertos por testes automatizados.

### Pendências

- Criar projeções locais para refletir os cinco fluxos pendentes em Estoque, Parceiros e Acertos.
- Implementar distribuição transacional entre itens e pagamento excedente com confirmação especial.
- Substituir a identidade de demonstração antes do uso real.
- Implementar processamento da fila, banco central, autenticação e sincronização.

### Próximo passo recomendado

Criar uma camada de projeções locais de estoque que aplique Compra, Envio, Venda e Devolução pendentes sobre os dados mockados, sem alterar a fonte-base e sem tratar o resultado como saldo confirmado no servidor.

## 2026-09-01 — Lote 25: projeção local na consulta de Estoque

### Objetivo do lote

Aplicar as movimentações físicas pendentes da outbox sobre uma cópia dos dados mockados na tela Estoque, distinguindo saldo estimado de saldo confirmado e preservando a fonte-base.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Dados, tipos, componente, estilos, serviço IndexedDB e testes de Estoque em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/services/stockProjection.ts` e `app/src/services/stockProjection.test.ts`.
- Alterados `app/src/components/StockPage.tsx`, `app/src/App.css` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criada função pura que clona a base mockada antes de calcular saldos locais.
- Aplicados comandos pendentes de Compra, Envio, Devolução, Venda direta e Venda em Ponto Parceiro.
- Mantidas transferências balanceadas entre origem e destino na mesma projeção.
- Ignorados comandos financeiros, rejeitados ou com payload físico desconhecido.
- Recalculados estado, rótulo e orientação de estoque próprio a partir do saldo estimado.
- Conectada a tela Estoque à leitura da outbox no IndexedDB.
- Exibido aviso com a quantidade de movimentações locais incluídas.
- Alterados rótulos para `Meu estoque estimado` e `Estoque total estimado` enquanto houver movimentos locais.
- Mantida a base mockada se a leitura falhar, com aviso explícito de que os movimentos do aparelho não puderam ser incluídos.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A projeção é derivada e imutável; a fonte-base não é reescrita por comandos pendentes.
- Estados locais ativos e conflito preservado participam da projeção; comandos aceitos ou rejeitados não são aplicados pela outbox.
- A tela não chama saldo estimado de confirmado.
- Pagamentos de Acerto não alteram estoque e são ignorados por esta camada.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta e três testes aprovados em três arquivos.
- `npm run build` executado com sucesso.
- Sequência de Compra, Envio, Venda e Devolução, imutabilidade da base, exclusão de comandos financeiros/rejeitados e integração visual cobertas por testes automatizados.

### Pendências

- Usar a projeção nas validações dos formulários para impedir consumo repetido do mesmo saldo no aparelho.
- Projetar saldos e atividades na consulta de Pontos Parceiros.
- Projetar pagamentos pendentes na consulta de Acertos.
- Implementar autenticação, banco central e sincronização.

### Próximo passo recomendado

Criar um carregador reutilizável do estoque estimado e usá-lo em Envio, Venda e Devolução antes da validação e da gravação, para que operações consecutivas no mesmo aparelho respeitem os comandos já pendentes.

## 2026-09-01 — Lote 26: saldo estimado nas validações físicas

### Objetivo do lote

Fazer Envio, Venda e Devolução validarem e calcularem seus efeitos com o estoque estimado, incluindo os comandos físicos já pendentes no aparelho.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Camada de projeção, serviço IndexedDB, tela Estoque, componentes e testes dos três fluxos físicos em `app/src/`.

### Arquivos criados ou alterados

- Criado `app/src/hooks/useEstimatedStock.ts`.
- Alterados `app/src/services/stockProjection.ts`, `app/src/components/StockPage.tsx`, `app/src/components/ShippingPage.tsx`, `app/src/components/SalePage.tsx`, `app/src/components/ReturnPage.tsx` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criado carregador reutilizável que combina a base mockada com a outbox atual.
- Criado hook compartilhado para estado de carregamento, saldo estimado, quantidade de movimentos locais, erro e recarga.
- Migrada a tela Estoque para o mesmo carregador usado pelos formulários.
- Envio passou a validar o estoque próprio estimado.
- Venda direta passou a validar o estoque próprio estimado; Venda em parceiro passou a validar o saldo estimado daquela localização.
- Devolução passou a validar o saldo estimado no parceiro.
- O botão de salvar fica bloqueado durante a conferência local e quando o saldo não pode ser lido com segurança.
- A projeção é recarregada depois da persistência, permitindo repetir o formulário com o novo saldo local.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A operação não pode ser confirmada antes de a leitura da outbox terminar.
- Falha ao conferir o saldo bloqueia o lançamento em vez de usar silenciosamente a base antiga.
- Compra ficou fora deste lote porque aumenta estoque; seu efeito acumulado no próprio formulário poderá ser refinado em lote posterior.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta e três testes aprovados em três arquivos.
- `npm run build` executado com sucesso.
- Um Envio repetido usa o saldo resultante do primeiro comando pendente e bloqueia quantidade superior ao saldo estimado.
- Testes existentes de saldo, canais de Venda, trajeto de Devolução e persistência continuaram aprovados.

### Pendências

- Projetar mercadorias e atividades pendentes na consulta de Pontos Parceiros.
- Projetar pagamentos pendentes na consulta de Acertos.
- Refinar Compra repetida para mostrar o estoque estimado acumulado no formulário.
- Implementar autenticação, banco central e sincronização.

### Próximo passo recomendado

Aplicar a projeção de estoque já existente à consulta de Pontos Parceiros, substituindo quantidades estáticas por saldos estimados e identificando visualmente as movimentações ainda salvas somente no aparelho.

## 2026-09-01 — Lote 27: quantidades estimadas em Pontos Parceiros

### Objetivo do lote

Aplicar os saldos físicos estimados à consulta de Pontos Parceiros, atualizando totais e mercadorias por ponto sem recalcular ou misturar os valores financeiros mockados.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Dados, tipos, componente e testes de Pontos Parceiros, além do carregador de estoque estimado em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/services/partnerProjection.ts` e `app/src/services/partnerProjection.test.ts`.
- Alterados `app/src/components/PartnerPage.tsx` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criada projeção derivada de cada Ponto Parceiro a partir dos produtos e localizações do estoque estimado.
- Recalculado o total de mercadorias por parceiro.
- Reconstruída a lista de produtos e quantidades de cada ponto, incluindo apenas saldos diferentes de zero.
- Preservados os detalhes não físicos, como `Valor a conferir` e `Situação`.
- Alterado o rótulo para `Mercadorias estimadas no ponto` quando houver movimentos locais.
- Exibido aviso com a quantidade de movimentações salvas no aparelho consideradas na consulta.
- Adicionado aviso de falha caso a outbox não possa ser lida.
- Mantidos filtros, busca, ações e folha de detalhes existentes.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Quantidades físicas e valores financeiros permanecem separados nesta etapa.
- Um Envio, uma Venda no parceiro ou uma Devolução pendente pode alterar as quantidades estimadas sem reescrever o valor mockado do Acerto.
- A fonte-base de parceiros permanece imutável.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta e cinco testes aprovados em quatro arquivos.
- `npm run build` executado com sucesso.
- Imutabilidade, preservação dos detalhes financeiros e integração de um Envio pendente no parceiro correto cobertas por testes automatizados.

### Pendências

- Projetar pagamentos pendentes na consulta de Acertos.
- Projetar a pendência financeira criada por uma Venda no parceiro.
- Criar uma visão consolidada das operações ainda salvas somente no aparelho.
- Implementar autenticação, banco central e sincronização.

### Próximo passo recomendado

Criar uma projeção local de Acertos que aplique pagamentos pendentes aos valores já pagos e aos saldos restantes, preservando valor calculado, valor acordado e venda vinculada.

## 2026-09-01 — Lote 28: pagamentos estimados na consulta de Acertos

### Objetivo do lote

Aplicar pagamentos pendentes da outbox aos Acertos mockados, recalculando valor já pago, saldo restante e situação sem apagar ou modificar a Venda vinculada.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/MODELO_DADOS.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Dados, tipos, componente e testes de Acertos e pagamento, serviço IndexedDB e identidade demo em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/services/settlementProjection.ts` e `app/src/services/settlementProjection.test.ts`.
- Alterados `app/src/components/SettlementPage.tsx` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Criada projeção derivada dos Acertos existentes e dos comandos `settlement.payment` ainda ativos na outbox.
- Somados pagamentos pendentes ao valor já pago da base.
- Preservados separadamente valor calculado, valor acordado, valor já pago e saldo restante.
- Utilizado o valor acordado presente no comando mais recente para refletir a edição feita no formulário.
- Recalculados estados aberto, parcial e pago.
- Alterados rótulos para `Já pago estimado`, `Falta acertar estimado` e situação estimada quando houver pagamento local.
- Removida a ação de registrar novo pagamento na visão detalhada quando o saldo estimado chegou a zero, mantendo acesso ao histórico preparado.
- Exibido aviso com a quantidade de pagamentos locais considerados e aviso de falha de leitura.
- Mantidos busca, filtros, Venda vinculada e valores-base imutáveis.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Este lote projeta somente pagamentos ligados a Acertos existentes.
- Venda em parceiro pendente não abre nem aloca automaticamente um novo Acerto nesta camada.
- Comandos rejeitados não alteram a projeção; comandos ativos e conflitos preservados participam do valor estimado.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta e oito testes aprovados em cinco arquivos.
- `npm run build` executado com sucesso.
- Pagamento parcial, conclusão total, imutabilidade da base e integração visual da consulta cobertos por testes automatizados.

### Pendências

- Usar a projeção no próprio formulário para impedir pagamentos consecutivos acima do saldo estimado.
- Projetar a pendência financeira criada por uma Venda no parceiro somente após definir abertura e alocação transacionais.
- Criar visão consolidada das operações ainda salvas somente no aparelho.
- Implementar autenticação, banco central e sincronização.

### Próximo passo recomendado

Reutilizar a projeção de Acertos no formulário de pagamento, bloqueando novos pagamentos quando o saldo estimado já foi consumido por comandos pendentes no mesmo aparelho.

## 2026-09-01 — Lote 29: saldo estimado no formulário de pagamento

### Objetivo do lote

Fazer o formulário de pagamento abrir e repetir com os valores projetados do Acerto, impedindo que comandos consecutivos no mesmo aparelho ultrapassem o saldo local restante.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/MODELO_DADOS.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Serviço de projeção, componente, dados, tipos e testes de pagamento de Acerto em `app/src/`.

### Arquivos criados ou alterados

- Criado `app/src/hooks/useEstimatedSettlements.ts`.
- Alterados `app/src/services/settlementProjection.ts`, `app/src/components/SettlementPaymentPage.tsx` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Extraída uma projeção numérica reutilizável dos Acertos para o formulário e para a consulta.
- Criado hook de carregamento e recarga dos valores financeiros estimados.
- Adicionada etapa curta de conferência local antes de exibir o formulário.
- Bloqueado o formulário quando a outbox não pode ser lida com segurança.
- Inicializados valor acordado, já pago, pagamento sugerido e saldo restante a partir da projeção.
- Recarregada a projeção após persistir um pagamento.
- Ao repetir, o formulário passa a usar o valor já pago incluindo o comando anterior.
- Mantidas as validações existentes e o bloqueio de pagamento acima do saldo estimado.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- O formulário financeiro não é liberado antes de a leitura dos pagamentos locais terminar.
- Falha de leitura bloqueia novo pagamento em vez de usar silenciosamente valores antigos.
- Pagamento excedente continua fora do fluxo comum e não foi flexibilizado.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com cinquenta e oito testes aprovados em cinco arquivos.
- `npm run build` executado com sucesso.
- Após pagamento local de R$ 25,00, a repetição parte de R$ 85,00 pagos, sugere R$ 12,50 e bloqueia um novo pagamento de R$ 26,00 contra saldo restante de R$ 25,00.

### Pendências

- Criar visão consolidada das operações ainda salvas somente no aparelho.
- Refinar Compra repetida para mostrar o estoque estimado acumulado no próprio formulário.
- Projetar Venda em parceiro como nova pendência financeira somente após a regra de abertura e alocação transacional.
- Implementar autenticação, banco central e sincronização.

### Próximo passo recomendado

Criar uma visão simples de pendências locais com quantidade total, tipo de operação, horário, estado visível e acesso pela Home, sem expor payload técnico ou permitir exclusão destrutiva.

## 2026-09-01 — Lote 30: visão das operações salvas no aparelho

### Objetivo do lote

Dar visibilidade às operações presentes na outbox por meio de um contador na Home e de uma lista somente de leitura, com linguagem humana e sem expor dados técnicos.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Home, App, navegação, serviço IndexedDB, estilos e testes em `app/src/`.

### Arquivos criados ou alterados

- Criados `app/src/components/LocalPendingPage.tsx`, `app/src/services/localPendingPresentation.ts` e `app/src/services/localPendingPresentation.test.ts`.
- Alterados `app/src/components/HomePage.tsx`, `app/src/App.tsx`, `app/src/types/navigation.ts`, `app/src/App.css` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Adicionado contador de registros locais na Home quando a outbox não está vazia.
- Criada rota local `#pendencias-locais` acessível pelo resumo da Home.
- Criada lista ordenada com título, descrição, horário local e estado de cada comando.
- Traduzidos Compra, Envio, Devolução, Venda direta, Venda em parceiro e pagamento de Acerto para textos simples.
- Mantido o estado técnico centralizado nos rótulos já aprovados, como `Salvo neste aparelho`.
- Adicionados estados de carregamento, lista vazia e falha de leitura.
- Adicionado aviso para não limpar os dados do navegador enquanto houver pendências.
- O identificador do comando permanece apenas como chave interna e não é exibido.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- A visão local é somente de leitura neste momento.
- Exclusão, edição, reenvio e sincronização manual não foram adicionados.
- Payload, UUID, sequência do aparelho e outros detalhes técnicos não aparecem para a usuária.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com sessenta e um testes aprovados em seis arquivos.
- `npm run build` executado com sucesso.
- Tradução dos tipos, separação entre Venda e pagamento, contador na Home, navegação e ocultação do identificador técnico cobertos por testes automatizados.

### Pendências

- Refinar Compra repetida para mostrar o estoque estimado acumulado no próprio formulário.
- Definir e implementar sincronização manual e automática em lote posterior.
- Projetar Venda em parceiro como nova pendência financeira somente após a regra de abertura e alocação transacional.
- Implementar autenticação e integração com o banco central.

### Próximo passo recomendado

Aplicar o estoque estimado ao formulário de Compra e recarregar a projeção após salvar, para que compras repetidas mostrem corretamente o saldo acumulado no aparelho.

## 2026-09-01 — Lote 31: estoque estimado no formulário de Compra

### Objetivo do lote

Fazer o formulário de Compra calcular seu efeito sobre o saldo estimado e recarregar a projeção após salvar, mantendo corretas as compras repetidas no mesmo aparelho.

### Arquivos lidos

- `AGENTS.md`, `README.md`, `docs/REGRAS_NEGOCIO.md`, `docs/SINCRONIZACAO_OFFLINE.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.
- Formulário, dados, tipos, hook de estoque estimado e testes de Compra em `app/src/`.

### Arquivos criados ou alterados

- Alterados `app/src/components/PurchasePage.tsx` e `app/src/App.test.tsx`.
- Alterados `README.md`, `docs/ROADMAP.md` e `docs/LOG_TRABALHO.md`.

### O que foi feito

- Substituída a leitura direta da base mockada pelo estoque estimado compartilhado.
- Bloqueado o botão enquanto os movimentos locais são conferidos.
- Bloqueado o lançamento se a leitura local falhar.
- Recarregada a projeção depois que o comando de Compra é persistido.
- Mantidos produto, fornecedor, quantidade, custo e data preenchidos ao repetir.
- O efeito de uma nova Compra passa a partir do saldo que já inclui Compras e demais movimentos pendentes.

### Decisões registradas

- Nenhuma regra de produto foi alterada.
- Todos os cinco fluxos principais agora calculam ou validam usando as projeções locais pertinentes.
- Falha de leitura continua bloqueando o lançamento para não mostrar um efeito baseado em saldo antigo.

### Validação realizada

- `npm run lint` executado sem erros.
- `npm run test -- --run` executado com sessenta e um testes aprovados em seis arquivos.
- `npm run build` executado com sucesso.
- A primeira Compra projeta Caneca Flores de 2 para 14 unidades; ao repetir, o mesmo formulário projeta de 14 para 26.

### Pendências

- Implementar autenticação e substituir a identidade de demonstração.
- Integrar a outbox ao banco central e implementar sincronização.
- Projetar Venda em parceiro como nova pendência financeira somente após a regra de abertura e alocação transacional.
- Atualizar os indicadores mockados da Home a partir das projeções em lote próprio, se mantidos antes da integração real.

### Próximo passo recomendado

Planejar a autenticação e o contexto real de negócio, usuário e aparelho antes de conectar a outbox ao banco central, definindo também a decisão pendente sobre unicidade do nome de usuário.
