package repository

import (
	"my_package/graph/model"

	"gorm.io/gorm"
)

// インターフェース
type IVersionRepository interface {
	CreateVersion(version *model.Version) error
	GetVersions(versions *[]*model.Version) error
}

type versionRepository struct {
	db *gorm.DB
}

// コンストラクタ
func NewVersionRepository(db *gorm.DB) IVersionRepository {
	return &versionRepository{db}
}

func (vr *versionRepository) CreateVersion(version *model.Version) error {
	if err := vr.db.Create(version).Error; err != nil {
		return err
	}
	return nil
}

func (vr *versionRepository) GetVersions(versions *[]*model.Version) error {
	err := vr.db.Find(versions).Error
	if err != nil {
		return err
	}
	return nil
}