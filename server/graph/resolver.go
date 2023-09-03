package graph

import (
	"my_package/graph/model"
	"my_package/graph/usecase"
)

type Resolver struct {
	todos []*model.Todo
	vu    usecase.IVersionUsecase
	du    usecase.IDepartmentUsecase
	eu    usecase.IEmployeeUsecase
}
