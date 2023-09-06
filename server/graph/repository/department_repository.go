package repository

import (
	"fmt"
	"my_package/graph/model"

	"gorm.io/gorm"
)

// インターフェース
type IDepartmentRepository interface {
	CreateDepartment(department *model.Department) error
	GetDepartmentById(department *model.Department, id uint) error
	GetDepartmentsByVersionId(departments *[]*model.Department, versionId uint) error
	UpdateDepartment(department *model.Department, updateDepartment model.UpdateDepartment) error
}

type departmentRepository struct {
	db *gorm.DB
}

// コンストラクタ
func NewDepartmentRepository(db *gorm.DB) IDepartmentRepository {
	return &departmentRepository{db}
}

func (dr *departmentRepository) CreateDepartment(department *model.Department) error {
	if err := dr.db.Create(department).Error; err != nil {
		return err
	}
	return nil
}

func (dr *departmentRepository) GetDepartmentById(department *model.Department, id uint) error {
	err := dr.db.Find(department, id).Error
	if err != nil {
		return err
	}
	return nil
}

func (dr *departmentRepository) GetDepartmentsByVersionId(departments *[]*model.Department, versionId uint) error {
	err := dr.db.Where("version_id = ?", versionId).Order("code asc").Find(departments).Error
	if err != nil {
		return err
	}
	return nil
}

func (dr *departmentRepository) UpdateDepartment(department *model.Department, updateDepartment model.UpdateDepartment) error {
	err := dr.db.Model(department).Updates(updateDepartment).Error
	if err != nil {
		return err
	}
	fmt.Println(department.VersionId)
	return nil
}
