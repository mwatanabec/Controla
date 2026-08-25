# Sincronização offline — Maria Controla

Status: aprovado para o lote de implementação dos contratos e da base técnica.

Este documento define como a V1 poderá continuar registrando operações sem internet e sincronizá-las depois. Ele complementa `ARQUITETURA.md` e `MODELO_DADOS.md`; ainda não representa código implementado.

## 1. Objetivo

Permitir que compras, envios, devoluções, vendas, acertos e ajustes sejam registrados no celular mesmo sem conexão, com estes compromissos:

- nenhuma operação confirmada desaparece silenciosamente;
- o usuário sempre sabe se algo está somente no aparelho, sincronizado ou precisa de revisão;
- repetir uma sincronização não duplica estoque, venda ou pagamento;
- divergências entre aparelhos são preservadas e apresentadas ao Cliente 1;
- o banco central continua sendo a referência compartilhada entre usuários e aparelhos.

## 2. Princípios

1. **Banco central como verdade compartilhada:** o PostgreSQL central contém os registros aceitos pelo negócio.
2. **Banco local como cópia operacional:** o IndexedDB guarda os dados necessários para trabalhar e uma fila de comandos ainda não enviados.
3. **Operações físicas são preservadas:** se duas pessoas venderem offline a última unidade, as duas vendas podem ter acontecido. O sistema registra o fato, aponta o estoque negativo e abre uma divergência.
4. **Sem sobrescrita silenciosa:** alterações incompatíveis não usam a regra “o último vence” sem aviso.
5. **Idempotência:** cada comando tem um identificador único. Reenviar o mesmo comando retorna o resultado anterior, sem aplicá-lo novamente.
6. **Histórico corrigido por novos eventos:** uma operação confirmada é corrigida por estorno ou ajuste rastreável, não por edição destrutiva.
7. **Background Sync é apenas um auxílio:** a sincronização principal funciona com o PWA aberto; recursos do navegador em segundo plano não são requisito.

## 3. O que funciona offline na V1

### Operações previstas

- consultar o catálogo e os saldos já carregados no aparelho;
- cadastrar ou editar produto, categoria, fornecedor e ponto parceiro;
- registrar compra e entrada de estoque;
- enviar produto a ponto parceiro;
- registrar devolução;
- registrar venda direta ou informada por ponto parceiro;
- registrar perda, avaria e ajuste de inventário;
- registrar acerto, pagamento parcial e diferença acordada;
- consultar operações recentes já armazenadas localmente.

### Ações que exigem internet

- primeiro acesso e autenticação inicial no aparelho;
- verificação de e-mail e recuperação de senha;
- convite, bloqueio ou alteração de permissões de usuários;
- contratação, renovação e alteração de licença;
- cadastro ou bloqueio administrativo de aparelhos;
- exportações completas e rotinas administrativas da plataforma.

O bloqueio remoto de acesso passa a valer quando o aparelho se conecta novamente. A interface deve deixar essa limitação clara.

## 4. Dados no aparelho

O IndexedDB será dividido conceitualmente nos seguintes armazenamentos:

| Armazenamento | Conteúdo | Observação |
| --- | --- | --- |
| `local_meta` | versão do banco local, negócio, usuário, aparelho, último número de mudança recebido e última sincronização | um registro por instalação e negócio ativo |
| `catalog_cache` | categorias, produtos, fornecedores, pontos parceiros, preços e estoques mínimos | cópia autorizada do negócio |
| `operations_cache` | operações recentes e seus itens | últimos 180 dias ou 10.000 operações, o que for maior |
| `balances_cache` | saldo central confirmado por produto e local | atualizado pelo fluxo de mudanças |
| `outbox` | comandos locais pendentes, em envio ou com erro | nunca removido antes da confirmação central |
| `local_conflicts` | divergências que precisam de revisão | mantém o vínculo com o comando original |
| `pending_files` | anexos ainda não enviados, quando anexos entrarem no produto | não é obrigatório na primeira implementação |
| `sync_history` | resumo limitado das últimas sincronizações | útil para diagnóstico e suporte |

Os nomes físicos podem mudar na implementação. A separação lógica é obrigatória.

### Janela local e dados obrigatórios

