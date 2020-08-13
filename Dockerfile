# ========= BUILD =========
FROM node:lts-alpine as react-builder

# Install GIT
RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /app

# Clone project from Git (invalidate cache from here ON)
ARG CACHE_DATE=not_a_date
ARG git=git.globalincubator.net/banco-santander/covid19mx
ARG gitTokenUser=gitlab+deploy+covid-docker
ARG gitToken=p2jHonT-hsaZyr-4mqvd
RUN git clone "https://${gitTokenUser}:${gitToken}@${git}.git"

WORKDIR /app/covid19mx

# Install react dependencies
RUN npm install

# Build react dependencies
RUN npm run build

# ========= GENERATE SSL =========
FROM debian:buster as certificate-generator

WORKDIR /app/ssl

RUN mkdir key && mkdir csr && mkdir crt

RUN apt-get update && \
    apt-get install -y openssl && \
    openssl genrsa -out key/covidmx-ca.key 4096 && \
    openssl req -new -x509 -key key/covidmx-ca.key -out crt/covidmx-ca.crt \
        -subj "/emailAddress=info@globalincubator.com/C=MX/ST=Mexico/L=Mexico/O=covidmx/CN=covidmx.app" && \
    openssl x509 -in crt/covidmx-ca.crt -out crt/covidmx-ca.crt.pem -outform PEM && \
    openssl req -new -newkey rsa:2048 -nodes -out "csr/covidmx-front.csr" -keyout "key/covidmx-front.key" \
        -subj "/emailAddress=info@globalincubator.com/C=MX/ST=Mexico/L=Mexico/O=covidmx/CN=front.covidmx.app" && \
    openssl x509 -req -days 3600 -in "csr/covidmx-front.csr" -CA crt/covidmx-ca.crt.pem -CAkey key/covidmx-ca.key -CAcreateserial -out "crt/covidmx-front.crt" -sha256

# ========= RUN =========
FROM nginx:1.17-alpine

WORKDIR /app

RUN mkdir -p /app/ssl && \
    rm -rf /usr/share/nginx/html/{*,.*}

# Copy nginx conf
COPY --from=react-builder /app/covid19mx/nginx.conf /etc/nginx/nginx.conf
# Copy react build
COPY --from=react-builder /app/covid19mx/build /usr/share/nginx/html
# Copy SSL certificates
COPY --from=certificate-generator /app/ssl /app/ssl

RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/nginx.conf && \
        chown -R nginx:nginx /usr/share/nginx/html
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 443

# Run nginx image as non root user
USER nginx
