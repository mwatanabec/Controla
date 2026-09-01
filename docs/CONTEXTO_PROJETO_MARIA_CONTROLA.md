# CONTEXTO DO PROJETO — MARIA CONTROLA

> Documento de contexto inicial do produto, criado para retomada do projeto em uma nova sessão de IA.
>
> **Importante:** este documento não duplica a arquitetura técnica.  
> A arquitetura vigente foi aprovada posteriormente e está registrada em `docs/ARQUITETURA.md`. Este arquivo permanece como fonte do problema, visão de produto, público, personas, escopo, regras, riscos, MVP e roadmap conceitual.

---

## 1. Nome provisório do projeto

### Nome do produto

**Maria Controla**

### Marca guarda-chuva

**MarIA Soluções** / **MarIA Consultoria**

### Cliente piloto

**Anona Presentes**

### Observação sobre nomenclatura

O nome **Anona Presentes** deve ser tratado como **cliente piloto/case inicial**, não como nome do produto.

O produto deve ser pensado para atender outros pequenos comerciantes, revendedores e pessoas que trabalham com mercadorias próprias ou consignadas.

A intenção estratégica é criar uma família de produtos sob a marca MarIA, como:

- Maria Controla;
- Maria Estoque;
- Maria Compras;
- Maria Consigna;
- Maria Caixa;
- Maria Vende;
- Maria Agenda.

Neste momento, o nome mais adequado para o produto é **Maria Controla**, pois ele é mais amplo do que apenas estoque. O produto envolve compras, fornecedores, controle de mercadorias, pontos parceiros, consignado, vendas informadas, devoluções, acertos e reposição.

---

## 2. Resumo executivo do projeto

O **Maria Controla** é um produto digital simples, com foco inicial em mobile, voltado para pequenos comerciantes, revendedores e pessoas que compram mercadorias e precisam controlar onde estão seus produtos, quanto compraram, de quem compraram, o que foi vendido, o que foi deixado em pontos parceiros e quanto ainda precisa ser acertado.

A dor central é que muitos desses comerciantes ainda controlam suas mercadorias por:

- planilhas;
- anotações em papel;
- rascunhos;
- rasuras;
- conversas no WhatsApp;
- memória;
- notas fiscais soltas;
- cadernos;
- fotos de comprovantes;
- acordos informais com parceiros.

Isso gera perda de controle, esquecimento, compra em cima da hora, dificuldade de saber o que está acabando, dificuldade de lembrar de quem comprou mais barato, falta de histórico, problemas em acertos de consignado e dependência de organização manual.

A proposta do Maria Controla é ser uma **caderneta inteligente de mercadorias**, não um ERP completo.

A promessa inicial do produto pode ser resumida como:

> Controle suas mercadorias, compras e consignados pelo celular, sem depender de papel, planilha ou conversa perdida no WhatsApp.

Ou, em uma versão ainda mais focada no nicho de consignado:

> Saiba onde estão suas mercadorias, o que vendeu, o que voltou e quanto falta acertar.

---

## 3. Origem da ideia

A ideia surgiu a partir de um contexto real em Feira de Santana, especialmente em ambientes como o **Feiraguai**, um centro popular de compras onde pequenos comerciantes compram e revendem mercadorias, muitas vezes de origem importada ou compradas mais barato.

Muitos desses comerciantes não possuem sistemas simples e adequados ao seu dia a dia. O controle costuma ser informal, manual ou fragmentado.

O primeiro caso concreto observado foi o dos pais do Vinícius, marido e sócio da Maria, que trabalham com mercadorias em formato de consignado. Eles compram produtos mais baratos e deixam essas mercadorias em outros comércios, recuperando depois sua parte conforme as vendas acontecem.

Esse processo hoje não possui ferramenta estruturada de controle.

Depois, surgiu um segundo caso real importante: uma manicure demonstrou interesse em um app parecido. Ela pretende comprar cerca de 200 pares de chinelos e outros produtos, deixando essas mercadorias em lojas parceiras, estéticas, salões de beleza e com outras manicures. Ela também precisa controlar:

- onde deixou cada produto;
- quais produtos foram vendidos;
- quais voltaram;
- quanto está pendente de acerto;
- quanto ainda tem em estoque próprio;
- quando precisa repor mercadorias.

Esse segundo caso foi importante porque mostrou que a dor não é exclusiva da Anona Presentes ou do Feiraguai. Existe um padrão de mercado:

> Pessoas que compram mercadorias, distribuem em pontos parceiros ou consignados e precisam controlar onde está cada item, o que vendeu, o que voltou e quanto falta acertar.

---

## 4. Tese central do produto

O Maria Controla deve ser pensado como um produto para pequenos comerciantes e revendedores que precisam controlar mercadorias próprias e consignadas em múltiplos pontos parceiros.

Ele não deve nascer como:

