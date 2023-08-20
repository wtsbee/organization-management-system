package usecase

import (
	"my_package/graph/model"
	"my_package/graph/repository"
)

// インターフェース
type IVersionUsecase interface {
	CreateVersion(version model.NewVersion) (model.Version, error)
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
