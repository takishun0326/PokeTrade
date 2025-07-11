package usecase

import (
	"backend/internal/domain/model"
	"backend/internal/domain/repository"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
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
	// Passwordのハッシュ
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	newUser := &model.User{
		ID:             fmt.Sprintf("user-%d", time.Now().UnixNano()), // ★今はダミーID
		Name:           name,
		Email:          email,
		HashedPassword: string(hashedPassword),
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	// 	datastore/user.goのSaveを使う
	err = u.UserRepository.Save(newUser)
	if err != nil {
		// Emailがユニークでない場合など、具体的なエラーを返すことを検討
		return nil, fmt.Errorf("failed to save user: %w", err)
	}
	return newUser, nil
}

func (u *UserUsecase) LoginUser(email, password string) (*model.User, error) {

	user, err := u.UserRepository.FindByEmail(email)
	if err != nil {
		// GORMが見つからないエラー (gorm.ErrRecordNotFound) を返すため，適切に処理
		return nil, fmt.Errorf("user not found or database error: %w", err)
	}
	// Passwordの比較
	err = bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(password))
	if err != nil {
		// bcrypt.CompareHashAndPassword は一致しない場合 bcrypt.ErrMismatchedHashAndPassword を返却
		return nil, fmt.Errorf("invalid credentials: %w", err) // 汎用的なエラーメッセージ
	}

	return user, nil
}
