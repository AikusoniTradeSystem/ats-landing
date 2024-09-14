FROM node:20.16.0 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM alpine:latest

WORKDIR /dist
COPY --from=build /app/dist .