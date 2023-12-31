package repository

import (
	"my_package/graph/model"
	"time"

	"gorm.io/gorm"
)

// インターフェース
type IVersionRepository interface {
	CreateVersion(version *model.Version) error
	DeleteVersion(id uint) error
	GetCurrentVersion(version *model.Version) error
	GetVersion(version *model.Version, versionId uint) error
	GetVersions(versions *[]*model.Version) error
	UpdateVersion(version *model.Version, versionId uint) error
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

func (vr *versionRepository) DeleteVersion(id uint) error {
	err := vr.db.Delete(&model.Version{}, id).Error
	if err != nil {
		return err
	}
	return nil
}

func (vr *versionRepository) GetCurrentVersion(version *model.Version) error {
	err := vr.db.Order("started_at desc").Where("started_at <= ?", time.Now()).First(version).Error
	if err != nil {
		return err
	}
	return nil
}

func (vr *versionRepository) GetVersion(version *model.Version, versionId uint) error {
	err := vr.db.Find(version, versionId).Error
	if err != nil {
		return err
	}
	return nil
}

func (vr *versionRepository) GetVersions(versions *[]*model.Version) error {
	err := vr.db.Order("started_at asc").Find(versions).Error
	if err != nil {
		return err
	}
	return nil
}

func (vr *versionRepository) UpdateVersion(version *model.Version, versionId uint) error {
	err := vr.db.Model(version).Where("id=?", versionId).Updates(version).Error
	if err != nil {
		return err
	}
	return nil
}
