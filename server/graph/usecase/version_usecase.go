package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
)

var CurrentVersion model.Version

// インターフェース
type IVersionUsecase interface {
	CreateVersion(version model.NewVersion) (*model.Version, error)
	DeleteVersion(id uint) (bool, error)
	GetVersion(versionId uint) (*model.Version, error)
	GetVersions() ([]*model.ResponseVersion, error)
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

func (vu *versionUsecase) GetVersions() ([]*model.ResponseVersion, error) {
	// currentVersion := model.Version{}
	if err := vu.vr.GetCurrentVersion(&CurrentVersion); err != nil {
		log.Println("GetCurrentVersion error", err)
		return nil, err
	}
	versions := []*model.Version{}
	if err := vu.vr.GetVersions(&versions); err != nil {
		log.Println("GetVersions error", err)
		return nil, err
	}
	var res []*model.ResponseVersion
	for _, v := range versions {
		res = append(res, &model.ResponseVersion{ID: v.ID, Name: v.Name, StartedAt: v.StartedAt, Status: checkStatus(*v)})
	}
	log.Println("GetVersions success")
	return res, nil
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

// func isInUse(inputTime time.Time) bool {
// 	// var names []string
// 	// if err := db.Table("users").Select("name").Find(&names).Error; err != nil {
// 	// 	fmt.Println("Error:", err)
// 	// }
// 	return true
// }

// func formatVersionData(v model.Version) map[string]interface{} {
// 	result := make(map[string]interface{})
// 	result["id"] = v.ID
// 	result["startedAt"] = v.StartedAt.Format("2006.01.02") // "YYYY.MM.DD" フォーマットに変換
// 	result["title"] = v.Name
// 	result["status"] = status(v)
// 	return result
// }

func checkStatus(v model.Version) string {
	if isFuture(v) {
		return "future"
	} else if isPast(v) {
		return "past"
	} else {
		return "current"
	}
}

func isFuture(v model.Version) bool {
	// return v.StartedAt.After(time.Now())
	return v.StartedAt.After(CurrentVersion.StartedAt)
}

func isPast(v model.Version) bool {
	return v.StartedAt.Before(CurrentVersion.StartedAt)
}
