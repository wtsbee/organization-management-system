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
	CreateDepartment(department model.NewDepartment) (*model.Department, error)
	GetDepartments(versionId uint) ([]*model.Department, error)
	GetDepartmentTree(versionId uint) ([]*model.DepartmentTree, error)
	UpdateDepartment(department model.UpdateDepartment) (*model.Department, error)
}

type departmentUsecase struct {
	dr repository.IDepartmentRepository
}

// コンストラクタ
func NewDepartmentUsecase(dr repository.IDepartmentRepository) IDepartmentUsecase {
	return &departmentUsecase{dr}
}

func (du *departmentUsecase) CreateDepartment(department model.NewDepartment) (*model.Department, error) {
	NewDepartment := model.Department{Name: department.Name, Code: department.Code, Ancestry: department.Ancestry, VersionId: department.VersionID}
	if err := du.dr.CreateDepartment(&NewDepartment); err != nil {
		log.Println("CreateDepartment error", err)
		return &model.Department{}, err
	}
	log.Println("CreateDepartment success")
	return &NewDepartment, nil
}

func (du *departmentUsecase) GetDepartments(versionId uint) ([]*model.Department, error) {
	departments := []*model.Department{}
	if err := du.dr.GetDepartmentsByVersionId(&departments, versionId); err != nil {
		log.Println("GetDepartments error", err)
		return nil, err
	}
	log.Println("GetDepartments success")
	return departments, nil
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
	log.Println("GetDepartmentTree success")
	return rootDepartments, nil
}

func (du *departmentUsecase) UpdateDepartment(updateDepartment model.UpdateDepartment) (*model.Department, error) {
	var newDepartment model.Department
	if err := du.dr.GetDepartmentById(&newDepartment, updateDepartment.ID); err != nil {
		log.Println("UpdateDepartment error", err)
		return &model.Department{}, err
	}
	if err := du.dr.UpdateDepartment(&newDepartment, updateDepartment); err != nil {
		log.Println("UpdateDepartment error", err)
		return &model.Department{}, err
	}
	log.Println("UpdateDepartment success")
	return &newDepartment, nil
}
