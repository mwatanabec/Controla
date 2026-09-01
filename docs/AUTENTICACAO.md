# Autenticação da V1

**Status:** contrato técnico local aprovado para implementação. Ainda não aplicado em projeto Supabase.

## Objetivo

Permitir login por empresa, nome de usuário e senha, mantendo o e-mail verificado como identidade do Supabase Auth e como meio de recuperação.

## Identificadores

- `businesses.login_code` é o código público e único digitado no campo Empresa, como `anona`;
- `business_memberships.username` pertence ao vínculo entre usuário e negócio;
- `business_memberships.username_normalized` garante unicidade sem diferenciar maiúsculas e espaços externos;
- a restrição única é `(business_id, username_normalized)`, portanto `maria.maria` pode existir na Anona e em outro negócio;
- UUIDs internos continuam sendo as chaves de autorização e nunca são substituídos pelos identificadores públicos.

## Fluxo de login

```text
PWA
  | empresa + usuário + senha
  v
Edge Function login-with-username
  | consulta privilegiada somente no servidor
  v
negócio ativo -> vínculo ativo -> perfil ativo -> e-mail verificado no Auth
  | e-mail + senha
  v
Supabase Auth
  | sessão normal do usuário
  v
PWA -> banco protegido por RLS
```

A função usa a chave pública apenas para validar a senha no Supabase Auth. A chave secreta é usada somente no ambiente da função para localizar o usuário e nunca pode ser incluída no frontend.

## Contrato HTTP

`POST /functions/v1/login-with-username`

Entrada:

```json
{
  "business_code": "anona",
  "username": "maria.maria",
  "password": "senha-informada"
}
```

Sucesso `200`: retorna somente os campos necessários para instalar a sessão do Supabase (`access_token`, `refresh_token`, expiração e tipo do token).

Falha de credencial `401`:

```json
{ "code": "invalid_credentials" }
```

A mesma resposta cobre empresa inexistente, usuário inexistente, conta inativa, e-mail não confirmado e senha incorreta. A função aplica duração mínima às falhas, não devolve e-mail e proíbe cache.

Indisponibilidade interna `503` retorna somente `login_unavailable`, sem detalhe de infraestrutura.

## Proteções obrigatórias antes da produção

- configurar `ALLOWED_ORIGINS` somente com endereços oficiais da PWA;
- configurar limitação de tentativas por origem e por identificador na borda, sem registrar senha;
- manter segredo administrativo exclusivamente no cofre de variáveis da função;
- registrar apenas código de resultado, horário e identificadores irreversivelmente resumidos;
- não informar qual parte da combinação falhou;
- revisar limites nativos do Supabase Auth e realizar teste de força bruta;
- usar HTTPS e `Cache-Control: no-store`;
- manter RLS e grants mínimos para toda consulta depois da autenticação.

O token de uma sessão Supabase contém o e-mail do próprio usuário autenticado. Isso é aceitável porque é a identidade de recuperação daquela conta. A proteção deste contrato impede que uma pessoa ainda não autenticada use o endpoint para descobrir o e-mail ligado a uma combinação de empresa e usuário.

## Variáveis do servidor

- `SUPABASE_URL`;
- `SUPABASE_PUBLISHABLE_KEY`, com fallback local legado para `SUPABASE_ANON_KEY`;
- `SUPABASE_SECRET_KEY`, com fallback local legado para `SUPABASE_SERVICE_ROLE_KEY`;
- `ALLOWED_ORIGINS`, separado por vírgulas.

Nenhuma dessas configurações foi criada em ambiente remoto neste lote.
