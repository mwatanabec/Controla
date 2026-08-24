# Decisões do projeto

Este documento registra decisões vigentes do Maria Controla. Hipóteses e perguntas ainda não validadas não devem ser tratadas como decisões.

## Decisões vigentes

### D-001 — Identidade do produto

- **Decisão:** o produto se chama **Maria Controla** e pertence à marca MarIA Soluções.
- **Impacto:** Anona Presentes é cliente piloto e não deve aparecer como nome do produto.

### D-002 — Posicionamento

- **Decisão:** o Maria Controla é uma caderneta inteligente de mercadorias, não um ERP.
- **Impacto:** o produto prioriza rotinas essenciais, linguagem simples e poucos campos obrigatórios.

### D-003 — Público inicial

- **Decisão:** o foco são pequenos comerciantes, revendedores, autônomos e microempreendedores que controlam mercadorias próprias ou consignadas de maneira manual.
- **Impacto:** a experiência precisa funcionar bem em celulares simples e para pessoas com baixa maturidade tecnológica.

### D-004 — Experiência principal

- **Decisão:** o produto é mobile-first.
- **Impacto:** clareza, velocidade, baixo peso e poucos toques têm prioridade sobre telas densas ou recursos avançados.

### D-005 — Usuário da primeira versão

- **Decisão:** na V1, os lançamentos serão feitos pelo cliente pagante e seus usuários internos.
- **Impacto:** o Ponto Parceiro não terá área própria na V1.

### D-006 — Primeira validação visual

- **Decisão:** após a organização documental, a primeira entrega será um protótipo mobile-first somente da Home, com dados mockados da Anona Presentes.
- **Impacto:** o protótipo não terá backend, autenticação real, integrações ou arquitetura final.

### D-007 — Regra central de rastreabilidade

- **Decisão:** uma mercadoria nunca desaparece; toda mudança relevante deve manter localização, status e histórico.
- **Impacto:** venda, devolução, perda, acerto e ajuste são eventos diferentes.

### D-008 — Área do parceiro

- **Decisão:** o acesso do Ponto Parceiro é uma evolução futura.
- **Impacto:** na V1, vendas e devoluções informadas pelos parceiros serão registradas manualmente pelo cliente pagante.

### D-009 — Estratégia de construção e apresentação da V1

- **Decisão:** a V1 funcional será construída antes da apresentação do produto às pessoas interessadas. Não haverá sessões de validação antecipada como condição para definir a arquitetura ou iniciar a implementação.
- **Impacto:** o roteiro de validação já produzido permanece como referência, mas não bloqueia a evolução técnica. Depois que a V1 estiver pronta para uso, o produto será apresentado e as sugestões recebidas serão registradas, avaliadas e priorizadas na fila de melhorias, sem incorporação automática ao escopo.
- **Limite:** “produto pronto” significa a V1 funcional delimitada pelas regras e pelo roadmap vigentes; não inclui as evoluções previstas para V2 ou versões posteriores.

### D-010 — Modelo comercial e responsabilidade pela infraestrutura

- **Decisão:** o Maria Controla será oferecido como serviço por licença vinculada ao negócio e ao plano contratado. A MarIA Soluções manterá o produto, a infraestrutura compartilhada e o banco central; o cliente não contratará nem pagará diretamente o provedor de banco de dados no modelo padrão.
- **Impacto:** a receita recorrente deverá sustentar hospedagem, banco, backups, segurança, atualizações e suporte. Uma cobrança inicial de implantação poderá existir separadamente, mas não representará venda do código-fonte ou transferência da ferramenta.
- **Limite:** valores, franquias, forma de cobrança e política de exportação ou retenção dos dados ainda serão definidos antes da comercialização.

### D-011 — Arquitetura técnica da V1

- **Decisão:** a V1 será uma PWA mobile-first em React e TypeScript, construída com Vite, hospedada no Cloudflare Pages e integrada ao Supabase gerenciado para PostgreSQL, autenticação e arquivos opcionais.
- **Impacto:** o produto será acessado por link, poderá ser instalado na tela inicial e usará uma única base de código para celular e computador. O banco central separará os negócios por identificador e Row Level Security.
- **Evolução:** publicação na Play Store poderá ser avaliada posteriormente; distribuição de APK por link e entrega do código-fonte ao cliente não fazem parte do modelo padrão.

