package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
)

// インターフェース
type IEmployeeUsecase interface {
	CreateEmployee(employee model.NewEmployee) (*model.Employee, error)
	GetEmployees(departmentId uint) ([]*model.Employee, error)
}

type employeeUsecase struct {
	er repository.IEmployeeRepository
}

// コンストラクタ
func NewEmployeeUsecase(er repository.IEmployeeRepository) IEmployeeUsecase {
	return &employeeUsecase{er}
}

func (er *employeeUsecase) CreateEmployee(employee model.NewEmployee) (*model.Employee, error) {
	newEmployee := model.Employee{FirstName: employee.FirstName, LastName: employee.LastName, DepartmentId: employee.DepartmentID}
	if err := er.er.CreateEmployee(&newEmployee); err != nil {
		log.Println("CreateEmployee error", err)
		return &model.Employee{}, err
	}
	log.Println("CreateEmployee success")
	return &newEmployee, nil
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