- ERP completo;
- sistema fiscal;
- sistema financeiro completo;
- PDV completo;
- plataforma complexa de gestão empresarial;
- sistema altamente customizável por cliente;
- app cheio de telas e cadastros burocráticos.

Ele deve nascer como:

- app simples;
- mobile-first;
- rápido de usar;
- fácil de entender;
- focado em mercadorias;
- orientado a rotinas reais do comerciante;
- com linguagem simples;
- com poucos campos obrigatórios;
- preparado para evoluir, mas sem nascer complexo.

A tese do produto é:

> Pequenos comerciantes não precisam inicialmente de um ERP. Eles precisam de uma forma simples e confiável de saber o que compraram, onde está cada mercadoria, o que foi vendido, o que precisa repor e quanto ainda falta acertar.

---

## 5. Público-alvo

### Público principal

Pequenos comerciantes, revendedores, autônomos e microempreendedores que lidam com mercadorias físicas e ainda controlam seus produtos de forma manual ou informal.

### Perfis com alta aderência

- comerciantes de centros populares de compras;
- revendedores de acessórios;
- revendedores de presentes;
- vendedores de chinelos;
- manicures que revendem produtos;
- salões e estéticas que recebem mercadorias para revenda;
- vendedores de semijoias;
- vendedores de bijuterias;
- vendedores de cosméticos;
- vendedores de roupas íntimas;
- pequenos distribuidores;
- pessoas que deixam produtos em pontos parceiros;
- comerciantes que compram de vários fornecedores;
- pessoas que trabalham com consignado informal.

### Critérios de aderência

O produto tende a fazer sentido quando o cliente:

- compra mercadorias em quantidade;
- vende ou distribui em mais de um local;
- deixa produtos com parceiros;
- precisa fazer acertos periódicos;
- controla tudo em papel, WhatsApp ou planilha;
- não sabe exatamente o estoque atual;
- esquece onde deixou mercadorias;
- compra produtos em cima da hora porque não percebeu que estava acabando;
- não lembra o fornecedor mais barato;
- mistura estoque próprio com estoque em terceiros;
- sente que perde dinheiro por falta de controle.

---

## 6. Problemas que o produto quer resolver

### 6.1 Falta de controle de estoque

O comerciante não sabe exatamente:

- quantas unidades tem;
- onde estão as unidades;
- quais produtos estão acabando;
- quais produtos estão parados;
- quais produtos foram enviados para terceiros;
- quais produtos foram vendidos e ainda não acertados.

### 6.2 Controle manual e fragmentado

As informações ficam espalhadas em:

- cadernos;
- papel;
- conversas de WhatsApp;
- fotos;
- planilhas;
- notas fiscais;
- memória do dono;
- mensagens de parceiros.

### 6.3 Falta de histórico de compras

O comerciante muitas vezes não sabe:

- de quem comprou;
- quanto pagou;
- quando comprou;
- qual fornecedor foi mais barato;
- qual fornecedor atrasou;
- qual fornecedor entregou produto melhor ou pior.

### 6.4 Compra em cima da hora

Sem alerta de reposição, o comerciante só percebe que precisa comprar quando o produto já está acabando ou acabou.

Isso pode gerar:

- perda de venda;
- compra emergencial mais cara;
- desorganização;
- falta de produto em ponto parceiro.

### 6.5 Dificuldade no consignado

No consignado, o problema é ainda maior, porque a mercadoria sai do estoque principal, mas não necessariamente foi vendida.

É preciso saber:

- para quem foi enviada;
- quando foi enviada;
- quantas unidades foram enviadas;
- quantas venderam;
- quantas voltaram;
- quantas foram perdidas;
- quanto está pendente de acerto;
- quanto já foi acertado.

### 6.6 Falta de clareza nos acertos

Sem controle, o acerto entre Cliente 1 e Cliente 2 pode depender de confiança, memória e mensagens soltas.

O app deve ajudar a tornar esse processo mais claro, registrando movimentações e pendências.

### 6.7 Baixa maturidade tecnológica do público

Muitos usuários podem ter dificuldade com tecnologia, usar celulares simples ou antigos, ter internet instável e pouca paciência para sistemas complexos.

Por isso, o produto precisa ser extremamente simples.

---

## 7. Personas do produto

O produto possui três grupos principais de personas.

---

### 7.1 Persona 0 — Maria / Admin da Plataforma

**Quem é:**  
Maria é a desenvolvedora, owner do produto e responsável pela operação da plataforma.

**Papel no produto:**  
Admin da Plataforma.

**Responsabilidades:**

- cadastrar clientes pagantes;
- controlar planos;
- controlar licenças;
- bloquear ou liberar acesso;
- resetar senha;
- liberar dispositivos;
- acompanhar uso básico;
- prestar suporte;
- entender problemas recorrentes;
- decidir evolução do produto;
- proteger o produto contra compartilhamento indevido;
- manter a visão de produto simples e sustentável.

