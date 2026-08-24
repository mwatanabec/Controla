# Regras de negócio

Este documento consolida as regras funcionais conhecidas do Maria Controla sem definir banco de dados, stack ou arquitetura técnica.

## Princípio central

**Mercadoria nunca desaparece.** Cada unidade deve estar associada a uma localização ou a um status conhecido, e toda mudança relevante deve preservar histórico.

Estados e situações possíveis incluem:

- estoque próprio;
- estoque em Ponto Parceiro;
- vendida e pendente de acerto;
- acertada ou paga;
- devolvida;
- perdida ou avariada;
- ajustada manualmente.

## Produtos

- Produto representa a mercadoria controlada pelo cliente.
- Cada negócio possui seu próprio catálogo; produtos, custos e preços não são compartilhados entre clientes.
- Nome é a identificação mínima do produto.
- Categoria, foto, preço de venda padrão, unidade e observação podem complementar o cadastro.
- Cada novo negócio recebe uma base inicial de categorias e pode criar, editar ou desativar suas próprias categorias.
- No MVP, cada variação relevante de tamanho, cor ou modelo deve ser tratada como um produto separado.
- Um Ponto Parceiro pode ter preço específico para um produto; na ausência dele, vale o preço padrão do produto.
- O preço sugerido na venda pode ser alterado pelo usuário, e o preço efetivamente utilizado deve ficar preservado no histórico da venda.

## Compras e fornecedores

- Uma compra deve identificar produto, fornecedor, quantidade, preço unitário e data.
- Registrar uma compra aumenta o estoque próprio.
- A compra deve preservar o histórico do fornecedor e do preço pago.
- Observações e comprovantes podem ser opcionais.

## Estoque

- Estoque próprio e estoque em Pontos Parceiros são quantidades distintas.
- Enviar mercadoria a um parceiro não representa venda.
- Quantidades vendidas, devolvidas, perdidas ou ajustadas não devem ser confundidas.
- Ajustes manuais precisam de registro para não apagar o histórico.

## Pontos Parceiros e envios

- Ponto Parceiro é a pessoa ou o local que recebe mercadorias do cliente.
- Um envio reduz o estoque próprio e aumenta o estoque do parceiro na mesma quantidade.
- O envio deve registrar parceiro, produto, quantidade e data.
- Enquanto houver mercadoria ou valor pendente, o acompanhamento do envio permanece aberto.

## Venda informada

- Na V1, a venda realizada por um parceiro é registrada manualmente pelo cliente pagante.
- A venda reduz a quantidade disponível no parceiro.
- A venda cria uma pendência de acerto.
- Venda informada não significa pagamento recebido.
- O Cliente 1 também pode registrar venda direta, que reduz o estoque próprio e não cria acerto com Ponto Parceiro.
- Cada item vendido preserva o preço utilizado no lançamento.

## Devolução, perda e avaria

- A devolução reduz o estoque do parceiro e aumenta o estoque próprio.
- Perda ou avaria deve ser registrada separadamente de venda e devolução.
- Mercadoria perdida ou avariada não retorna automaticamente ao estoque disponível.

## Acertos

- O acerto deve distinguir quantidade vendida, valor pendente e valor já acertado.
- Um acerto deve estar vinculado ao Ponto Parceiro e preservar histórico.
- A confirmação de pagamento não pode apagar o registro da venda que originou a pendência.
- Um acerto pode ter pagamentos parciais.
- O sistema calcula o valor pendente a partir das vendas, mas o valor acordado é editável.
- Valor calculado e valor acordado devem ser armazenados separadamente.
- Quando houver diferença, o usuário pode registrar uma justificativa.

## Reposição

- A reposição inicial será orientada pelo estoque mínimo do produto em cada localização.
- A consulta deve diferenciar estoque próprio de estoque total distribuído.
- Estoque próprio e cada Ponto Parceiro podem ter valores mínimos diferentes para o mesmo produto.
- Último fornecedor e último preço pago podem apoiar a decisão de compra.
- Recomendações avançadas baseadas em giro permanecem fora do MVP.

## Operação offline e sincronização

- Depois do primeiro acesso e de uma sincronização, as rotinas principais da V1 devem continuar disponíveis sem internet.
- Uma operação offline deve ser salva no aparelho com identificação única e situação pendente.
- Uma operação pendente não pode ser apresentada como confirmada na nuvem.
- A interface deve distinguir dados locais, sincronização em andamento, confirmação no servidor e conflito que exige revisão.
- A repetição da mesma operação durante a sincronização não pode duplicar compra, envio, venda, devolução, perda, ajuste ou acerto.
- A sincronização deve ocorrer quando a conexão voltar com o app aberto, quando o app for reaberto e quando o usuário solicitar manualmente.
- A sincronização em segundo plano pode ser usada quando suportada, mas não deve ser a única forma de enviar pendências.
- Conflitos entre aparelhos não podem apagar ou sobrescrever silenciosamente os eventos registrados.
- Quando duas operações concorrentes gerarem divergência, o histórico deve ser preservado e a situação deve ser encaminhada para conferência ou ajuste rastreável.
- Primeiro acesso, recuperação de senha, gestão de usuários, licença e administração da plataforma exigem internet.
- Dados ainda não sincronizados podem ser perdidos se o armazenamento do navegador for apagado; o app deve avisar enquanto existirem pendências locais.

## Acessos

- O cliente pagante é o dono dos dados do seu negócio.
- O cadastro inicial do usuário exige nome completo, e-mail verificado por código, nome de usuário e senha.
- O login deve aceitar nome de usuário e senha; e-mail permanece como identidade verificada e meio de recuperação.
- Usuários internos acessam apenas o negócio ao qual pertencem.
- Um futuro usuário de Ponto Parceiro verá somente as mercadorias e operações relacionadas a ele.
- O parceiro não deve acessar fornecedores, custos, lucro, estoque total, outros parceiros, plano ou configurações do cliente.

## Suporte

- A V1 deve oferecer acesso ao suporte pelo WhatsApp.
- A mensagem pode incluir código público do negócio, usuário, tela, versão do app, data, hora, quantidade de pendências e código do erro.
- Senhas, tokens e dados comerciais sensíveis não podem ser inseridos automaticamente na mensagem.
- Sem internet, o app pode preparar ou copiar a mensagem para envio posterior.

## Limites funcionais da V1

- Não haverá lançamento direto pelo parceiro.
- Não haverá emissão fiscal, OCR, bot de WhatsApp ou financeiro completo.
- Não haverá automação que transforme mensagens em movimentações.
- Não haverá personalização específica por cliente como comportamento padrão do produto.
