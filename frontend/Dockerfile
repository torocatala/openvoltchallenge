FROM node:21-alpine

# Create app directory
RUN mkdir -p /app && chown -R node:node /app

# install simple http server for serving static content
RUN npm install -g http-server

# Switch to a non-root user
USER node

# make the 'app' folder the current working directory
WORKDIR /app

# Copy package.json and package-lock.json to the workspace
COPY --chown=node:node package*.json ./

# install project dependencies
RUN npm install

# Copy the application files to the container, this is done in a separate command to optimize layer caching
COPY --chown=node:node . .

# build app for production with minification
RUN npm run build

EXPOSE 3001
CMD [ "http-server", "dist" ]