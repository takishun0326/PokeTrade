package model

import "time"

type User struct {
	ID             string    `gorm:"primaryKey"`
	Name           string    `json:"name"`   // ユーザー名
	Email          string    `gorm:"unique"` // メールアドレス (ユニークであるべき)
	HashedPassword string    `json:"-"`      // JSONに含めない
	CreatedAt      time.Time `gorm:"autoCreateTime"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime"`
}
