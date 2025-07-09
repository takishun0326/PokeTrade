package user

import (
	"backend/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
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

func (h UserHandler) RegisterUser(c *gin.Context) {

	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	registeredUser, err := h.UserUsecase.RegisterUser(req.Email, req.Name, req.Password)
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
