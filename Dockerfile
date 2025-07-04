# Use Node.js 20 as base image
FROM node:20-alpine

# Instalar dependências necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV CLOUD_NAME="df7bz8she"
ENV CLOUDINARY_API_KEY="476877472667937"
ENV CLOUDINARY_API_SECRET="DFfj_H5Dv-d15nNlGTk-HNuR30s"

# Gerar o Prisma Client
RUN npx prisma generate

# Expose the default NestJS port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]