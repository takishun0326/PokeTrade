package datastore

import (
	"log"

	"backend/internal/domain/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	// github.com/mattn/go-sqlite3
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	err = db.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatalf("Failed to auto migrate database: %v", err)
	}

	log.Println("Database connection established and migrated successfully.")
	return db
}
