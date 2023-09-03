package repository

import (
	"my_package/graph/model"

	"gorm.io/gorm"
)

// インターフェース
type IEmployeeRepository interface {
	GetEmployeesByDepartmentId(Employees *[]*model.Employee, departmentId uint) error
}

type employeeRepository struct {
	db *gorm.DB
}

// コンストラクタ
func NewEmployeeRepository(db *gorm.DB) IEmployeeRepository {
	return &employeeRepository{db}
}

func (er *employeeRepository) GetEmployeesByDepartmentId(Employees *[]*model.Employee, departmentId uint) error {
	err := er.db.Where("department_id = ?", departmentId).Find(Employees).Error
	if err != nil {
		return err
	}
	return nil
}
