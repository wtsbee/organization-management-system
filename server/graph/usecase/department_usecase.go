package usecase

import (
	"log"
	"my_package/graph/model"
	"my_package/graph/repository"
	"strconv"
	"strings"
)

// インターフェース
type IDepartmentUsecase interface {
	GetDepartmentTree(versionId uint) ([]*model.DepartmentTree, error)
}

type departmentUsecase struct {
	dr repository.IDepartmentRepository
}

// コンストラクタ
func NewDepartmentUsecase(dr repository.IDepartmentRepository) IDepartmentUsecase {
	return &departmentUsecase{dr}
}

func (du *departmentUsecase) GetDepartmentTree(versionId uint) ([]*model.DepartmentTree, error) {
	departments := []*model.Department{}
	if err := du.dr.GetDepartmentsByVersionId(&departments, versionId); err != nil {
		log.Println("GetDepartmentTree error", err)
		return nil, err
	}

	departmentMap := make(map[int]*model.DepartmentTree)
	var rootDepartments []*model.DepartmentTree

	for _, v := range departments {
		dep := &model.DepartmentTree{ID: v.ID, Name: v.Name, Code: v.Code, Ancestry: v.Ancestry, Children: []*model.DepartmentTree{}}
		departmentMap[int(dep.ID)] = dep
		if dep.Ancestry == "" {
			rootDepartments = append(rootDepartments, dep)
		} else {
			parentIDs := strings.Split(dep.Ancestry, "/")
			parentID := parentIDs[len(parentIDs)-1]
			num, err := strconv.Atoi(parentID)
			if err != nil {
				log.Println("GetDepartmentTree error", err)
				return nil, err
			}
			parent, ok := departmentMap[num]
			if !ok {
				continue
			}
			parent.Children = append(parent.Children, dep)
		}
	}

	return rootDepartments, nil
}
