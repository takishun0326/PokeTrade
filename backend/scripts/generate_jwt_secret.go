package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
)

func generateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}
	return b, nil
}

func main() {
	// 32バイト（256ビット）のランダムなバイト列を生成
	keyBytes, err := generateRandomBytes(32)
	if err != nil {
		log.Fatal(err)
	}

	// Base64エンコードして、環境変数に設定しやすい文字列形式にする
	secretKey := base64.URLEncoding.EncodeToString(keyBytes)
	fmt.Println("Generated Secret Key:", secretKey)
	// 例: Generated Secret Key: jK4XyQzPqW5R0sV7T2u1v9w8x3yC6fD0
}
