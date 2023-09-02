package model

import "time"

type Employee struct {
	ID           uint       `json:"id" gorm:"primaryKey"`
	FirstName    string     `json:"first_name" gorm:"not null"`
	LastName     string     `json:"last_name" gorm:"not null"`
	Depratment   Department `json:"department" gorm:"foreignKey:DepartmentId"`
	DepartmentId uint       `json:"department_id"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}
