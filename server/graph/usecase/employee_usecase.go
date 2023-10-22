package usecase

import (
	"fmt"
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
	"strconv"
)

// インターフェース
type IEmployeeUsecase interface {
	CreateEmployee(employee model.NewEmployee) (*model.Employee, error)
	DeleteEemployee(id uint) (bool, error)
	GetEmployee(employeeId uint) (*model.EmployeeWithDepartmentInfo, error)
	GetEmployees(departmentId uint) ([]*model.Employee, error)
	UpdateEmployee(employee model.UpdateEmployee) (*model.Employee, error)
}

type employeeUsecase struct {
	er repository.IEmployeeRepository
	dr repository.IDepartmentRepository
}

// コンストラクタ
func NewEmployeeUsecase(er repository.IEmployeeRepository, dr repository.IDepartmentRepository) IEmployeeUsecase {
	return &employeeUsecase{er, dr}
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

func (er *employeeUsecase) DeleteEemployee(id uint) (bool, error) {
	if err := er.er.DeleteEemployee(id); err != nil {
		log.Println("DeleteEemployee error", err)
		return false, err
	}
	log.Println("DeleteEemployee success")
	return true, nil
}

func (eu *employeeUsecase) GetEmployee(employeeId uint) (*model.EmployeeWithDepartmentInfo, error) {
	employee := model.Employee{}
	if err := eu.er.GetEmployee(&employee, employeeId); err != nil {
		log.Println("GetEmployee error", err)
		return &model.EmployeeWithDepartmentInfo{}, err
	}
	department := model.Department{}
	if err := eu.dr.GetDepartmentById(&department, employee.DepartmentId); err != nil {
		log.Println("GetEmployee error", err)
		return &model.EmployeeWithDepartmentInfo{}, err
	}
	employeeWithDepartmentInfo := model.EmployeeWithDepartmentInfo{
		ID:             employee.ID,
		FirstName:      employee.FirstName,
		LastName:       employee.LastName,
		DepartmentID:   employee.DepartmentId,
		DepartmentInfo: fmt.Sprintf("%s/%v", department.Ancestry, strconv.Itoa(int(department.ID))),
	}
	log.Println("GetEmployee success")
	return &employeeWithDepartmentInfo, nil
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

func (eu *employeeUsecase) UpdateEmployee(employee model.UpdateEmployee) (*model.Employee, error) {
	newEmployee := model.Employee{ID: employee.ID, FirstName: employee.FirstName, LastName: employee.LastName, DepartmentId: employee.DepartmentID}
	if err := eu.er.UpdateEmployee(&newEmployee, employee.ID); err != nil {
		log.Println("UpdateEmployee error", err)
		return &model.Employee{}, err
	}
	log.Println("UpdateEmployee success")
	return &newEmployee, nil
}