**Necessidades no sistema:**

- painel interno de clientes;
- lista de clientes ativos, vencidos, bloqueados e em teste;
- controle de plano por cliente;
- controle de vencimento da licença;
- limite de usuários;
- limite de dispositivos;
- ações de suporte;
- observações internas;
- histórico básico de uso;
- possibilidade de bloquear ou renovar manualmente.

**Observação importante:**  
Maria é administradora da plataforma, mas o produto não deve depender dela para rotinas manuais o tempo todo. O painel administrativo existe para suporte e controle comercial, não para virar operação diária pesada.

---

### 7.2 Persona 1 — Cliente direto / Dono do negócio

**Quem é:**  
É o cliente pagante do Maria Controla.

Exemplos:

- Anona Presentes;
- manicure que comprará chinelos;
- comerciante do Feiraguai;
- revendedor de presentes;
- vendedor de semijoias;
- pequeno distribuidor.

**Papel no produto:**  
Dono do Negócio.

**O que essa pessoa faz:**

- compra mercadorias;
- controla estoque próprio;
- deixa mercadorias com pontos parceiros;
- acompanha vendas feitas por parceiros;
- faz acertos;
- repõe mercadorias;
- consulta fornecedores;
- decide o que comprar novamente.

**Necessidades principais:**

- cadastrar produtos de forma rápida;
- registrar compras;
- saber estoque atual;
- saber onde cada mercadoria está;
- controlar pontos parceiros;
- registrar envio de mercadorias para parceiros;
- registrar vendas informadas pelos parceiros;
- registrar devoluções;
- controlar acertos;
- ver pendências;
- saber o que precisa repor;
- consultar último preço pago;
- consultar fornecedor mais barato da última compra.

**O que essa pessoa NÃO quer:**

- sistema difícil;
- linguagem técnica;
- muitas telas;
- muitos campos obrigatórios;
- relatórios complexos;
- burocracia;
- parecer que está usando um ERP.

---

### 7.3 Persona 2 — Parceiro consignado / Cliente do cliente

**Quem é:**  
É a pessoa ou estabelecimento que recebe mercadorias do Cliente 1 para vender ou manter em consignado.

Exemplos:

- salão de beleza;
- estética;
- loja parceira;
- manicure parceira;
- comércio onde foram deixados produtos;
- ponto de venda parceiro.

**Papel no produto:**  
Ponto Parceiro ou Parceiro Consignado.

**Importante:**  
Essa pessoa não é cliente pagante direto da plataforma. Ela é convidada ou vinculada ao Cliente 1.

**Necessidades futuras:**

- ver apenas os produtos que recebeu;
- informar que vendeu X unidades;
- informar devolução;
- talvez informar perda ou avaria;
- ver quanto está pendente de acerto, caso o Cliente 1 queira mostrar;
- pedir reposição;
- acompanhar seu próprio histórico.

**Limites de acesso:**

O Parceiro Consignado não deve ver:

- fornecedores do Cliente 1;
- custo de compra;
- lucro;
- outros parceiros;
- estoque total;
- dados financeiros gerais;
- dados de outros clientes;
- configurações;
- plano/licença.

**Status no roadmap:**  
A área do parceiro é uma ideia muito válida, mas deve ser tratada como **versão futura**. No MVP, o Cliente 1 lança manualmente as vendas e devoluções informadas pelos parceiros.

---

## 8. Conceitos de negócio

### 8.1 Produto

Mercadoria controlada pelo cliente.

Exemplos:

- chinelo floral 37/38;
- capinha de celular;
- carregador;
- brinco;
- colar;
- presente decorativo;
- cosmético;
- acessório.

Produto pode ter:

- nome;
- categoria;
- foto;
- variação;
- custo;
- preço de venda padrão;
- preço específico por Ponto Parceiro;
- estoque mínimo por localização;
- observações.

Cada negócio possui seu próprio catálogo. Uma base inicial de categorias será copiada para novos clientes, que poderão criar, editar ou desativar suas categorias sem compartilhar produtos, custos ou preços com outros negócios.

### 8.2 Variações de produto

Alguns produtos possuem variações, como tamanho, cor ou modelo.

Exemplo:

- Chinelo Floral 35/36;
- Chinelo Floral 37/38;
- Chinelo Floral 39/40.

Para o MVP, recomenda-se evitar uma estrutura sofisticada de grade/variações. O caminho mais simples é tratar cada variação relevante como um produto separado.

Isso reduz complexidade para o usuário e para o produto inicial.

### 8.3 Fornecedor

Pessoa ou empresa de quem o Cliente 1 compra mercadorias.

Fornecedor pode ter:

- nome;
- telefone/WhatsApp;
- localização;
- observações;
- produtos comprados;
- histórico de preços.

### 8.4 Compra

