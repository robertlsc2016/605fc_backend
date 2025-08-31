# Usando imagem oficial Node.js
FROM node:20-alpine

# Criando diretório da app
WORKDIR /app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o restante do código
COPY . .

# Expondo a porta que a API vai rodar
EXPOSE 4000

# Comando para iniciar a API
CMD ["npm", "start"]
