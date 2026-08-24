# AGENTS.md — Método de Trabalho com IA

Este documento define como agentes de IA devem trabalhar no projeto **Maria Controla**.

O objetivo é manter eficiência, clareza, baixo desperdício de contexto e evitar confusão entre produto, arquitetura e implementação.

---

## 1. Fronteira do projeto

O **Maria Controla** é um produto próprio da MarIA Soluções.

Não pertence à SuperFrio, IceStar ou qualquer projeto corporativo.

Não utilizar:
- Claude Code;
- agentes criados no Claude;
- Claude Enterprise;
- contexto, código, documentação ou dados de projetos corporativos;
- referências de SuperFrio, IceStar, CSC, Protheus, WMS ou projetos internos de empresa.

Ferramentas permitidas:
- ChatGPT pessoal para estratégia, produto, regras e revisão;
- Codex pessoal no VS Code/terminal para implementação;
- Git local;
- GitHub pessoal ou organização própria da MarIA Soluções, quando autorizado.

Se encontrar qualquer arquivo, instrução, hook, agente ou configuração relacionada a Claude/Claude Code ou contexto corporativo, pare e avise antes de continuar.

---

## 2. Princípio central de contexto

Não carregar contexto gigante desnecessariamente.

A IA deve trabalhar com a menor quantidade de contexto suficiente para a tarefa atual.

Regra:

> Fato do projeto fica no repositório.  
> Método de trabalho fica neste arquivo.  
> Preferências e decisões vigentes ficam em documentos curtos e versionados.  
> Prompt não deve substituir documentação.

Antes de iniciar uma tarefa, leia apenas os arquivos necessários.

Evite reler todo o projeto quando a tarefa for pequena.

---

## 3. Ordem das fontes de verdade

Para qualquer decisão, siga esta ordem:

1. `README.md` — visão executável do projeto.
2. `docs/CONTEXTO_PROJETO_MARIA_CONTROLA.md` — contexto de produto.
3. `docs/DECISOES.md` — decisões já tomadas.
4. `docs/REGRAS_NEGOCIO.md` — regras do domínio.
5. `docs/ROADMAP.md` — sequência de evolução.
6. Este `AGENTS.md` — método de trabalho da IA.

Se houver conflito entre arquivos, pare e peça decisão da Maria.

Não invente decisão para resolver conflito sozinho.

---

## 4. Trabalho em lotes

Toda implementação deve ser feita em lotes pequenos.

Cada lote precisa ter:

- objetivo claro;
- escopo do que entra;
- escopo do que não entra;
- arquivos que serão lidos;
- arquivos que serão criados ou alterados;
- critério de pronto;
- validação proposta.

Cada lote exige uma única aprovação inicial. Essa aprovação autoriza a execução completa do escopo, dos arquivos, dos comandos e das validações apresentados no plano do lote.

Quando Maria solicitar diretamente uma alteração concreta e bem delimitada, a própria solicitação conta como aprovação inicial desse lote. Não pedir que ela aprove novamente o que acabou de solicitar.

Depois da aprovação, não pedir novas autorizações para ações normais que já estejam dentro do lote. Avançar até o critério de pronto ou até surgir um bloqueio real.

Não avance para um novo lote nem amplie materialmente o escopo sem confirmação.

---

## 5. Antes de codar

Antes de criar ou alterar arquivos, responda:

1. quais arquivos você leu;
2. qual escopo entendeu;
3. o que entra neste lote;
4. o que não entra neste lote;
5. quais arquivos pretende criar ou alterar;
6. quais comandos pretende executar;
7. quais riscos ou dúvidas existem.

Aguarde uma aprovação inicial antes de implementar o lote. Depois dela, execute o escopo aprovado sem reconfirmar cada alteração, comando ou validação.

Só peça nova autorização se houver:

- ampliação material do escopo;
- arquivo ou sistema relevante não previsto no plano;
- decisão de produto que mude o resultado esperado;
- ação destrutiva ou de difícil reversão;
- custo, publicação externa ou acesso adicional não incluído na aprovação inicial;
- bloqueio que exija escolha da owner.

---

## 6. Permissões de comando

Comece sempre em modo leitura.

Comandos permitidos sem autorização especial, quando solicitados:

- listar arquivos;
- ler arquivos;
- verificar status do Git;
- buscar termos no repositório.

Comandos que devem estar previstos no plano e ficam autorizados pela aprovação do lote:

- criar arquivos;
- alterar arquivos;
- instalar dependências;
- iniciar servidor;
- executar build;
- executar testes;

Ações que precisam estar destacadas explicitamente no lote por terem maior impacto:

