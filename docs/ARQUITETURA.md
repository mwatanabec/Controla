# Arquitetura do Maria Controla

**Status:** aprovada pela owner em 21 de agosto de 2026. Nenhuma tecnologia foi instalada ou implementada ainda.

## 1. Objetivo

Definir uma base técnica proporcional para construir a V1 funcional do Maria Controla sem transformar o produto em um ERP e sem antecipar a complexidade das versões futuras.

A arquitetura precisa sustentar:

- uso principal pelo celular;
- celulares simples e internet instável;
- múltiplos clientes pagantes com dados isolados;
- usuários internos vinculados a um único negócio na V1;
- estoque próprio e mercadorias em Pontos Parceiros;
- histórico completo de compras, envios, vendas, devoluções, perdas, ajustes e acertos;
- controle de licença e acesso;
- baixo custo inicial e manutenção simples;
- evolução posterior para acesso do parceiro e integrações, sem implementá-las agora.

## 2. Resumo da recomendação

A proposta recomendada para a V1 é:

- **aplicação:** PWA mobile-first, acessível pelo navegador e instalável na tela inicial;
- **frontend:** React com TypeScript;
- **construção do frontend:** Vite;
- **hospedagem do frontend:** Cloudflare Pages;
- **plataforma de backend:** Supabase gerenciado;
- **banco de dados:** PostgreSQL;
- **autenticação:** Supabase Auth;
- **arquivos opcionais:** Supabase Storage com acesso privado;
- **segurança entre clientes:** permissões explícitas e Row Level Security em todas as tabelas expostas;
- **operações críticas:** funções transacionais no PostgreSQL;
- **funcionamento da V1:** operação offline nas rotinas principais, com banco local, fila de comandos, sincronização posterior e tratamento explícito de conflitos.

Essa composição entrega uma única base de interface para celular e computador, evita manter um servidor próprio na V1 e preserva um banco relacional adequado às regras de estoque e acerto.

## 3. Alternativas consideradas

| Alternativa | Pontos favoráveis | Custos e riscos | Conclusão |
|---|---|---|---|
| PWA React + Supabase | Uma base de código; acesso por link; instalação no celular; implantação rápida; PostgreSQL, autenticação e arquivos integrados | Recursos nativos avançados são mais limitados; uso offline completo exigiria uma camada de sincronização | **Recomendada para a V1** |
| React com framework full-stack e servidor próprio | Maior controle sobre processamento no servidor; adequado para páginas públicas e renderização no servidor | Mais componentes para implantar, proteger e manter; os benefícios de renderização no servidor são pouco relevantes para o app autenticado | Não recomendada agora |
| Flutter para Android, iOS e web | Experiência mais próxima de aplicativo nativo; caminho direto para lojas | Processo de build e publicação mais pesado; maior custo de manutenção; versão web tende a exigir mais atenção em celulares simples | Possível evolução, se uma necessidade nativa for comprovada |

Uma PWA pode ser instalada e iniciada como aplicativo em navegadores compatíveis, mas a forma de instalação varia entre plataformas. O produto continuará acessível como site quando a instalação não estiver disponível.

## 4. Visão dos componentes

```text
Celular ou computador
        |
        v
PWA React + TypeScript
hospedada no Cloudflare Pages
        |
        +----------------------+
        |                      |
        v                      v
Supabase Auth           API de dados / funções
                               |
                               v
                         PostgreSQL
                    RLS + transações + histórico
                               |
                               v
                  Storage privado, quando necessário
```

Não haverá um backend próprio permanente na primeira versão. A interface acessará a plataforma gerenciada usando a chave pública prevista para aplicações cliente. A proteção real ficará nas permissões e políticas do banco. Chaves secretas nunca poderão ser incluídas no frontend.

Funções de servidor serão adicionadas somente para operações privilegiadas, integrações externas ou tarefas que não possam ser expostas ao cliente com segurança.

## 5. Organização lógica

### 5.1 Interface

A interface será organizada por funcionalidades do negócio, não por tabelas do banco:

- Início;
- Produtos;
- Fornecedores e Compras;
- Estoque;
- Pontos Parceiros e Envios;
- Vendas e Devoluções;
- Acertos;
- Reposição;
- Administração e acesso.

