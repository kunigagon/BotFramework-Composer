FROM node:12.9.0
COPY . .
WORKDIR offline-directline-code
RUN npm install
RUN npm run-script build
ENTRYPOINT npm run-script directline -- -d "http://directline:3000" -b "http://botruntime:80/api/messages"
