package main

import (
	"log"
	"my_package/database"
	"my_package/graph"
	"my_package/graph/repository"
	"my_package/graph/usecase"
	"net/http"

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
	db := database.NewDB()
	database.Migrate(db)

	versionRepository := repository.NewVersionRepository(db)
	versionUsecase := usecase.NewVersionUsecase(versionRepository)
	resolver := graph.NewResolver(versionUsecase)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// CORS対応のハンドラを追加
	corsHandler := corsMiddleware(srv)

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsHandler)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", defaultPort)
	log.Fatal(http.ListenAndServe(":"+defaultPort, nil))
}
