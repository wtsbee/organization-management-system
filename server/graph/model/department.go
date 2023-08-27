package model

import "time"

type Department struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Code      string    `json:"code"`
	Ancestry  string    `json:"ancestry"`
	Version   Version   `json:"version" gorm:"foreignKey:VersionId; constraint:OnDelete:CASCADE"`
	VersionId uint      `json:"version_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type DepartmentTree struct {
	ID       uint              `json:"id"`
	Name     string            `json:"name"`
	Code     string            `json:"code"`
	Ancestry string            `json:"ancestry"`
	Children []*DepartmentTree `json:"children"`
}
