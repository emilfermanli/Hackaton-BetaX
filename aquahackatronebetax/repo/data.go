package repo

import (
	"aquahackatronebetax/models"
	"fmt"
	"github.com/jinzhu/gorm"
)

type DataRepository struct {
	Db *gorm.DB
}

func NewDataRepository(db *gorm.DB) *DataRepository {
	return &DataRepository{Db: db}
}

type Data struct {
	Id          int
	Name        string
	Description string
	Image       string
}

func (repo *DataRepository) FetchData() []Data {

	data := make([]Data, 0)
	err := repo.Db.Table("data").Find(&data).Error

	if err != nil {
		return nil
	}

	return data
}

func (repo *DataRepository) CreateData(name, description, image string) error {

	data := models.NewData(name, description, image)

	if err := data.ValidateData(); err != nil {
		return err
	}

	if err := repo.Db.Create(data).Error; err != nil {
		return fmt.Errorf("failed to create resume us: %v", err.Error())
	}

	fmt.Println(name, description, image)
	return nil
}
