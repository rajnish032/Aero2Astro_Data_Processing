FROM ghcr.io/puppeteer/puppeteer:24.11.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/path/to/Chrome

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8000
CMD [ "npm", "run","dev" ]
