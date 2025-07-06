package model

import "time"

type User struct {
	ID             string    // ユーザーを一意に識別するID
	Name           string    // ユーザー名
	Email          string    // メールアドレス (ユニークであるべき)
	HashedPassword string    // ハッシュ化されたパスワード
	CreatedAt      time.Time // 作成日時
	UpdatedAt      time.Time // 更新日時
}
