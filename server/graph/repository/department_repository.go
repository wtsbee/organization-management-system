package repository

import (
	"my_package/graph/model"

	"gorm.io/gorm"
)

// インターフェース
type IDepartmentRepository interface {
	CreateDepartment(department *model.Department) error
	GetDepartmentsByVersionId(departments *[]*model.Department, versionId uint) error
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

func (dr *departmentRepository) GetDepartmentsByVersionId(departments *[]*model.Department, versionId uint) error {
	err := dr.db.Where("version_id = ?", versionId).Order("code asc").Find(departments).Error
	if err != nil {
		return err
	}
	return nil
}
