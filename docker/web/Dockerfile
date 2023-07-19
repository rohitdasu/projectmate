# Use actuall node version specified in .nvmrc
FROM node:18.12.0-alpine

# use directory for app
WORKDIR /app

# Copy dependencies files
COPY package.json yarn.lock ./

# Generated prisma files
COPY prisma ./prisma/

# Copy env variables
COPY .env ./

# Copy tsconfig.json file
COPY tsconfig.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate prisma client
RUN npx prisma generate

# Copy rest of the app to WORKDIR directory
COPY . .

# Expose on port 300
EXPOSE 3000

# Command to run when the container starts
CMD ["yarn", "dev"]
