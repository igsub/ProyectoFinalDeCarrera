#Dockerfile
# PROD CONFIG
FROM node:alpine3.11

# ARG NODE_ENV=development

# Create App Directory
WORKDIR /usr/src/app

# Install Dependencies
COPY ./package*.json ./

RUN npm ci

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]