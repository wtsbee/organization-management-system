package main

import (
	"log"
	"my_package/graph"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// ヘッダーにCORS用の設定を追加
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// プリフライトリクエストへの対応
		if r.Method == http.MethodOptions {
			return
		}

		// 次のハンドラを呼び出す
		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// CORS対応のハンドラを追加
	corsHandler := corsMiddleware(srv)

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsHandler)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
