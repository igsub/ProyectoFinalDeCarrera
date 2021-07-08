# Stage 1: Build react client
FROM node:alpine3.11

# Working directory
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]