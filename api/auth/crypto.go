package auth

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/econdie/trek-next/api/database"
	"golang.org/x/crypto/bcrypt"
	"log"
	"time"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func checkPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

//returns securely generated random bytes.
func generateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

// URL-safe, base64 encoded securely generated random string.
func generateRandomString(s int) (string, error) {
	b, err := generateRandomBytes(s)
	return base64.URLEncoding.EncodeToString(b), err
}

//creates a password request for the user linked to the given email
func getResetCode(email string) string {
	//first we will query the database and delete old reset requests (used and/or expired)
	q, err := database.Conn.Prepare("DELETE from reset where used = ? or expires < ?")
	if err != nil {
		log.Fatal(err)
	}

	_, err = q.Exec(1, time.Now())
	if err != nil {
		log.Fatal(err)
	}

	//next insert the new reset request
	code, err := generateRandomString(32)
	if err != nil {
		log.Fatal(err)
	}

	q, err = database.Conn.Prepare("INSERT INTO reset(email, used, code, expires) VALUES(?, ?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}

	_, err = q.Exec(email, 0, code, time.Now().Add(time.Hour*10))
	if err != nil {
		log.Fatal(err)
	}

	return code
}
