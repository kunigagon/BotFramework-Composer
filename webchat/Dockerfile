FROM node:12.9.0 as frontend
RUN mkdir -p /app/front
WORKDIR /app/front
COPY . /app/front
RUN npm install
ENTRYPOINT npx serve
