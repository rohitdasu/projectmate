# Use actuall node version specified in .nvmrc
FROM node:18.12.0

# Install rsync for fast copying node_modules files
RUN apt-get update -y
RUN apt-get install -y rsync

# Switch to node user
USER node

# use directory for app
WORKDIR /usr/src/cache

# Copy dependencies files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Change workdir to main app folder
WORKDIR /usr/src/app

# Expose on port 300
EXPOSE 3000