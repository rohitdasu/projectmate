# Use latest LTS node version
FROM node:20

# Install rsync for fast copying node_modules files
RUN apt-get update -y
RUN apt-get install -y rsync

# use directory for app
WORKDIR /usr/src/cache

# Copy dependencies and prisma files
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn install --frozen-lockfile

# Initialize prisma
RUN npx prisma generate

# Change workdir to main app folder
WORKDIR /usr/src/app

# Expose on port 300
EXPOSE 3000