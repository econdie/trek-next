package auth

import (
	"github.com/dgrijalva/jwt-go"
	"os"
	"time"
)

var (
	jwtKey = os.Getenv("JWT_KEY")
)

func createToken(userID int, email string) (string, error) {
	// Create the token
	token := jwt.New(jwt.SigningMethodHS256)
	// Set some claims
	token.Claims = jwt.MapClaims{
		"iss":    "journeyz",
		"email":  email,
		"userid": userID,
		"exp":    time.Now().Add(time.Hour * 72).Unix(),
	}
	// Sign and get the complete encoded token as a string
	tokenString, err := token.SignedString([]byte(jwtKey))
	return tokenString, err
}
