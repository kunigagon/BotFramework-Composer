FROM node:12.9.0
RUN npm install offline-directline@1.3.1 -g
ENTRYPOINT directline -d 3000 -b "http://botruntime:3979/api/messages"
