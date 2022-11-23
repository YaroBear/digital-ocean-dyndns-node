FROM node:current-alpine
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY node_modules/ node_modules/
COPY index.js index.js
 
CMD [ "node", "index.js" ]
