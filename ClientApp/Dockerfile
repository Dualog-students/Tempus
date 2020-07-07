# Install Node and Node modules
FROM node:lts AS build
WORKDIR /app
ARG MYGET
ENV MYGET_DUALOG_TOKEN="${MYGET}"
COPY .npmrc /app/.npmrc
COPY package.json /app/package.json
RUN npm install

# Build angular app
FROM build AS publish
WORKDIR /app
COPY . .
RUN npm run ng -- build --prod --aot

# Setup nginx
FROM nginx:alpine as webhost
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

FROM webhost AS complete
WORKDIR /usr/share/nginx/html
COPY --from=publish /app/dist/tempus .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
