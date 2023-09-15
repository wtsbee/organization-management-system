package repository

import (
	"my_package/graph/model"
	"strconv"

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

func (er *employeeRepository) GetEmployeesByDepartmentId(employees *[]*model.Employee, departmentId uint) error {
	var departments []model.Department
	stringDeparmentId := strconv.FormatUint(uint64(departmentId), 10)
	err := er.db.Where("ancestry = ? OR ancestry LIKE ? OR ancestry LIKE ? OR ancestry LIKE ?", departmentId, stringDeparmentId+"/%", "%/"+stringDeparmentId+"/%", "%/"+stringDeparmentId).Find(&departments).Error
	if err != nil {
		return err
	}
	departmentIdList := []uint{departmentId}
	for _, v := range departments {
		departmentIdList = append(departmentIdList, v.ID)
	}
	err = er.db.Where("department_id in ?", departmentIdList).Find(employees).Error
	if err != nil {
		return err
	}
	return nil
}
