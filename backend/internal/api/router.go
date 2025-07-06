package api

import (
	user "backend/internal/api/handlers"
	"backend/internal/domain/repository"
	"backend/internal/usecase"

	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {
	engine := gin.Default()

	// ヘルスチェックエンドポイント
	engine.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// TODO: リポジトリ層のダミー
	var userRepo repository.UserRepository = nil
	// ユースケース層
	userUsecase := usecase.NewUserUsecase(userRepo)
	// ハンドラ層
	userHandler := user.NewUserHandler(userUsecase)

	// ユーザー関連のルートグループ
	// userGroup := engine.Group("/users") // 必要であればグループ化
	// {
	//     userGroup.POST("/register", userHandler.RegisterUser)
	// }
	engine.POST("/users/register", userHandler.RegisterUser)
	return engine
}
