FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .

ENV NODE_ENV=development
ENV PORT=5000
ENV MONGO_URI=mongo
ENV JWT_SECRET=secret
ENV JWT_EXPIRE=30d
ENV JWT_COOKIE_EXPIRE=30

EXPOSE 5000

CMD ["npm", "start"]
