FROM node:alpine

# RUN apk add --no-cache libc6-compat
# RUN apk add --no-cache inotify-tools
RUN apk add --no-cache curl

WORKDIR /app
COPY package.json ./
RUN npm install

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

EXPOSE 3000
EXPOSE 49153

ENV NEXT_TELEMETRY_DISABLED 1
