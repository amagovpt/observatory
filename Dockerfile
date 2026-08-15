FROM node:20-alpine AS base 

WORKDIR /app

COPY package*.json ./
RUN npm ci

  
FROM base AS development
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules


COPY . .

EXPOSE 3000
CMD [ "npm","run", "start:noenv" ]


FROM base AS builder
ARG VITE_AMP_SERVER
ARG VITE_SERVER_URL
ARG VITE_API_DATA_SOURCE
ENV VITE_API_DATA_SOURCE=$VITE_API_DATA_SOURCE
ENV VITE_SERVER_URL=$VITE_SERVER_URL
ENV VITE_AMP_SERVER=$VITE_AMP_SERVER
COPY . .
RUN npm run build:noenv


FROM httpd:alpine AS production
COPY .htaccess ./
COPY --from=builder /app/build /usr/local/apache2/htdocs/observatory
COPY --from=builder /app/.htaccess /usr/local/apache2/htdocs/observatory

EXPOSE 80