package repository

import (
	"my_package/graph/model"
	"strconv"

	"gorm.io/gorm"
)

// インターフェース
type IEmployeeRepository interface {
	CreateEmployee(employee *model.Employee) error
	DeleteEemployee(id uint) error
	GetEmployeesByDepartmentId(Employees *[]*model.Employee, departmentId uint) error
	GetEmployee(employee *model.Employee, employeeId uint) error
	UpdateEmployee(employee *model.Employee, employeeId uint) error
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

func (er *employeeRepository) DeleteEemployee(id uint) error {
	err := er.db.Delete(&model.Employee{}, id).Error
	if err != nil {
		return err
	}
	return nil
}

func (er *employeeRepository) GetEmployee(employee *model.Employee, employeeId uint) error {
	err := er.db.Find(employee, employeeId).Error
	if err != nil {
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

func (er *employeeRepository) UpdateEmployee(employee *model.Employee, employeeId uint) error {
	err := er.db.Table("employees").Where("id=?", employeeId).Updates(employee).Error
	if err != nil {
		return err
	}
	return nil
}
