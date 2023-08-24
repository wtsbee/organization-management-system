package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
)

// インターフェース
type IVersionUsecase interface {
	CreateVersion(version model.NewVersion) (*model.Version, error)
	DeleteVersion(id uint) (bool, error)
	GetVersion(versionId uint) (*model.Version, error)
	GetVersions() ([]*model.Version, error)
	UpdateVersion(version model.UpdateVersion) (*model.Version, error)
}

type versionUsecase struct {
	vr repository.IVersionRepository
}

// コンストラクタ
func NewVersionUsecase(vr repository.IVersionRepository) IVersionUsecase {
	return &versionUsecase{vr}
}

func (vu *versionUsecase) CreateVersion(version model.NewVersion) (*model.Version, error) {
	newVersion := model.Version{Name: version.Name, StartedAt: version.StartedAt}
	if err := vu.vr.CreateVersion(&newVersion); err != nil {
		log.Println("CreateVersion error", err)
		return &model.Version{}, err
	}
	log.Println("CreateVersion success")
	return &newVersion, nil
}

func (vu *versionUsecase) DeleteVersion(id uint) (bool, error) {
	if err := vu.vr.DeleteVersion(id); err != nil {
		log.Println("DeleteVersion error", err)
		return false, err
	}
	log.Println("DeleteVersion success")
	return true, nil
}

func (vu *versionUsecase) GetVersion(versionId uint) (*model.Version, error) {
	version := model.Version{}
	if err := vu.vr.GetVersion(&version, versionId); err != nil {
		log.Println("GetVersion error", err)
		return &model.Version{}, err
	}
	log.Println("GetVersion success")
	return &version, nil
}

func (vu *versionUsecase) GetVersions() ([]*model.Version, error) {
	versions := []*model.Version{}
	if err := vu.vr.GetVersions(&versions); err != nil {
		log.Println("GetVersions error", err)
		return nil, err
	}
	log.Println("GetVersions success")
	return versions, nil
}

func (vu *versionUsecase) UpdateVersion(version model.UpdateVersion) (*model.Version, error) {
	newVersion := model.Version{ID: version.ID, Name: version.Name, StartedAt: version.StartedAt}
	if err := vu.vr.UpdateVersion(&newVersion, version.ID); err != nil {
		log.Println("UpdateVersion error", err)
		return &model.Version{}, err
	}
	log.Println("UpdateVersion success")
	return &newVersion, nil
}
