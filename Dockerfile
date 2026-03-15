FROM node:22

# Instalamos o openssl, necessário para o Prisma rodar no Linux
# RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/* . Apenas para node:22-alpine
# RUN apk add --no-cache openssl

# Pasta onde o código ficará dentro do container
WORKDIR /app

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
