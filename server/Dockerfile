FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set an environment variable 
ENV PORT=3000

# Expose the port that the app will run on
EXPOSE 3000

# Tell docker what command will start the application
CMD [ "npm", "start" ]