Registro de entrada de mercadoria comprada de um fornecedor.

Uma compra deve registrar:

- produto;
- fornecedor;
- quantidade;
- preço unitário;
- data;
- observação;
- comprovante/foto opcional no futuro.

A compra aumenta o estoque próprio do Cliente 1.

### 8.5 Estoque próprio

Mercadorias que estão em posse direta do Cliente 1.

Exemplo:

- mercadorias guardadas em casa;
- mercadorias na loja própria;
- mercadorias no box;
- mercadorias ainda não enviadas para parceiros.

### 8.6 Ponto Parceiro

Local ou pessoa que recebe mercadorias do Cliente 1.

Exemplos:

- Salão Bella;
- Estética da Ana;
- Loja da Joana;
- Manicure Carla;
- Comércio X.

O termo recomendado para interface é **Pontos Parceiros**, pois é mais simples e amigável do que termos como consignatário, cliente do cliente ou local de estoque.

### 8.7 Envio para parceiro

Movimento em que o Cliente 1 envia mercadorias do estoque próprio para um Ponto Parceiro.

Esse movimento deve:

- reduzir o estoque próprio;
- aumentar o estoque no ponto parceiro;
- criar ou atualizar um consignado em aberto;
- registrar data;
- registrar responsável;
- manter histórico.

### 8.8 Venda informada

Registro de que uma mercadoria foi vendida pelo parceiro ou em um ponto parceiro.

No MVP, essa venda será lançada manualmente pelo Cliente 1.

O Cliente 1 também poderá registrar uma venda direta, reduzindo seu estoque próprio sem criar pendência de acerto com um Ponto Parceiro.

Ao lançar uma venda em parceiro, o sistema deve sugerir primeiro o preço específico daquele ponto e, quando ele não existir, o preço padrão do produto. O usuário pode alterar o preço do lançamento, e o valor efetivamente usado deve permanecer no histórico.

Na V2, o Parceiro Consignado poderá informar a venda diretamente em uma área limitada.

### 8.9 Devolução

Registro de que mercadorias enviadas para um parceiro voltaram para o Cliente 1.

A devolução deve:

- reduzir estoque no ponto parceiro;
- aumentar estoque próprio;
- registrar histórico.

### 8.10 Perda ou avaria

Registro de mercadoria perdida, danificada ou que não voltará ao estoque.

Esse evento deve ser separado de venda e devolução.

### 8.11 Acerto

Momento em que Cliente 1 e Ponto Parceiro conferem o que foi vendido, devolvido e pendente.

O sistema deve separar:

- vendido;
- pendente de acerto;
- acertado/pago;
- devolvido;
- perdido/avariado.

Isso é fundamental porque uma venda informada pelo parceiro não significa necessariamente que o dinheiro já foi recebido pelo Cliente 1.

### 8.12 Reposição

Processo de identificar produtos que precisam ser comprados novamente.

A reposição deve considerar:

- estoque próprio;
- estoque mínimo;
- produtos em pontos parceiros;
- giro/venda;
- último fornecedor;
- fornecedor mais barato da última compra.

No MVP, a reposição pode ser simples, baseada em estoque mínimo.

---

## 9. Regra central do produto

A regra conceitual mais importante é:

> Mercadoria nunca desaparece. Ela sempre está em algum lugar ou em algum status.

Estados ou localizações possíveis:

- em estoque próprio;
- enviada para ponto parceiro;
- vendida pelo parceiro;
- pendente de acerto;
- acertada/paga;
- devolvida;
- perdida/avariada;
- ajustada manualmente.

Essa regra deve orientar toda a modelagem futura.

O sistema precisa evitar que o usuário simplesmente “perca” o histórico de uma mercadoria. Toda mudança relevante deve ser registrada como movimento ou evento.

---

## 10. Escopo da V1 / MVP

O MVP deve validar a dor principal sem criar complexidade excessiva.

### Objetivo da V1

Permitir que o Cliente 1 controle suas mercadorias, compras, estoque próprio, pontos parceiros, envios, vendas informadas manualmente, devoluções, acertos e reposição básica.

### Na V1, quem usa?

Apenas o Cliente 1 e seus usuários internos.

O Cliente 2 / Parceiro Consignado ainda não terá área própria.

### Módulos da V1

#### 10.1 Início

Tela inicial mobile-first com visão rápida de:

- produtos acabando;
- estoque crítico;
- envios em aberto;
- acertos pendentes;
- compras recentes;
- botões rápidos para ações principais.

A tela inicial deve responder rapidamente:

- o que preciso comprar?
- onde tenho pendências?
- o que está acabando?
- o que preciso acertar?

#### 10.2 Produtos

Cadastrar, editar e consultar produtos.

Campos mínimos:

- nome;
- categoria;
- foto opcional;
- estoque mínimo;
- unidade;
- observação.

#### 10.3 Fornecedores