- O aparelho mantém em `operations_cache` os últimos 180 dias ou 10.000 operações, o que for maior.
- Operações anteriores à janela exigem internet para consulta; elas não são apagadas do banco central.
- Para continuar lançando vendas offline, o aparelho precisa preservar produtos ativos, Pontos Parceiros, preços vigentes, saldos confirmados, movimentos locais pendentes, acertos pendentes, conflitos abertos e dependências da fila.
- Fotos, histórico antigo e diagnósticos de sincronização são dados opcionais e os primeiros candidatos à limpeza quando o armazenamento ficar baixo.
- Se não houver espaço para gravar com segurança um novo comando ou seus dados obrigatórios, o app avisa, tenta sincronizar e bloqueia o lançamento offline até liberar espaço ou recuperar conexão.
- Comandos pendentes nunca são removidos para abrir espaço sem uma confirmação explícita de possível perda.

### Saldo exibido

Enquanto houver operações pendentes, a interface distingue:

- **saldo sincronizado:** último saldo confirmado pelo banco central;
- **movimentos neste aparelho:** efeito dos comandos locais ainda pendentes;
- **saldo estimado:** saldo sincronizado mais os movimentos locais.

O saldo estimado não deve ser apresentado como se já estivesse confirmado na nuvem.

## 5. Formato de um comando

Cada ação offline gera um envelope com, no mínimo:

| Campo | Finalidade |
| --- | --- |
| `command_id` | UUID criado no aparelho e usado para impedir duplicidade |
| `business_id` | negócio ao qual a ação pertence |
| `user_id` | usuário que realizou a ação |
| `device_id` | instalação que originou o comando |
| `device_sequence` | ordem crescente dos comandos naquele aparelho |
| `command_type` | tipo da operação |
| `payload_version` | versão do formato do conteúdo |
| `occurred_at` | momento informado pelo aparelho em que o fato ocorreu |
| `created_local_at` | momento em que entrou na fila local |
| `base_versions` | versões dos registros lidos antes de uma edição concorrente |
| `dependencies` | IDs de comandos locais que precisam ser aceitos primeiro |
| `payload` | conteúdo específico da operação |

Produtos, operações e itens recebem UUID antes da sincronização. Assim, uma compra offline pode depender de um produto criado no mesmo aparelho.

### Tipos iniciais de comando

- criar, editar e arquivar cadastro;
- confirmar compra;
- confirmar envio ou devolução;
- confirmar venda direta ou de ponto parceiro;
- confirmar perda, avaria ou ajuste;
- abrir acerto;
- registrar pagamento;
- registrar estorno ou correção.

Rascunhos puramente locais não precisam ser enviados até a pessoa confirmar a ação.

## 6. Estados visíveis

| Estado técnico | Texto sugerido na interface | Significado |
| --- | --- | --- |
| `queued` | Salvo neste aparelho | está na fila e ainda não foi enviado |
| `waiting_connection` | Aguardando internet | não há conexão utilizável |
| `waiting_dependency` | Aguardando outra operação | depende de outro comando local ainda não aceito |
| `syncing` | Sincronizando | está sendo processado |
| `retry_wait` | Tentaremos novamente | falha temporária com nova tentativa agendada |
| `failed_transient` | Falha temporária | tentativa falhou, mas o comando pode ser reenviado |
| `accepted` | Sincronizado | foi aceito pelo banco central |
| `conflict` | Precisa revisar | o fato foi preservado, mas há divergência |
| `rejected` | Não foi enviado | permissão, licença ou dado inválido impediu a aceitação |

Uma operação só sai da `outbox` depois que a resposta central foi gravada em uma transação local. A resposta final permanece no `sync_history` dentro da janela local de 180 dias ou 10.000 operações.

## 7. Quando sincronizar

A aplicação tenta sincronizar:

- ao abrir ou voltar para o primeiro plano;
- quando o navegador sinalizar retorno da conexão;
- periodicamente enquanto estiver aberta e autenticada;
- quando a pessoa tocar em **Sincronizar agora**;
- opcionalmente, por Background Sync quando o navegador oferecer suporte.

Somente uma rotina de sincronização por aparelho pode processar a fila ao mesmo tempo.

## 8. Fluxo de envio

1. Verificar sessão, negócio ativo e conexão.
2. Selecionar comandos pendentes pela ordem do aparelho e respeitar dependências.
3. Enviar um lote pequeno ao servidor.
4. No servidor, validar licença, aparelho, vínculo do usuário, permissão, formato e pertencimento dos registros ao mesmo negócio.
5. Procurar o `command_id` na caixa de entrada central:
   - se já foi processado, devolver o resultado gravado;
   - se for novo, processar em transação única.
