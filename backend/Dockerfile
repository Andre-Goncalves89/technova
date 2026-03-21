# TECHNOVA BACKEND - DOCKERFILE V1.0
# Usando a versão estável mais recente do Node (LTS)
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os manifestos de dependências primeiro para otimizar o cache
COPY package*.json ./

# Instala as dependências necessárias para a API funcionar
RUN npm install

# Copia todo o código da pasta backend para o container
COPY . .

# Informa ao Docker que este container ouve na porta 5000
EXPOSE 5000

# Comando para iniciar o servidor Node
CMD ["node", "index.js"]