package repository

import (
	"my_package/graph/model"

	"gorm.io/gorm"
)

// インターフェース
type IEmployeeRepository interface {
	CreateEmployee(employee *model.Employee) error
	GetEmployeesByDepartmentId(Employees *[]*model.Employee, departmentId uint) error
}

type employeeRepository struct {
	db *gorm.DB
}

// コンストラクタ
func NewEmployeeRepository(db *gorm.DB) IEmployeeRepository {
	return &employeeRepository{db}
}

func (er *employeeRepository) CreateEmployee(employee *model.Employee) error {
	if err := er.db.Create(employee).Error; err != nil {
		return err
	}
	return nil
}

func (er *employeeRepository) GetEmployeesByDepartmentId(Employees *[]*model.Employee, departmentId uint) error {
	err := er.db.Where("department_id = ?", departmentId).Find(Employees).Error
	if err != nil {
		return err
	}
	return nil
}
