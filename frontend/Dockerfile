# Use official Node.js image as base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port React runs on
EXPOSE 3001

# Start the React app
CMD ["npm", "start"]
