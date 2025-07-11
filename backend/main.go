// backend/main.go
package main

import (
	api "backend/internal/api"
	"log"

	"github.com/joho/godotenv"
)

func init() {
	// .envファイルを読み込む
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Error loading .env file, assuming environment variables are set externally.")
		// エラーで強制終了させず、ログを出すだけにすることで、
		// 本番環境などで環境変数が直接設定されている場合でも動作するようにする。
		// ただし、JWT_SECRET_KEY が必須の場合は、その後のチェックでエラーにする。
	} else {
		log.Println(".env file loaded successfully.")
	}

}

func main() {
	router := api.SetRouter()
	router.Run(":8080")
}

// mux := http.NewServeMux()                                                   // ハンドラをNewServeMuxで管理
// mux.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) { // エンドポイントを /api/hello に変更
// 	fmt.Fprintf(w, "Hello from Go Backend! (from API)")
// })

// // CORSミドルウェアを設定
// c := cors.New(cors.Options{
// 	AllowedOrigins:   []string{"http://localhost:3000"}, // Next.jsが動作するオリジンを許可
// 	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
// 	AllowedHeaders:   []string{"Content-Type", "Authorization"},
// 	AllowCredentials: true,
// })

// handler := c.Handler(mux) // CORSハンドラを適用

// port := ":8080"
// fmt.Printf("Go server started on port %s\n", port)
// log.Fatal(http.ListenAndServe(port, handler)) // CORSハンドラでサーバーを起動
