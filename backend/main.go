// backend/main.go
package main

import (
	api "backend/internal/api"
	datastore "backend/internal/infrastructure/datastore"
	"fmt"
)

func main() {
	router := api.SetRouter()
	db := datastore.NewDB()
	fmt.Println(db)
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
