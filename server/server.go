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
	departmentRepository := repository.NewDepartmentRepository(db)
	employeeRepository := repository.NewEmployeeRepository(db)
	versionUsecase := usecase.NewVersionUsecase(versionRepository)
	departmentUsecase := usecase.NewDepartmentUsecase(departmentRepository)
	employeeUsecase := usecase.NewEmployeeUsecase(employeeRepository, departmentRepository)
	resolver := graph.NewResolver(versionUsecase, departmentUsecase, employeeUsecase)

	e := router.Init(resolver)

	log.Println("connect to http://localhost:8080/ for GraphQL playground")
	e.Logger.Fatal(e.Start(":8080"))
}
