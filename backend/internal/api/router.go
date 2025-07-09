package api

import (
	user "backend/internal/api/handlers"
	"backend/internal/domain/repository"
	"backend/internal/infrastructure/datastore"
	"backend/internal/usecase"

	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {
	engine := gin.Default()

	// ヘルスチェックエンドポイント
	engine.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// 1. DB接続
	db := datastore.NewDB()

	// 2. リポジトリ層
	userRepoImpl := &datastore.UserRepositoryImpl{DB: db}
	var userRepo repository.UserRepository = userRepoImpl

	// 3. ユースケース層
	userUsecase := usecase.NewUserUsecase(userRepo)
	// 4. ハンドラ層
	userHandler := user.NewUserHandler(userUsecase)

	// ユーザー関連のルートグループ
	// userGroup := engine.Group("/users") // 必要であればグループ化
	// {
	//     userGroup.POST("/register", userHandler.RegisterUser)
	// }
	engine.POST("/users/register", userHandler.RegisterUser)
	engine.POST("/users/login", userHandler.LoginUser)
	return engine
}
