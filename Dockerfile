# Utilizar una versión específica de Node.js
FROM node:18.20.8-alpine3.21 AS base

# Instalar dependencias necesarias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos necesarios y instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instala Python y otras dependencias necesarias para compilar módulos nativos
RUN apk update && apk add --no-cache python3 build-base pango-dev jpeg-dev giflib-dev librsvg

# Habilitar y usar corepack para pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Fase de construcción de la aplicación
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
# Asegurarse de que Next.js esté configurado en modo standalone
RUN pnpm run build

# Fase de ejecución
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios para la ejecución
COPY --from=builder /app/public ./public

# Cambiar propietario de los archivos copiados
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Exponer puerto y definir variables de entorno
EXPOSE 3003
ENV PORT=3003
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar la aplicación
CMD ["node", "server.js"]