6. Gerar registros do domínio, movimentos de estoque, auditoria e mudanças incrementais.
7. Responder separadamente para cada comando: aceito, conflito, rejeitado, aguardando dependência ou falha temporária.
8. Gravar a resposta local antes de retirar o comando da fila.
9. Em seguida, buscar as mudanças centrais ainda não recebidas pelo aparelho.

Uma falha no meio do processo não pode produzir meia compra, meia venda ou saldo sem o respectivo documento.

## 9. Fluxo de recebimento

### Primeiro carregamento

Após o primeiro login online, o aparelho recebe uma fotografia consistente dos dados autorizados para aquele negócio e o número da última mudança incluída.

### Atualização incremental

1. O aparelho informa o último `change_sequence` aplicado.
2. O servidor devolve mudanças posteriores, em ordem crescente e por páginas.
3. O aparelho aplica cada página em uma transação local.
4. O marcador avança somente após a página inteira ser salva.
5. Se o histórico incremental não estiver mais disponível, o servidor solicita uma nova fotografia completa.

Uma mudança central não apaga uma proposta local pendente. Se as duas forem incompatíveis, a proposta permanece na fila e pode virar conflito.

## 10. Ordem e dependências

- Comandos de um mesmo aparelho são avaliados por `device_sequence`.
- Uma dependência precisa terminar como aceita antes do comando dependente.
- Entre aparelhos diferentes, vale a ordem de processamento do servidor, mas `occurred_at` é preservado para histórico.
- O relógio do aparelho não define sozinho quem tem prioridade.
- Uma edição concorrente usa `base_versions`; se a versão central mudou, não há sobrescrita automática.

## 11. Tratamento de conflitos

| Situação | Comportamento |
| --- | --- |
| venda ou envio comum sem saldo suficiente | rejeitar a operação sem criar saldo negativo |
| duas vendas offline consomem a última unidade | preservar as vendas, registrar saldo negativo como conflito, bloquear novas vendas/envios daquela combinação e alertar o Cliente 1 |
| preço do produto mudou enquanto uma venda estava offline | preservar na venda o preço efetivamente informado; atualizar o preço atual do catálogo separadamente |
| duas pessoas editaram o mesmo cadastro | manter a versão central e abrir revisão da proposta que partiu de uma versão antiga |
| produto foi arquivado enquanto havia operação offline | preservar a operação física válida, manter o produto arquivado e gerar aviso para revisão |
| comando foi reenviado | devolver o resultado anterior sem duplicar efeitos |
| referência pertence a outro negócio | rejeitar; nunca criar vínculo entre negócios |
| usuário perdeu permissão ou licença foi bloqueada | rejeitar novos comandos; manter a cópia local para diagnóstico e eventual exportação autorizada |
| pagamento deixa o acerto acima do valor acordado | preservar o pagamento informado, sinalizar excesso e exigir confirmação/correção rastreável |
| devolução ocorre depois de a venda entrar em acerto | criar ajuste de item; reduzir pendência aberta ou parcial, ou gerar crédito para próximo acerto se já estiver pago |
| quantidade de uma venda ultrapassa o que ainda pode entrar em acertos | rejeitar ou marcar `exceeded_allocation`; nunca exceder silenciosamente |
| falta campo obrigatório ou formato é incompatível | rejeitar com mensagem acionável; não descartar o conteúdo digitado |

As divergências devem registrar tipo, registros envolvidos, valores observados, comando de origem, datas, responsável pela resolução e ação aplicada.

## 12. Resolução de divergências

O Cliente 1 recebe um alerta e pode, conforme o tipo:

- owner ou admin pode confirmar o fato físico, registrar reposição futura e manter o conflito aberto somente até essa confirmação;
- lançar ajuste de inventário após conferência;
- estornar uma operação duplicada de verdade;
- aceitar ou substituir uma alteração de cadastro;
- justificar diferença de acerto;
- registrar devolução ou perda não informada.

Enquanto um conflito de estoque estiver aberto, vendas e envios do mesmo produto e localização ficam bloqueados. A resolução cria um novo evento, atualiza a projeção do saldo e preserva o movimento original.

A resolução cria um novo evento e preserva o original. Não existe botão genérico que apenas “apaga o conflito”.

## 13. Tentativas e falhas

