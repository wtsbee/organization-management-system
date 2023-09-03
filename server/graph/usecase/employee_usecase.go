package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
)

// インターフェース
type IEmployeeUsecase interface {
	GetEmployees(departmentId uint) ([]*model.Employee, error)
}

type employeeUsecase struct {
	er repository.IEmployeeRepository
}

// コンストラクタ
func NewEmployeeUsecase(er repository.IEmployeeRepository) IEmployeeUsecase {
	return &employeeUsecase{er}
}

func (eu *employeeUsecase) GetEmployees(departmentId uint) ([]*model.Employee, error) {
	employees := []*model.Employee{}
	if err := eu.er.GetEmployeesByDepartmentId(&employees, departmentId); err != nil {
		log.Println("GetEmployees error", err)
		return nil, err
	}
	log.Println("GetEmployees success")
	return employees, nil
}
