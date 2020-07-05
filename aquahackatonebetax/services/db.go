package services

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"sensor-app/models"
)

func CreateDbConnection(connectionUri string) (*gorm.DB, error) {

	db, err := gorm.Open("postgres", connectionUri)
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&models.User{} )
	return db, nil

}

//func NewPool() *redis.Pool {
//	return &redis.Pool{
//		// Maximum number of idle connections in the pool.
//		MaxIdle: 80,
//		// max number of connections
//		MaxActive: 12000,
//		// Dial is an application supplied function for creating and
//		// configuring a connection.
//		Dial: func() (redis.Conn, error) {
//			c, err := redis.Dial("tcp", ":6379")
//			if err != nil {
//				panic(err.Error())
//			}
//			return c, err
//		},
//	}
//}