- Falhas temporárias usam espera progressiva com limite máximo e nova tentativa manual disponível.
- O mesmo `command_id` é reutilizado em todas as tentativas.
- `attempt_count`, `last_attempt_at`, `next_attempt_at` e o último erro seguro ficam registrados no comando.
- Um comando em `processing` recebe prazo de processamento (`processing_expires_at`).
- Se o servidor cair ou perder o worker antes de concluir, o comando é marcado como interrompido no diagnóstico e volta para `retry_wait` após o prazo; o reprocessamento usa a mesma idempotência.
- Erro de validação ou permissão não entra em repetição infinita e termina como `rejected`.
- Um comando inválido não bloqueia para sempre comandos independentes posteriores.
- Comandos dependentes ficam em `waiting_dependency` até a dependência ser aceita ou corrigida.
- `failed_transient` indica falha temporária já registrada; ele pode seguir para nova tentativa automática ou manual.
- A interface mostra a última sincronização e a quantidade de itens pendentes.

## 14. Segurança e privacidade local

- O primeiro login no aparelho exige internet.
- A aplicação guarda somente os dados necessários ao negócio e ao uso offline.
- Tokens e dados sensíveis seguem as proteções oferecidas pelo navegador; a aplicação não promete segurança equivalente a um cofre criptográfico do sistema operacional.
- Sair da conta limpa dados locais somente depois de confirmar que não há comandos pendentes, ou mediante aviso explícito de possível perda.
- O PWA solicita armazenamento persistente quando suportado, mas trata a possibilidade de o navegador remover dados locais.
- O app monitora o espaço disponível quando o navegador permitir; ao atingir limite, remove dados opcionais antes de preservar fila, saldos, conflitos e cadastros mínimos.
- Sem espaço suficiente para persistir uma operação com segurança, novos lançamentos offline ficam bloqueados e a pessoa é orientada a sincronizar ou liberar espaço.
- Mensagens de suporte não incluem senha, token, conteúdo integral da fila ou dados sensíveis.
- Todo comando central é novamente validado por autenticação, permissão e RLS; dados locais nunca são confiados automaticamente.

## 15. Evolução de versões

Cada instalação mantém:

- versão do aplicativo;
- versão do esquema IndexedDB;
- versões de payload aceitas;
- marcador do fluxo de mudanças.

Atualizações do PWA devem executar migrações locais antes de liberar o uso. Um payload antigo suportado é convertido no servidor ou no cliente; uma versão incompatível fica preservada e solicita atualização, sem ser descartada.

## 16. Cenários de validação obrigatórios

1. **Produto e compra criados offline:** o produto sincroniza antes da compra dependente; a entrada ocorre uma vez.
2. **Duas vendas da última unidade:** ambas permanecem, o saldo fica negativo, a divergência chega ao Cliente 1 e novas vendas/envios daquela combinação ficam bloqueados.
3. **Resposta perdida:** o servidor aceita a venda, a conexão cai antes da resposta e o reenvio não duplica a saída.
4. **Preço alterado em outro aparelho:** a venda offline mantém o preço digitado e o catálogo recebe o novo preço vigente.
5. **Pagamento parcial offline:** o pagamento reduz o saldo do acerto uma única vez e mantém a diferença calculada separada da acordada.
6. **Permissão revogada:** o comando novo é rejeitado com motivo claro, sem sumir do aparelho.
7. **Aplicativo fechado:** ao reabrir com internet, a fila retoma do ponto seguro.
8. **Falha durante atualização local:** o marcador não avança e a mesma página pode ser reaplicada com segurança.
9. **Worker interrompido:** comando deixado em `processing` expira, volta para tentativa e não duplica a operação.
10. **Aparelho offline além da retenção:** o servidor exige fotografia completa antes de liberar o cursor incremental.
11. **Armazenamento cheio:** dados opcionais são limpos primeiro; sem espaço para a fila, novo lançamento offline é bloqueado.
12. **Venda dividida em acertos:** duas linhas usam quantidades distintas sem ultrapassar a quantidade vendida.
13. **Devolução depois de acerto pago:** a devolução gera crédito ou ajuste futuro sem apagar pagamento ou venda.

## 17. Critério de pronto para implementação

Com as decisões deste lote, o desenho está pronto para virar código. O lote de implementação deverá preservar:

- os dados locais mínimos;
- os estados e textos visíveis;
- o envelope e os tipos de comando;
- as políticas de conflito;
- as regras de alocação, devolução e crédito dos acertos;
- a janela local de 180 dias ou 10.000 operações;
- a recuperação de comandos interrompidos e a política de armazenamento cheio;
- os cenários obrigatórios de teste;
- a relação com as tabelas descritas em `MODELO_DADOS.md`.

O lote seguinte pode criar as migrations SQL, políticas RLS e contratos versionados de sincronização, ainda sem construir todas as telas.