### D-012 — Operação offline e sincronização

- **Decisão:** a V1 permitirá operação offline para as rotinas principais, com dados locais, fila de comandos pendentes e sincronização com a nuvem quando houver conexão.
- **Impacto:** o app mostrará claramente o que está apenas no aparelho, o que está sincronizando, o que foi confirmado e o que precisa de revisão. Cada comando terá identificação única para evitar duplicidade.
- **Limite:** a sincronização com o app completamente fechado não é garantida em todos os navegadores. O sistema sincronizará ao recuperar conexão com o app aberto, ao reabrir o app e por ação manual, além de usar segundo plano quando houver suporte.
- **Conflitos:** alterações concorrentes não serão sobrescritas silenciosamente; os eventos serão preservados e divergências serão encaminhadas para conferência ou ajuste rastreável.

### D-013 — Catálogo, categorias, preços e reposição

- **Decisão:** cada negócio terá sua própria lista de produtos. O produto terá preço de venda padrão, e cada Ponto Parceiro poderá ter um preço específico por produto. O preço será preenchido automaticamente na venda e poderá ser alterado pelo usuário naquele lançamento.
- **Histórico:** a venda preservará o preço efetivamente utilizado, sem ser alterada por mudanças posteriores no produto ou no preço do parceiro.
- **Categorias:** cada novo negócio receberá uma base inicial de categorias e poderá criar, editar ou desativar suas próprias categorias.
- **Reposição:** o estoque mínimo poderá ter valor diferente por produto e localização.

### D-014 — Venda direta e acertos

- **Decisão:** o Cliente 1 poderá registrar vendas diretas, além das vendas realizadas nos Pontos Parceiros.
- **Acertos:** pagamentos parciais serão permitidos. O sistema calculará automaticamente o valor das vendas pendentes, mas o valor acordado no acerto será editável.
- **Histórico:** o valor calculado e o valor efetivamente acordado serão preservados separadamente. Uma justificativa poderá ser registrada quando houver diferença.

### D-015 — Cadastro e identificação do usuário

- **Decisão:** o cadastro inicial terá e-mail verificado por código, nome completo, nome de usuário e senha. O login deverá aceitar nome de usuário e senha, mantendo e-mail como identidade verificada e alternativa de recuperação.
- **Impacto:** a implementação segura do login por nome de usuário será definida no lote de autenticação, porque o Supabase usa e-mail ou telefone como identidade de senha.
- **Evolução:** biometria/passkey fica fora da V1 e em standby para uma evolução futura. Ainda é necessário decidir se o nome de usuário será único em toda a plataforma.

### D-016 — Suporte inicial

- **Decisão:** a V1 terá um acesso ao suporte pelo WhatsApp, com mensagem preparada contendo código público do negócio, usuário, tela, versão, horário e código do erro quando disponíveis.
- **Segurança:** senha, token e dados comerciais sensíveis não serão incluídos na mensagem.
- **Offline:** quando não houver internet, o app poderá preparar ou copiar a mensagem para envio posterior.

### D-017 — Comunicação comercial inicial

- **Decisão:** a direção inicial de comunicação será **“consignado com controle de estoque”**.
- **Impacto:** a frase orienta a apresentação comercial sem reduzir o produto apenas a estoque ou transformá-lo em ERP.

## Hipóteses e decisões pendentes

- Limites comerciais de usuários, dispositivos e pontos parceiros.
- Se o nome de usuário será único em toda a plataforma ou combinado com um identificador do negócio.
- Comportamento exato ao atingir o limite de dispositivos: bloqueio do novo aparelho até liberação ou aviso com tolerância temporária.
- Valores, franquias, taxa de implantação e forma operacional da cobrança recorrente.
- Existência e duração de período de teste.
- Política de exportação, retenção e exclusão de dados após cancelamento.
- Possibilidade e condições de instalações exclusivas ou banco dedicado.

Esses itens só devem migrar para “Decisões vigentes” após validação explícita.
