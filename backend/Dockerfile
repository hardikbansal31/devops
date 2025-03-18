# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend folder
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build  # Ensure your package.json has "build": "tsc"

# Expose the correct port (5001 as per your change)
EXPOSE 5001

# Start the server (use the compiled JavaScript file)
CMD ["node", "dist/server.js"]
