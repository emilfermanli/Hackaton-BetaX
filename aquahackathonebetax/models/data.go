package models

import (
	"errors"
	"github.com/jinzhu/gorm"
)

type Data struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func NewData(name, description, image string) *Data {
	return &Data{
		Name: name, Description: description, Image: image,
	}
}

func (s *Data) ValidateData() error {

	if len(s.Name) == 0 {
		return errors.New("name is invalid")
	}

	if len(s.Description) == 0 {
		return errors.New("description is invalid")
	}

	if len(s.Image) == 0 {
		return errors.New("image is invalid")
	}

	return nil
}
