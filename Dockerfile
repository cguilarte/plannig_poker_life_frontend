
# Utilizar una versión específica de Node.js
FROM node:18.20.5-alpine3.21 AS base

# Instalar dependencias necesarias
FROM base AS deps
#RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos necesarios y instalar dependencias
COPY package.json ./

# Instala Python y otras dependencias necesarias para compilar módulos nativos

#RUN apk update && apk add --no-cache python3 build-base  pango-dev jpeg-dev giflib-dev librsvg
#RUN npm install -g npm
RUN npm install env-cmd --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Fase de construcción de la aplicación
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

#RUN echo -e "User-agent: *\nDisallow: /" > public/robots.txt;

# Fase de ejecución
FROM base AS runner
WORKDIR /app

# Crear directorio .next si no existe
RUN mkdir -p .next

ENV NODE_ENV=production

# Copiar archivos necesarios para la ejecución
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exponer puerto y definir variables de entorno
EXPOSE 3001
ENV PORT=3001

# Comando para iniciar la aplicación
CMD ["node", "server.js"]