Componentes visuais e linguagem seguirão o protótipo aprovado. A aplicação deverá funcionar a partir de 320 px de largura, sem depender de gestos ocultos ou ícones sem texto nas ações principais.

### 5.2 Domínio

O domínio será separado inicialmente em quatro grupos:

- **plataforma:** negócios, usuários, vínculos, licenças e dispositivos registrados;
- **cadastros:** catálogo próprio de cada negócio, categorias iniciais copiadas para o cliente, fornecedores, Pontos Parceiros, preços por parceiro e estoque mínimo por localização;
- **operações:** compras, envios, vendas, devoluções, perdas, ajustes e acertos;
- **histórico:** movimentos de estoque, alterações relevantes e vínculo entre eventos de origem.

As tabelas, campos, chaves e relacionamentos serão definidos no próximo lote de modelagem de dados.

### 5.3 Ações críticas

Uma operação como “registrar envio” não será uma sequência de gravações independentes feita pelo navegador. Ela deverá executar como uma única transação no banco:

1. identificar usuário e negócio;
2. validar licença e permissão;
3. validar produto, parceiro e quantidade disponível;
4. registrar o documento de envio;
5. registrar a saída do estoque próprio;
6. registrar a entrada no Ponto Parceiro;
7. confirmar tudo junto ou cancelar tudo em caso de erro.

Compra, venda, devolução, perda, ajuste e acerto seguirão o mesmo princípio. Cada comando receberá um identificador único para impedir duplicidade causada por duplo toque ou repetição da requisição.

## 6. Estratégia de estoque e rastreabilidade

O histórico de movimentos será a fonte de verdade do estoque. Saldos exibidos na tela poderão ser calculados ou mantidos como projeções controladas para melhorar desempenho, mas nunca substituirão os eventos de origem.

Regras técnicas obrigatórias:

- movimentação confirmada não será apagada para corrigir saldo;
- correção ocorrerá por estorno ou ajuste identificado;
- todo movimento terá negócio, produto, origem, destino ou situação, quantidade, data e responsável;
- valores relevantes serão preservados no evento, evitando que uma mudança futura no cadastro altere o passado;
- envio e devolução gerarão movimentos correspondentes entre duas localizações;
- venda reduzirá o disponível no parceiro e criará a pendência de acerto;
- venda direta reduzirá o estoque próprio e não criará acerto com parceiro;
- cada item vendido preservará o preço efetivamente utilizado;
- preço padrão do produto, preço específico do parceiro e preço da venda serão conceitos separados;
- pagamento não apagará a venda que originou a pendência;
- pagamentos parciais preservarão o valor calculado, o valor acordado e o saldo restante;
- comandos críticos serão transacionais e idempotentes.

Essa abordagem implementa a regra central de que uma mercadoria nunca desaparece.

## 7. Isolamento dos clientes e segurança

Cada registro pertencente a um cliente terá o identificador do negócio. O vínculo entre usuário e negócio determinará quais dados podem ser acessados.

Controles mínimos:

- Row Level Security habilitada em toda tabela ou visualização exposta;
- permissões concedidas explicitamente apenas aos papéis necessários;
- políticas separadas para leitura e escrita;
- chaves estrangeiras que impeçam relacionamentos entre registros de negócios diferentes;
- nenhuma chave secreta no navegador ou no repositório;
- operações administrativas privilegiadas fora do acesso comum do cliente;
- trilha com data e usuário responsável por operações importantes;
- validação de licença em todas as funções de escrita;
- revisão das políticas de segurança antes de qualquer ambiente produtivo.

O futuro usuário do Ponto Parceiro não será criado na V1. O Ponto Parceiro já existirá como entidade do negócio, permitindo adicionar acesso limitado no futuro sem expor fornecedores, custos, outros parceiros ou estoque total.

## 8. Autenticação, licença e dispositivos

### Proposta para a V1

- cadastro com nome completo, e-mail, código de verificação, nome de usuário e senha;
- login por empresa, nome de usuário e senha, com e-mail como identidade verificada e meio de recuperação;
- contas criadas ou convidadas sob controle da plataforma;
- recuperação de senha por e-mail;
- licença vinculada ao negócio;
- usuário vinculado a um negócio na V1;
- ações de escrita bloqueadas quando a licença não permitir uso;
- instalação identificada por um código gerado pelo aplicativo e registrada no backend;
- liberação de instalação disponível para a administração.

