FROM golang:1.19.1-alpine

WORKDIR /go/src

RUN apk update

# gqlgen generate で必要となるパッケージ
RUN apk add --no-cache gcc && apk add --no-cache musl-dev