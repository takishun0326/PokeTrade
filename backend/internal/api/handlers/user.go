package user

import (
	"backend/internal/usecase"
	"backend/pkg/jwt"
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
		// ユースケースから返されたエラーの種類をチェックし、適切なHTTPステータスコードを返却
		// errors.Is() を使うことで、ラップされたエラー（fmt.Errorf("%w", err)）も判定可
		if errors.Is(err, gorm.ErrRecordNotFound) || errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			// ユーザーが見つからない、またはパスワードが一致しない場合は認証失敗
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		} else {
			// その他の予期せぬエラーはサーバーエラーとして処理
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to login user"})
		}
		return
	}

	// JWT認証
	jwtToken, err := jwt.GenerateToken(loginedUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate authentication token",
		})
	}

	// クッキーにトークンをセット
	// 認証クッキーの有効期間をトークンと同じ24時間 (秒数) に設定
	// Path: "/" (全パスで有効)
	// Domain: "" (現在のドメイン)
	// Secure: false (開発環境ではfalse、本番環境ではtrueに)
	// HttpOnly: true (JavaScriptからのアクセスを禁止し、XSS攻撃を防ぐ)
	const jwtCookieMaxAge = 24 * 60 * 60 // 24時間（秒）
	const jwtCookieSecure = false        // TODO: 本番環境では true に変更すること！

	c.SetSameSite(http.SameSiteLaxMode)
	// クッキーにトークンをセット(キー, 値, 有効期限, パス, ドメイン, https, httponly)
	c.SetCookie("Authorization", jwtToken, jwtCookieMaxAge, "/", "", jwtCookieSecure, true)

	// ログイン成功 200
	c.JSON(http.StatusOK, gin.H{
		"message": "User logined successfully",
		"token":   jwtToken,
		"user": gin.H{
			"id":    loginedUser.ID,
			"name":  loginedUser.Name,
			"email": loginedUser.Email,
		},
	})
}