Antes de uso externo, será necessário configurar um serviço SMTP próprio. O serviço de e-mail padrão do Supabase é destinado a testes e restringe destinatários e volume.

O Supabase autentica senha usando e-mail ou telefone. Para oferecer login por empresa e nome de usuário, a V1 usará a Edge Function pública `login-with-username`. Ela resolverá negócio, vínculo e e-mail somente no servidor, validará a senha pelo Supabase Auth e responderá com a sessão normal sem devolver o e-mail no corpo. Empresa inexistente, usuário inexistente, conta inativa, e-mail não confirmado e senha incorreta produzirão a mesma resposta. O contrato completo está em `docs/AUTENTICACAO.md`.

O código público da empresa será único. O nome de usuário ficará no vínculo `business_memberships` e será único dentro do negócio, permitindo o mesmo login em empresas diferentes. A chave secreta usada pela função nunca poderá chegar ao navegador. Antes da produção, o endpoint público deverá receber limitação de tentativas na borda e revisão específica contra enumeração e força bruta.

Biometria em PWA é possível por passkeys/WebAuthn: o dispositivo valida biometria, PIN ou chave de segurança, sem enviar a biometria ao Maria Controla. Esse recurso fica fora da V1 e em standby para uma evolução futura; o suporte atual do Supabase a passkeys é experimental e não será requisito de acesso da primeira versão.

O limite de dispositivos em uma aplicação web não funciona como proteção inviolável: dados do navegador podem ser apagados e um novo identificador pode ser criado. Na V1, ele deve ser tratado como controle comercial e sinal de suporte, combinado com limites de usuários, sessões e bloqueio administrativo — não como DRM infalível.

Antes do lote de autenticação, será necessário confirmar se todos os clientes iniciais possuem e conseguem acessar um e-mail. Caso contrário, outro método de login deverá ser avaliado sem alterar os demais componentes da arquitetura.

## 9. Internet instável, armazenamento local e sincronização

A V1 permitirá **operação offline nas rotinas principais** depois que o usuário realizar o primeiro acesso e sincronizar o aparelho.

### Componentes locais

- manifesto e estrutura estática em cache para abrir a PWA sem conexão;
- IndexedDB como armazenamento estruturado no aparelho;
- cópia local dos dados necessários às rotinas do usuário;
- caixa de saída com comandos ainda não enviados;
- identificadores gerados no aparelho para relacionar cadastros e impedir duplicidade;
- situação local de cada comando: pendente, sincronizando, sincronizado ou precisa de revisão.

### Rotinas offline previstas

- consultar os últimos produtos, estoques e movimentos sincronizados;
- cadastrar produto, fornecedor ou Ponto Parceiro;
- registrar compra e envio;
- registrar venda, devolução, perda ou avaria;
- registrar acerto;
- guardar foto ou comprovante para envio posterior, quando esse recurso estiver habilitado.

### Sincronização

- tentar enviar pendências quando a conexão voltar com o app aberto;
- tentar novamente quando o app for reaberto;
- oferecer a ação visível “Sincronizar agora”;
- usar sincronização em segundo plano como melhoria quando o navegador oferecer suporte, sem depender dela;
- enviar cada comando com chave de idempotência, data de ocorrência, data de sincronização, usuário e dispositivo;
- aplicar no servidor as regras transacionais e devolver confirmação ou conflito;
- atualizar a cópia local apenas com o resultado conhecido da sincronização.

O app poderá mostrar um saldo local projetado, incluindo movimentos pendentes, mas deverá informar que ele ainda não foi confirmado na nuvem.

### Conflitos e perda local

Se dois aparelhos registrarem operações concorrentes, o servidor não sobrescreverá silenciosamente um evento com outro. Os dois fatos serão preservados, e uma divergência de saldo poderá gerar pendência de conferência ou ajuste rastreável.

Dados do navegador podem ser removidos pelo usuário, pelo sistema operacional ou pela desinstalação. Enquanto houver comandos pendentes, o app deverá alertar que limpar os dados ou remover o aplicativo pode causar perda do que ainda não foi sincronizado.

### Operações que exigem internet

