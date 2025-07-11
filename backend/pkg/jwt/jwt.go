package jwt

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// LoginのJWT認証．ユーザーIDでJWTを生成
func GenerateToken(userID string) (string, error) {
	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		// 秘密鍵が設定されていない場合はエラーを返す
		return "", fmt.Errorf("JWT_SECRET_KEY environment variable not set")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userID,
		// 有効期限を1日に設定
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(secretKey))

	if err != nil {
		// 署名中にエラーが発生した場合
		return "", fmt.Errorf("failed to sign token: %w", err)
	}
	return tokenString, nil
}
