package user

import (
	"backend/internal/usecase"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"` // requiredの右に ,min=6を追加したい
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"` // requiredの右に ,min=6を追加したい
}

// ユーザー関連のAPIハンドラーをグループ化するための構造体
type UserHandler struct {
	UserUsecase *usecase.UserUsecase
}

func NewUserHandler(uu *usecase.UserUsecase) *UserHandler {
	return &UserHandler{
		UserUsecase: uu,
	}
}

func (h *UserHandler) RegisterUser(c *gin.Context) {

	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registeredUser, err := h.UserUsecase.RegisterUser(req.Name, req.Email, req.Password)
	if err != nil {
		// TODO: エラーの種類に応じて、より具体的なHTTPステータスコードを返却
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User registered successfully",
		"user": gin.H{
			"id":    registeredUser.ID,
			"name":  registeredUser.Name,
			"email": registeredUser.Email,
		},
	})
}

func (h *UserHandler) LoginUser(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	loginedUser, err := h.UserUsecase.LoginUser(req.Email, req.Password)
	if err != nil {
		// ユースケースから返されたエラーの種類をチェックし、適切なHTTPステータスコードを返します。
		// errors.Is() を使うことで、ラップされたエラー（fmt.Errorf("%w", err)）も判定できます。
		if errors.Is(err, gorm.ErrRecordNotFound) || errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			// ユーザーが見つからない、またはパスワードが一致しない場合は認証失敗
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		} else {
			// その他の予期せぬエラーはサーバーエラーとして処理
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to login user"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User logined successfully",
		"user": gin.H{
			"id":    loginedUser.ID,
			"name":  loginedUser.Name,
			"email": loginedUser.Email,
		},
	})
}
