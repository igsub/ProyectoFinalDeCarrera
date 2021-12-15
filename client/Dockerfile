# Stage 1: Build react client
FROM node:alpine3.11

# Working directory
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./
# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]