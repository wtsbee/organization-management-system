package main

import (
	"log"
	"my_package/database"
	"my_package/graph"
	"my_package/graph/repository"
	"my_package/graph/usecase"
	"my_package/router"
)

func main() {
	db := database.NewDB()
	database.Migrate(db)

	versionRepository := repository.NewVersionRepository(db)
	versionUsecase := usecase.NewVersionUsecase(versionRepository)
	resolver := graph.NewResolver(versionUsecase)

	e := router.Init(resolver)

	log.Println("connect to http://localhost:8080/ for GraphQL playground")
	e.Logger.Fatal(e.Start(":8080"))
}
