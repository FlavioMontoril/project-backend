# Project Backend

Uma API robusta em Node.js desenvolvida com TypeScript, seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**. 

O projeto utiliza tecnologias modernas para garantir alta performance, validação rigorosa de dados, comunicação em tempo real e um ambiente isolado em contêineres Docker.

---

## 🚀 Tecnologias e Ferramentas

- **Node.js** & **TypeScript** - Ambiente e tipagem estática confiável.
- **Express.js** - Framework flexível para roteamento e middlewares da API.
- **Prisma ORM** - Modelagem de esquema e migrações no banco de dados.
- **MySQL** - Banco de dados relacional configurado e provido via contêiner.
- **Socket.io** - Comunicação bidirecional em tempo real via WebSockets.
- **Zod** - Validação poderosa de schemas e tipagem de dados estruturada.
- **JSON Web Token (JWT)** & **Bcrypt** - Autenticação segura e hash de senhas.
- **Docker & Docker Compose** - Orquestração fácil e reproduzível dos contêineres.
- **TSX** - Execução ágil de TypeScript para o modo de desenvolvimento.

---

## 📂 Arquitetura do Projeto

A estrutura de diretórios foi idealizada para manter o código limpo, modular e altamente escalável, promovendo a separação de responsabilidades. O diretório `src/` contém:

```text
src/
├── adapters/       # Controladores, gateways e adaptadores de interfaces externas (ex: WebSockets)
├── application/    # Casos de uso da aplicação (Use Cases) e regras de negócios
├── core/           # Módulos centrais, como Entidades de domínio e gerenciamento de Eventos (Domain Events)
├── infra/          # Configurações de infraestrutura (Express router, Error Handler, middlewares)
├── generated/      # Arquivos ou clientes gerados automaticamente
└── server.ts       # Ponto de entrada (Entrypoint) principal da aplicação e servidor HTTP
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:
- [Node.js](https://nodejs.org/) (versão 20+ recomendada)
- [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Configuração do Ambiente

1. Na raiz do projeto, faça uma cópia do arquivo de variáveis de ambiente e preencha com as suas informações locais:

```bash
cp .env.example .env
```

2. Exemplo de variáveis principais (`.env`):
```env
# Configurações do Servidor e JWT
PORT=3333
JWT_SECRET=sua_chave_secreta

# Configurações do Banco de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

# Credenciais do Banco para o Docker Compose
DB_ROOT_PASS=root
DB_USER=usuario
DB_PASS=senha
DB_NAME=nome_do_banco
DB_PORT=3306
```

---

## 🚀 Como Executar

O projeto possui suporte nativo ao **Docker**, o que torna a execução e configuração do banco de dados extremamente simples.

### Usando Docker (Recomendado)

O arquivo `docker-compose.yml` inicia tanto o banco de dados MySQL quanto a sua API em contêineres e os conecta automaticamente.

```bash
# Sobe os contêineres em background (modo detached)
docker compose up -d
```
A API estará disponível na porta definida em `PORT` no seu `.env` (ex: `http://localhost:3333`).

### Rodando Localmente (Desenvolvimento sem Docker para a API)

Caso prefira rodar o servidor Express nativamente no terminal (necessita de um banco MySQL acessível):

1. Instale as dependências:
```bash
yarn install
```

2. Gere o Prisma Client e certifique-se de aplicar as migrations (caso existam):
```bash
yarn prisma generate
yarn prisma migrate dev
```

3. Inicie o servidor em modo de desenvolvimento (o `tsx` irá reiniciar automaticamente o servidor após mudanças de arquivo):
```bash
yarn start:dev
```

---

## 🛠️ Scripts Disponíveis

Dentro do `package.json`, você encontra os seguintes scripts configurados para ajudar no fluxo de trabalho:

- `yarn start:dev` - Executa a aplicação em modo de observação (watch mode) via `tsx`.
- `yarn start:prod` - Inicializa a aplicação baseada no build da pasta `dist/`.
- `yarn test` - Interface reservada para execução de testes integrados ou unitários.

---

## 🔒 Autenticação e Segurança

A API protege suas rotas utilizando validações com Zod e tokens JWT. A configuração do CORS já está implementada localmente no `server.ts`. 

Para acessar rotas privadas, adicione seu token no Header de autorização da requisição HTTP:
```http
Authorization: Bearer <seu_token_aqui>
```
*(O CORS também possui escopo comentado no servidor caso utilize credenciais enviadas via cookies no futuro)*
