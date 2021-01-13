ARG PORT=8080

FROM golang:1.15.6-alpine AS build

RUN apk update && \
    apk add --no-cache git alpine-sdk

WORKDIR /src
COPY go.* ./
RUN go mod download
COPY . .
RUN go build -o ./out/example .

FROM alpine:latest AS bin

COPY --from=build /src/out/example .
COPY --from=build /src/*html .

EXPOSE ${PORT}

ENTRYPOINT ["./example"]