Cadastrar e consultar fornecedores.

Campos mínimos:

- nome;
- telefone/WhatsApp;
- observação.

O sistema deve guardar histórico de compras por fornecedor.

#### 10.4 Compras

Registrar compra de mercadorias.

Campos mínimos:

- produto;
- fornecedor;
- quantidade;
- preço unitário;
- data;
- observação.

Resultado esperado:

- aumenta estoque próprio;
- grava histórico de compra;
- atualiza referência de último preço pago;
- permite comparar fornecedores futuramente.

#### 10.5 Estoque

Consultar quantidade atual de produtos.

O estoque deve diferenciar:

- estoque próprio;
- estoque em pontos parceiros;
- quantidade vendida pendente de acerto;
- quantidade devolvida;
- perdas/avarias.

#### 10.6 Pontos Parceiros

Cadastrar locais ou pessoas que recebem mercadorias.

Campos mínimos:

- nome;
- telefone;
- tipo opcional: salão, loja, estética, manicure, outro;
- observação.

#### 10.7 Envio para parceiro

Registrar envio de produtos para um ponto parceiro.

Campos mínimos:

- parceiro;
- produto;
- quantidade;
- data;
- observação.

Resultado esperado:

- reduz estoque próprio;
- aumenta estoque do parceiro;
- cria pendência de acompanhamento.

#### 10.8 Venda informada

Registrar que o parceiro vendeu X unidades.

Na V1, isso será feito pelo Cliente 1.

Resultado esperado:

- reduz quantidade disponível no parceiro;
- aumenta pendência de acerto;
- registra histórico.

#### 10.9 Devolução

Registrar que o parceiro devolveu produtos.

Resultado esperado:

- reduz estoque do parceiro;
- aumenta estoque próprio;
- registra histórico.

#### 10.10 Acertos

Controlar valores e quantidades pendentes com cada parceiro.

A tela deve mostrar:

- parceiro;
- produtos vendidos;
- quantidade vendida;
- valor pendente;
- status do acerto;
- histórico de acertos.

#### 10.11 Reposição

Mostrar produtos que precisam de atenção.

Na V1, a reposição pode ser baseada em estoque mínimo.

A tela pode mostrar:

- produto;
- estoque próprio;
- estoque total;
- mínimo definido;
- sugestão de compra;
- último fornecedor;
- último preço pago.

#### 10.12 Licenças e acesso

Mesmo na V1, o produto precisa prever controle comercial e proteção contra compartilhamento indevido.

Regras iniciais:

- licença por negócio;
- cliente tem plano;
- plano define limite de usuários;
- plano define limite de dispositivos;
- usuário pertence a um negócio;
- ações de escrita dependem de licença ativa;
- admin da plataforma pode bloquear, renovar ou liberar dispositivo.

---

## 11. Fora de escopo da V1

Para evitar que o produto nasça grande demais, os seguintes itens ficam fora da V1:

- área própria do parceiro consignado;
- convite por link para parceiro;
- parceiro lançar venda diretamente;
- bot de WhatsApp;
- IA interpretando mensagens;
- leitura automática de notas;
- OCR;
- emissão de nota fiscal;
- integração fiscal;
- gateway de pagamento;
- assinatura automática;
- financeiro completo;
- contas a pagar;
- contas a receber completo;
- fluxo de caixa;
- PDV completo;
- catálogo público;
- e-commerce;
- personalização por cliente;
- relatórios avançados;
- multiempresa complexa;
- integração com fornecedores;
- leitura de código de barras obrigatória.

Esses itens podem entrar no roadmap, mas não devem travar o MVP.

---

## 12. Roadmap conceitual

### V1 — Controle manual pelo Cliente 1

Objetivo: validar o núcleo do produto.

Inclui:

- produtos;
- fornecedores;
- compras;
- estoque próprio;
- pontos parceiros;
- envio para parceiro;
- venda informada manualmente;
- devolução;
- acertos;
- reposição básica;
- licenças e acesso.

### V2 — Área do parceiro

Objetivo: permitir que o Cliente 2 atualize informações do seu próprio consignado.

Inclui:

- convite para parceiro;
- acesso limitado;
- parceiro vê apenas mercadorias enviadas para ele;
- parceiro informa venda;
- parceiro informa devolução;
- parceiro solicita reposição;
- Cliente 1 acompanha;
- Cliente 1 confirma acertos.

### V3 — WhatsApp e automação conversacional

Objetivo: reduzir atrito para usuários que preferem mandar mensagem.

Exemplos:

- parceiro envia mensagem dizendo que vendeu X produtos;
- bot interpreta;
- sistema pede confirmação;
- venda é registrada;
- resumo de acerto é enviado.

### V4 — Inteligência e recomendações

Objetivo: apoiar decisões de compra e reposição.

Possibilidades:

- sugestão de compra com base em giro;
- fornecedor recomendado;
- produtos parados;
- produtos com maior saída;
- previsão de reposição;
- alertas inteligentes.

### V5 — Fiscal, notas e integrações

Objetivo: evoluir para recursos mais avançados, se fizer sentido comercialmente.

Possibilidades:

- leitura de nota por foto;
- importação de XML;
- emissão fiscal via parceiro;
- integração com sistemas externos;
- exportação para contador.

---

## 13. Licenças, acesso e proteção comercial

Este ponto é crítico para o produto. O modelo SaaS foi aprovado: a MarIA Soluções manterá o produto, a infraestrutura compartilhada e o banco central, enquanto cada cliente contratará uma licença vinculada ao seu negócio e plano.

O app não deve funcionar livremente apenas porque foi instalado ou acessado. O controle deve estar vinculado a conta, licença e backend.

### Risco que precisa ser evitado

- cliente pagar uma licença e compartilhar login com outros comerciantes;
- cliente usar uma conta para vários negócios fora do plano;
- ex-funcionário continuar acessando;
- cliente inadimplente continuar usando;
- uso sem limite de dispositivos;
- suporte para pessoas que não são clientes pagantes;
- perda de controle sobre quem acessa o quê.

### Modelo aprovado

Licença por negócio/cliente.

Cada cliente deve ter:

- nome do negócio;
- responsável;
- telefone;
- plano;
- status;
- data de início;
- data de vencimento;
- limite de usuários;
- limite de dispositivos;
- observações internas.

### Status de licença

Possíveis status:

- teste/trial;
- ativo;
- vencido em tolerância;
- bloqueado;
- cancelado;
- interno/teste.

### Regra de acesso

Toda ação relevante de escrita deve validar se a licença está ativa.

Se a licença estiver vencida dentro da tolerância, o app pode mostrar aviso.

Se a licença estiver bloqueada, o app pode permitir visualização limitada, mas bloquear novos lançamentos.

### Dispositivos

O sistema deve prever limite de dispositivos por plano.

Exemplo:

- Piloto Local: 1 usuário, 2 dispositivos;
- Essencial: 2 usuários, 3 dispositivos;
- Consignado: 3 usuários, 5 dispositivos;
- Equipe: 5 usuários, 8 dispositivos.

Se o limite for atingido, o sistema deve pedir liberação pelo suporte/admin.

---

## 14. Possíveis planos e precificação inicial

A precificação ainda é hipótese e deve ser validada.

### Plano Piloto Local

Preço sugerido: **R$29/mês**

Indicado para primeiros clientes e validação.

Inclui:

- 1 negócio;
- 1 usuário;
- até 2 dispositivos;
- produtos;
- fornecedores;
- compras;
- estoque;
- reposição simples.

### Plano Essencial

Preço sugerido: **R$39/mês**

Inclui:

- 1 negócio;
- até 2 usuários;
- até 3 dispositivos;
- produtos;
- fornecedores;
- compras;
- estoque;
- pontos parceiros;
- lançamentos manuais;
- acertos básicos.

### Plano Consignado

Preço sugerido: **R$59 a R$69/mês**

Inclui:

- 1 negócio;
- até 3 usuários;
- até 5 dispositivos;
- tudo do Essencial;
- controle mais completo de pontos parceiros;
- acertos;
- relatórios por parceiro;
- no futuro, acesso de parceiros convidados.

### Plano Crescimento

Preço sugerido: **R$89 a R$99/mês**

Inclui:

- 1 negócio;
- até 5 usuários;
- até 8 dispositivos;
- mais pontos parceiros;
- relatórios melhores;
- suporte prioritário.

### Adicionais futuros

- usuário extra;
- dispositivo extra;
- ponto parceiro extra;
- implantação assistida;
- importação inicial de produtos;
- suporte premium.

---

## 15. Suporte e riscos operacionais

### 15.1 Risco: usuário com baixa maturidade tecnológica

Muitos clientes podem ter dificuldade com tecnologia.

Consequências:

- podem achar que o app não funciona quando o celular trava;
- podem não saber atualizar;
- podem esquecer senha;
- podem não entender diferença entre venda, acerto e devolução;
- podem querer suporte para tudo.

Mitigação:

- interface simples;
- poucos campos obrigatórios;
- linguagem popular;
- tutoriais curtos;
- vídeos rápidos;
- suporte por WhatsApp com regras claras;
- checklist de diagnóstico;
- requisitos mínimos de celular.

### 15.2 Risco: celular ruim ou internet instável

O produto deve ser leve e rápido.

A experiência mobile precisa ser prioridade.

A V1 deve permitir operação offline nas rotinas principais depois do primeiro acesso e sincronizar as pendências quando houver conexão. O app precisa distinguir o que está somente no aparelho, o que está sincronizando, o que foi confirmado e o que exige revisão.

Evitar:

- telas pesadas;
- gráficos complexos;
- animações desnecessárias;
- carregamentos longos;
- excesso de imagens obrigatórias.

### 15.3 Risco: cliente achar que o app resolve a vida financeira

O produto deve deixar claro que o foco inicial é mercadoria, estoque, consignado, compras e acertos.

Não prometer:

- gestão financeira completa;
- contabilidade;
- lucro exato;
- solução fiscal;
- organização total do negócio.

### 15.4 Risco: pedidos de melhorias individuais

Clientes vão pedir melhorias específicas.

Regra recomendada:

> Pedido individual não vira funcionalidade automaticamente. Só entra se servir para vários clientes ou se for contratado como customização paga.

Classificação de pedidos:

- bug;
- melhoria geral;
- ideia futura;
- customização paga;
- fora de escopo.

### 15.5 Risco: área do parceiro gerar suporte sem receita direta

Na V2, parceiros poderão acessar o sistema.

Esses parceiros não pagam diretamente a plataforma, mas podem gerar suporte.

Mitigação:

- suporte direto é para o Cliente 1;
- Cliente 1 é responsável por orientar seus parceiros;
- área do parceiro deve ser extremamente simples;
- limitar ações do parceiro;
- criar ajuda visual dentro da tela.

### 15.6 Suporte inicial pelo WhatsApp

Na V1, usuários internos poderão abrir o suporte pelo WhatsApp a partir do app.

A mensagem será preparada com informações de diagnóstico não sensíveis, como código público do negócio, usuário, tela, versão, data, hora, pendências de sincronização e código do erro. Senhas, tokens e dados comerciais sensíveis não serão incluídos.

Sem conexão, o app poderá preparar ou copiar a mensagem para envio posterior.

---

## 16. Diretrizes de experiência do usuário

### 16.1 Produto mobile-first

A experiência principal deve ser no celular.

A versão web pode existir, mas o uso do dia a dia provavelmente será mobile.

### 16.2 Linguagem simples

Usar termos como:

- Produtos;
- Compras;
- Estoque;
- Pontos Parceiros;
- Envios;
- Vendas;
- Devoluções;
- Acertos;
- Reposição.

Evitar termos técnicos como:

- tenant;
- consignatário;
- inventário multicamada;
- curva ABC;
- ledger;
- multi-location inventory;
- account;
- stakeholder.

### 16.3 Poucos campos obrigatórios

Cada rotina deve pedir o mínimo necessário.

Exemplo: registrar compra deve ser rápido.

Campos obrigatórios prováveis:

- produto;
- quantidade;
- fornecedor;
- preço unitário.

Campos opcionais:

- observação;
- foto;
- nota;
- categoria detalhada.

### 16.4 Botões de ação rápida

A tela inicial deve ter botões como:

- Registrar compra;
- Enviar para parceiro;
- Informar venda;
- Registrar devolução;
- Fazer acerto;
- Ver reposição.

### 16.5 A tela inicial deve ser útil

A home não deve ser apenas bonita. Ela deve mostrar o que exige ação.

Exemplos:

- produtos acabando;
- acertos pendentes;
- parceiros com produtos parados;
- compras recentes;
- alertas de reposição.

---

## 17. Brand inicial do produto

O Maria Controla deve herdar a direção visual da marca MarIA.

### Personalidade visual

- feminina sem ser infantil;
- simples sem parecer amadora;
- acolhedora sem perder credibilidade;
- tecnológica sem parecer fria;
- próxima do pequeno comerciante;
- clara e organizada.

### Cores de referência

Usar a brand MarIA como base:

- Ameixa Profundo: `#5B3A5E`;
- Carvão Suave: `#2E2A2F`;
- Creme Quente: `#FFF9F6`;
- Lavanda Suave: `#B79AC8`;
- Pêssego Blush: `#F3D7CF`;
- Rosa Atenuado: `#D9B8C3`.

### Tom de voz

O produto deve falar de forma:

- clara;
- humana;
- objetiva;
- simples;
- acolhedora;
- sem jargão;
- sem prometer milagre.

### Frases possíveis

- “Controle suas mercadorias sem papel e sem planilha.”
- “Saiba onde está cada produto.”
- “Veja o que vendeu, voltou e falta acertar.”
- “Compras, estoque e consignado em um só lugar.”
- “Seu controle de mercadorias direto pelo celular.”

---

## 18. Casos reais iniciais

### 18.1 Caso 1 — Anona Presentes

Cliente piloto.

Contexto:

- comércio familiar;
- necessidade de controlar mercadorias;
- provável uso de compras, estoque, fornecedores e consignado;
- perfil com baixa tolerância a complexidade;
- excelente caso para validar simplicidade.

Objetivo no piloto:

- entender se a tela inicial é clara;
- validar cadastro de produtos;
- validar registro de compra;
- validar controle de pontos parceiros;
- validar acerto de consignado;
- observar dúvidas reais;
- medir se o app reduz dependência de papel/WhatsApp.

