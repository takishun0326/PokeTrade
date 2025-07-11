package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {

	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		// 秘密鍵が設定されていない場合はエラーを返す
		log.Println("JWT_SECRET_KEY environment variable not set")
		return func(c *gin.Context) {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Server configuration error"})
		}
	}

	return func(c *gin.Context) {
		jwtToken, err := c.Cookie("Authorization")
		if err != nil {
			// Cookieにトークンが無い場合
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: No token provided"})
			return
		}
		token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
			// 署名アルゴリズムの検証 (HMAC以外は拒否)
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(secretKey), nil
		})

		if err != nil {
			// トークンのパースまたは検証に失敗した場合
			log.Printf("AuthMiddleware: Token validation failed: %v", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid token"})
			return
		}

		// クレームの安全な取得と有効期限の検証
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			log.Println("AuthMiddleware: Invalid token claims or token is not valid.")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid token claims"})
			return
		}

		exp, ok := claims["exp"].(float64) // exp はfloat64としてパースされることが多い
		if !ok {
			log.Println("AuthMiddleware: Token 'exp' claim is missing or invalid.")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid token expiration"})
			return
		}

		if time.Now().Unix() > int64(exp) {
			// トークンが期限を過ぎている
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Token expired"})
			return
		}

		// "sub" (subject) クレームからユーザーIDを取得
		userID, ok := claims["sub"].(string)
		if !ok || userID == "" {
			log.Println("AuthMiddleware: Token 'sub' claim is missing or invalid.")
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Invalid user ID in token"})
			return
		}

		// 認証成功！ユーザーIDをGinのコンテキストに保存して次のハンドラーに渡す
		c.Set("userID", userID) // c.Get("userID") で取得可能になる

		// 次のハンドラーまたはミドルウェアに進む
		c.Next()
	}
}
