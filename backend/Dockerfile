# Use official Node.js image as base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the backend runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
