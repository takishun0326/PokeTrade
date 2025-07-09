package datastore

import (
	"backend/internal/domain/model"

	"gorm.io/gorm"
)

// repository/user.goのUserRepository interfaceのルールに基づき実装される
// repository.UserRepository interface
type UserRepositoryImpl struct {
	DB *gorm.DB
}

// このメソッドがあるおかげで，UserRepository interfaceの条件を満たす
func (r *UserRepositoryImpl) Save(user *model.User) error {
	res := r.DB.Create(user) // userをgormでDBに保存
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (r *UserRepositoryImpl) FindByEmail(email string) (*model.User, error) {
	var user model.User
	res := r.DB.Where("email = ?", email).First(&user)
	if res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
}