- primeiro login no aparelho;
- recuperação de senha;
- criação, bloqueio ou alteração de usuários;
- alteração de plano ou licença;
- administração da plataforma;
- confirmação definitiva dos comandos no banco central.

A sincronização com o aplicativo completamente fechado não é garantida em todos os navegadores. O fluxo confiável será sincronizar com o app aberto, ao reabri-lo ou por ação manual.

## 10. Hospedagem, ambientes e mudanças de banco

### Ambientes

- **local:** desenvolvimento e testes com dados fictícios;
- **prévia:** versão do frontend para revisão, ligada apenas a dados de desenvolvimento;
- **produção:** ambiente separado com dados reais.

O frontend estático será publicado no Cloudflare Pages. A integração com Git poderá gerar versões de prévia sem substituir a produção.

O esquema do PostgreSQL será mantido em arquivos de migração versionados. Alterações não serão feitas apenas pelo painel remoto sem que a migração correspondente fique registrada no repositório.

Antes de iniciar código, o conteúdo atual do projeto precisa entrar no histórico do Git. Hoje os arquivos aparecem como não rastreados; qualquer commit exigirá autorização específica da owner.

### Backup

- desenvolvimento poderá começar no plano gratuito;
- antes de operar com clientes reais, produção deverá usar uma estratégia de backup verificável;
- no Supabase, backups automáticos fazem parte dos planos pagos indicados para produção;
- no plano gratuito, serão necessárias exportações lógicas regulares;
- backup do PostgreSQL não inclui os próprios arquivos do Storage, portanto fotos e comprovantes exigirão estratégia separada quando forem habilitados;
- restauração deverá ser testada, não apenas configurada.

## 11. Modelo de operação comercial

O Maria Controla será operado como SaaS pela MarIA Soluções:

- a MarIA Soluções manterá o código, a conta dos provedores, a infraestrutura e o banco central;
- cada cliente contratará uma licença vinculada ao seu negócio e plano;
- a mensalidade financiará banco, hospedagem, backups, segurança, atualizações e suporte;
- o cliente não contratará nem pagará diretamente o Supabase no modelo padrão;
- uma cobrança de implantação poderá existir separadamente sem transferir a propriedade do produto ou do código-fonte;
- instalações exclusivas, banco dedicado ou customizações serão ofertas distintas, caso venham a existir;
- o cliente acessará os dados do próprio negócio e deverá ter uma forma definida de exportá-los conforme a política comercial e contratual futura.

Os valores dos planos, limites incluídos, taxa de implantação e forma de cobrança ainda não foram definidos.

## 12. Custo operacional inicial

Valores consultados em 20 de agosto de 2026 e sujeitos a alteração:

- Cloudflare Pages: arquivos estáticos podem começar no plano gratuito;
- Supabase Free: adequado para desenvolvimento, mas pode pausar por inatividade e não oferece o mesmo nível de backup de produção;
- Supabase Pro: anunciado a partir de US$ 25 por mês, com projeto ativo e backups diários;
- domínio próprio: custo separado;
- SMTP para autenticação: custo conforme o fornecedor escolhido;
- armazenamento e tráfego acima das franquias: custo variável.

A recomendação é desenvolver com recursos gratuitos e migrar o banco de produção para um plano adequado antes de inserir dados reais de clientes pagantes.

## 13. Riscos e respostas

| Risco | Resposta proposta |
|---|---|
| Dados de um cliente aparecerem para outro | `business_id`, vínculos consistentes, RLS, testes automáticos de isolamento e revisão de permissões |
| Estoque divergente por duplo toque ou repetição da sincronização | transações, chave de idempotência e confirmação identificada pelo servidor |
| Dois aparelhos alterarem o mesmo estoque offline | preservar os eventos, detectar divergência e encaminhar para conferência ou ajuste rastreável |
| Pendência local ser perdida antes da sincronização | aviso persistente, tentativa ao reabrir, ação manual e orientação para não limpar os dados do app |
| Sincronização não executar com o app fechado | não depender de Background Sync; sincronizar com o app aberto, ao reabrir e por ação manual |
| Usuário alterar ou apagar histórico | eventos confirmados imutáveis; correção por estorno ou ajuste |
| PWA não ser instalada | manter todo o produto utilizável pelo navegador e orientar a instalação quando compatível |
| Celular antigo ou lento | interface leve, poucos dados por tela, imagens opcionais e definição explícita de navegadores suportados |
| E-mail de acesso não chegar | SMTP próprio, monitoramento e procedimento administrativo de recuperação |
| Limite de dispositivo ser contornado | tratar como controle comercial, combinar com usuário, sessão, licença e suporte |
| Dependência do fornecedor gerenciado | PostgreSQL padrão, migrações versionadas, exportações e acesso aos próprios dados |
| Perda de dados ou arquivos | backups do banco e estratégia separada para Storage, com teste de restauração |

