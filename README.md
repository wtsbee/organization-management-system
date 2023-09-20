# organization-management-system

## 概要

- 組織管理のためのアプリです
- バージョン単位で部署を作成できます
- 部署配下に社員を登録し管理します

## 初回起動

### コンテナ起動

`server`ディレクト配下に`.env`ファイルを作成し、`.env.sample`の中身をコピーして貼り付けます。

以下のコマンドを実行し、コンテナを起動します。

```
$ docker-compose up -d
```

### server のコンテナ内での作業

以下のコマンドを実行します。

```
$ go mod tidy
```

サーバーを起動します。

```
$ go run server.go
```

### client のコンテナ内での作業

以下のコマンドを実行します。

```
$ npm install
```

サーバーを起動します。

```
$ npm run dev
```

## 2 回目以降のコンテナ起動

`docker-compose.yml`内の`command: go run server.go`および`command: npm run dev`のコメントアウトを解除します。

以下のコマンドを実行し、コンテナを起動します。

```
$ docker-compose up -d
```

## コンテナ停止

以下のコマンドを実行します。

```
$ docker-compose down
```
