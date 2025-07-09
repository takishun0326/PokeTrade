package usecase

import (
	"backend/internal/domain/model"
	"backend/internal/domain/repository"
	"fmt"
	"log"
	"time"
)

type UserUsecase struct {
	UserRepository repository.UserRepository
}

// UserUsecaseの新しいインスタンス
func NewUserUsecase(repo repository.UserRepository) *UserUsecase {
	return &UserUsecase{
		UserRepository: repo,
	}
}

func (u *UserUsecase) RegisterUser(name, email, password string) (*model.User, error) {
	hashedPassword := "dummy_hashed_pass_" + password

	newUser := &model.User{
		ID:             fmt.Sprintf("user-%d", time.Now().UnixNano()), // ★今はダミーID
		Name:           name,
		Email:          email,
		HashedPassword: hashedPassword,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	// 	datastore/user.goのSaveを使う
	err := u.UserRepository.Save(newUser)
	if err != nil {
		log.Fatalf("Failed to save user: %v", err)
	}

	return newUser, nil
}