## 14. Decisões de produto que afetam o próximo modelo de dados

Regras aprovadas que o próximo modelo deve representar:

1. acertos permitem pagamentos parciais;
2. valor calculado e valor acordado no acerto são preservados separadamente;
3. preço padrão do produto, preço específico por parceiro e preço efetivo da venda são distintos;
4. cada negócio possui seu próprio catálogo de produtos;
5. venda direta pelo Cliente 1 entra na V1;
6. categorias iniciais são copiadas para o negócio e permanecem livres para manutenção pelo cliente;
7. estoque mínimo pode variar por produto e localização;
8. conflito offline preserva os eventos e gera alerta para o Cliente 1;
9. cadastro inclui e-mail verificado, nome completo, nome de usuário e senha;
10. suporte usa um código público do negócio, separado do identificador interno.

Pendências que não impedem o início do modelo, mas precisam permanecer configuráveis:

- comportamento exato ao atingir o limite de dispositivos;
- limites de usuários, dispositivos e Pontos Parceiros por plano;
- cobrança manual ou automatizada e eventual período de teste;
- política de exportação, retenção e exclusão de dados após cancelamento.

## 15. Decisões técnicas aprovadas

Em 21 de agosto de 2026, a owner aprovou:

1. PWA React + TypeScript como formato da aplicação;
2. Vite para construção do frontend;
3. Supabase com PostgreSQL, Auth e Storage como plataforma gerenciada;
4. Cloudflare Pages para hospedar o frontend;
5. operação offline nas rotinas principais, com armazenamento local e sincronização posterior;
6. funções transacionais e histórico de movimentos como fonte de verdade;
7. isolamento por negócio com RLS;
8. cadastro com e-mail verificado e login por empresa, nome de usuário e senha;
9. controle de dispositivos como proteção comercial, reconhecendo os limites do navegador;
10. modelo SaaS com infraestrutura e banco central mantidos pela MarIA Soluções;
11. acesso inicial por link e instalação da PWA, mantendo Play Store como evolução posterior;
12. modelagem detalhada do banco local, banco central e protocolo de sincronização como próximo lote;
13. biometria/passkey fora da V1 e em standby para evolução futura.

O cadastro com e-mail verificado e o login por empresa, nome de usuário e senha foram aprovados. A resolução segura foi detalhada em `docs/AUTENTICACAO.md` e implementada localmente como Edge Function, ainda sem deploy ou credenciais remotas.

## 16. Referências técnicas oficiais

- [Progressive Web Apps — MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app)
- [Instalação de PWAs — MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [Operação offline e em segundo plano — MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)
- [IndexedDB para dados locais — MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [Limitações da Background Sync API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [Vite: guia e compatibilidade](https://vite.dev/guide/)
- [React com TypeScript](https://react.dev/learn/typescript)
- [Supabase: arquitetura de autenticação](https://supabase.com/docs/guides/auth/architecture)
- [Supabase: referência de campos do JWT](https://supabase.com/docs/guides/auth/jwt-fields)
- [Supabase: segurança de Edge Functions](https://supabase.com/docs/guides/functions/auth)
- [Supabase: administração de usuários](https://supabase.com/docs/reference/javascript/auth-admin-listusers)
- [Supabase: autenticação com passkeys](https://supabase.com/docs/guides/auth/passkeys)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: segurança da API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: funções de banco](https://supabase.com/docs/guides/database/functions)
- [Supabase: desenvolvimento e migrações](https://supabase.com/docs/guides/local-development/overview)
- [Supabase: SMTP para autenticação](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase: backups](https://supabase.com/docs/guides/platform/backups)
- [Supabase: preços](https://supabase.com/pricing)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages: integração com Git](https://developers.cloudflare.com/pages/configuration/git-integration/)
