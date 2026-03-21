# TECHNOVA FRONTEND - DOCKERFILE V1.0
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala o 'serve' globalmente para servir a pasta estática
RUN npm install -g serve

# Copia os ficheiros do frontend para o container
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para servir a pasta atual na porta 3000
CMD ["serve", "-s", ".", "-l", "3000"]