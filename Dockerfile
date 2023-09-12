FROM node:18.15-apline

WORKDIR /usr/queenpins/queenpins-client

COPY package.json .

RUN npm install

COPY . .

# EXPOSE 3003 required for docker desktop port mapping

CMD ["npm", "run", "dev"]
