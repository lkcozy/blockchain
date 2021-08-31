# Stage 1: build the base image
# The base images contains everything common to all stages, such as setting 
# environment variables, creating working directories, installing NodeJS, yarn, 

# Docker Image which is used as foundation to create a custom Docker Image
FROM alpine:3.14 AS base

# only install packages under dependencies
ENV NODE_ENV=production \
    APP_PATH=/node/app

# A directory within the virtualized Docker environment
WORKDIR $APP_PATH

# Uses port which is used by the actual application
# EXPOSE 3000

# Check package information under the specified Alpine version https://pkgs.alpinelinux.org/packages?name=nodejs&branch=v3.14
RUN apk add --no-cache --update nodejs=14.17.5-r0 yarn=1.22.10-r0


# Stage 2: install dependencies
# Only contains files that are needed for the production
FROM base AS install

# Copies package.json to Docker environment
COPY package.json .

# Installs all packages
RUN yarn


# Stage 3: build the base image
FROM base

# Copy the generated node_moduels from the install stage to the working directory
COPY --from=install $APP_PATH/node_modules ./node_modules

# Copies everything over to Docker environment
COPY . .

CMD yarn start