### 18.2 Caso 2 — Manicure / chinelos em parceiros

Segundo caso real identificado.

Contexto:

- cliente pretende comprar cerca de 200 pares de chinelos;
- deixará produtos em lojas parceiras, estéticas, salões de beleza e com manicures;
- precisa controlar onde deixou cada produto;
- quer acompanhar vendas e estoque em cada ponto;
- sugeriu que o parceiro também pudesse acessar e informar vendas.

Importância desse caso:

- confirma que a dor é replicável;
- mostra força do módulo de Pontos Parceiros;
- reforça necessidade futura da área do parceiro;
- ajuda a validar que o produto não é apenas estoque, mas controle de mercadorias distribuídas.

---

## 19. Decisões recentes e pendências para próximas etapas

Decisões já registradas:

- comunicação inicial como “consignado com controle de estoque”;
- área do parceiro considerada no domínio, mas acesso próprio fora da V1;
- acertos parciais com valor calculado e valor acordado preservados;
- preço padrão por produto, preço específico por parceiro e edição no lançamento;
- venda direta pelo Cliente 1;
- catálogo próprio por negócio, categorias iniciais e categorias livres;
- estoque mínimo por produto e localização;
- cadastro com e-mail verificado, nome completo, nome de usuário e senha;
- login por empresa, nome de usuário e senha, permitindo o mesmo nome de usuário em empresas diferentes;
- suporte inicial pelo WhatsApp.

Pendências:

1. limites de usuários, dispositivos e Pontos Parceiros por plano;
2. comportamento exato ao atingir o limite de dispositivos;
3. valores dos planos e eventual taxa de implantação;
4. período de teste;
5. cobrança recorrente manual ou automatizada;
6. exportação, retenção e exclusão de dados após cancelamento;
7. condições futuras de instalação exclusiva ou banco dedicado;
8. publicação na Play Store permanece sem previsão no horizonte próximo.

Biometria/passkey foi retirada da V1 e permanece em standby para evolução futura.

---

## 20. Diretrizes preservadas na arquitetura aprovada

A arquitetura técnica está registrada em `docs/ARQUITETURA.md`. Este documento preserva as condições de produto que ela deve atender.

A arquitetura deve considerar obrigatoriamente:

- produto mobile-first;
- possibilidade de versão web;
- múltiplos clientes pagantes;
- isolamento de dados por cliente;
- licenças e planos;
- limite de usuários e dispositivos;
- usuários internos do Cliente 1;
- futura área do Parceiro Consignado;
- controle de estoque por localização/status;
- histórico de movimentações;
- baixo custo operacional;
- simplicidade de manutenção;
- suporte reduzido;
- segurança suficiente para evitar compartilhamento indevido;
- evolução futura para WhatsApp/IA;
- possibilidade de funcionar bem em celulares simples;
- operação offline nas rotinas principais e sincronização posterior;
- facilidade de implantação para primeiros clientes.

A arquitetura deve ser proporcional ao estágio do produto: robusta o suficiente para não precisar recomeçar, mas simples o suficiente para permitir validação rápida.

---

## 21. Instrução para nova sessão de IA

Ao iniciar uma nova sessão para este projeto, usar este documento como fonte de contexto de produto.

A IA deve:

1. Ler este documento e `docs/ARQUITETURA.md` antes de sugerir mudanças técnicas.
2. Não assumir que o produto é um ERP.
3. Não iniciar por tecnologia.
4. Primeiro confirmar entendimento do contexto, personas, escopo e regras de negócio.
5. Preservar a arquitetura aprovada ou apresentar explicitamente a decisão que justifica uma mudança.
6. Preservar a simplicidade do produto.
7. Considerar que a V1 funcional será construída antes da apresentação à Anona Presentes, à manicure e a outras pessoas interessadas; sugestões posteriores entrarão na fila de melhorias conforme a decisão D-009.
8. Tratar a área do parceiro como evolução futura, não MVP.
9. Não incluir emissão fiscal, WhatsApp bot, OCR ou financeiro completo na V1.
10. Pensar sempre no uso mobile por pessoas com baixa maturidade tecnológica.

---

## 22. Síntese final

O Maria Controla deve nascer como um app simples para controle de mercadorias, compras, pontos parceiros e consignado.

O produto é promissor porque já existem pelo menos dois casos reais com dores semelhantes:

- Anona Presentes;
- manicure que venderá chinelos por pontos parceiros.

A grande oportunidade não é criar mais um sistema de estoque genérico, mas sim resolver uma dor muito concreta:

> controlar mercadorias que entram, saem, são deixadas com parceiros, vendem, voltam e precisam ser acertadas.

O sucesso depende de manter o produto simples, mobile-first, barato, fácil de usar e com escopo muito bem controlado.