- apagar arquivos ou dados;
- fazer commit;
- fazer push;
- abrir PR.
- realizar deploy ou publicação externa;
- contratar serviço ou gerar custo.

Se uma dessas ações já estiver claramente incluída no plano aprovado, não pedir uma segunda autorização para executá-la.

Nunca execute comandos destrutivos sem autorização explícita.

---

## 7. Eficiência de tokens e contexto

Evite respostas longas sem necessidade.

Prefira:

- planos curtos;
- listas objetivas;
- decisões explícitas;
- evidências do que foi lido;
- próximos passos pequenos.

Não explique conceitos técnicos longamente se a tarefa é prática.

Não repita o contexto inteiro do projeto em toda resposta.

Quando o contexto ficar grande ou a conversa ficar confusa:

1. pare;
2. resuma o estado atual;
3. atualize o documento correto;
4. recomece com uma tarefa menor.

---

## 8. Separação entre produto, regra e arquitetura

Neste projeto, não misturar etapas.

Etapa atual pode ser uma destas:

1. contexto do projeto;
2. regras de negócio;
3. protótipo visual;
4. arquitetura;
5. implementação;
6. validação;
7. deploy.

Se a tarefa for de contexto, não definir arquitetura.

Se a tarefa for de protótipo, não criar backend.

Se a tarefa for de arquitetura, não implementar antes da aprovação.

Se a tarefa for de implementação, seguir a arquitetura aprovada.

---

## 9. Produto atual

O produto atual é o **Maria Controla**.

Resumo:

Produto para pequenos comerciantes e revendedores controlarem compras, estoque, fornecedores, pontos parceiros, consignado, vendas informadas, devoluções, acertos e reposição.

Cliente piloto:

- Anona Presentes.

Validação adicional de mercado:

- manicure que comprará chinelos e outros produtos para distribuir em salões, estéticas, lojas parceiras e manicures.

Personas:

- Maria: owner do produto e admin da plataforma.
- Cliente 1: cliente direto pagante, dono do negócio.
- Cliente 2: parceiro do Cliente 1, recebe mercadorias em consignado e futuramente poderá informar vendas.

---

## 10. Escopo atual recomendado

A primeira entrega deve ser um protótipo mobile-first da Home.

Objetivo:

Validar se a experiência é simples para uma pessoa real usar no celular.

Não fazer agora:

- backend;
- banco de dados;
- autenticação real;
- licenças implementadas;
- arquitetura final;
- integração com WhatsApp;
- emissão fiscal;
- OCR;
- IA;
- pagamento.

A Home deve usar dados mockados da Anona Presentes.

---

## 11. Linguagem do produto

A interface deve ser simples, direta e popular.

Usar termos como:

- Produtos;
- Compras;
- Estoque;
- Pontos Parceiros;
- Envios;
- Vendas;
- Acertos;
- Reposição.

Evitar termos como:

- tenant;
- stakeholder;
- consignatário;
- ERP;
- curva ABC;
- inventory;
- workflow complexo.

---

## 12. Critério de qualidade

O app deve parecer fácil para uma comerciante usar no celular.

Perguntas de validação:

- A pessoa entende o que fazer ao abrir?
- O botão principal está óbvio?
- Dá para registrar uma ação em poucos toques?
- A tela evita excesso de informação?
- A linguagem parece humana?
- A tela funciona bem em celular simples?
- O produto parece uma caderneta inteligente, não um ERP pesado?

---

## 13. Padrão de resposta esperado

Ao responder, seja objetivo e prático.

Formato preferido:

- Resumo do que foi entendido.
- Arquivos lidos.
- Plano do lote.
- Arquivos a alterar.
- Comandos a executar.
- Riscos/dúvidas.
- Pedido de aprovação inicial do lote, quando ainda não houver aprovação.

Evite respostas enormes.

Não inicie criação ou alteração de arquivos antes da aprovação inicial do lote. Após a aprovação, prossiga sem pedidos repetidos enquanto permanecer dentro do escopo aprovado.

---

## 14. Registro de andamento

O arquivo `docs/LOG_TRABALHO.md` é a memória operacional do projeto.

Ele deve ser atualizado ao final de cada lote de trabalho relevante, incluindo:

- criação ou alteração de documentação;
- criação ou alteração de protótipo;
- criação ou alteração de código;
- decisão de produto;
- decisão de escopo;
- decisão de regra de negócio;
- mudança de roadmap;
- revisão importante;
- encerramento de um lote de trabalho.

Cada registro deve informar o objetivo do lote, os arquivos lidos, os arquivos criados ou alterados, o que foi feito, as decisões registradas, as pendências e o próximo passo recomendado.

Não é necessário atualizar o log para perguntas rápidas sem alteração de contexto do projeto.
