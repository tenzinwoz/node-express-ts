# using lightweigh docker image for node
FROM node:20-alphine as BASE

# setting the working directory
WORKDIR /app

# copying package.json and package-lock.json
COPY package*.json ./

# installing dependencies
RUN npm ci --only=production

# copying the source code
COPY . .

# Build the typescript application
RUN npm run dist

# exposing the port
EXPOSE 3000

# start the application
CMD ["npm", "start"]
