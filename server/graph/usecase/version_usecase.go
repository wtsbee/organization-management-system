package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
)

// インターフェース
type IVersionUsecase interface {
	CreateVersion(version model.NewVersion) (model.Version, error)
	GetVersions() ([]*model.Version, error)
}

type versionUsecase struct {
	vr repository.IVersionRepository
}

// コンストラクタ
func NewVersionUsecase(vr repository.IVersionRepository) IVersionUsecase {
	return &versionUsecase{vr}
}

func (vu *versionUsecase) CreateVersion(version model.NewVersion) (model.Version, error) {
	newVersion := model.Version{Name: version.Name, StartedAt: version.StartedAt}
	if err := vu.vr.CreateVersion(&newVersion); err != nil {
		return model.Version{}, err
	}
	return newVersion, nil
}

func (vu *versionUsecase) GetVersions() ([]*model.Version, error) {
	versions := []*model.Version{}
	if err := vu.vr.GetVersions(&versions); err != nil {
		log.Println("GetVersions error", err)
		return nil, err
	}
	return versions, nil
}
