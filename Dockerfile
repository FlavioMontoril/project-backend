FROM node:22-slim

# Instalar openssl (necessário para Prisma). Apenas para node:22-slim
RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

# Instalamos o openssl, necessário para o Prisma rodar no Linux
# RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/* . Apenas para node:22-alpine
# OU
# RUN apk add --no-cache openssl . Apenas para node:22-alpine

# Pasta onde o código ficará dentro do container
WORKDIR /app

# Ativa o Corepack (para usar Yarn)
RUN corepack enable

# Copiamos apenas os arquivos de dependências primeiro (aproveita o cache do Docker)
COPY package.json yarn.lock ./

# Instalamos as dependências usando o Yarn (modo frozen garante as mesmas versões)
RUN yarn install --frozen-lockfile

# Copiamos todo o restante do projeto
COPY . .

# Geramos o cliente do Prisma (essencial para que as queries funcionem)
RUN yarn prisma generate

# Expomos a porta definida no seu .env (vimos que é a 4002)
EXPOSE 4002

# Comando para iniciar a aplicação em modo desenvolvimento
CMD ["yarn", "start:dev"]
