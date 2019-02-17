package auth

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/econdie/trek-next/api/database"
	"github.com/econdie/trek-next/api/model"
	"log"
	"net/http"
)

//returns securely generated random bytes.
func GenerateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

// URL-safe, base64 encoded securely generated random string.
func GenerateRandomString(s int) (string, error) {
	b, err := GenerateRandomBytes(s)
	return base64.URLEncoding.EncodeToString(b), err
}

func Register(email string, password string) model.StandardResponse {
	var response model.StandardResponse

	//password email server side validation
	if len(password) < 8 {
		response.Status = http.StatusBadRequest
		response.Error = "Password must be at least 8 characters."
		return response
	}

	//hash the password
	hash, err := hashPassword(password)
	if err != nil {
		response.Status = http.StatusInternalServerError
		response.Error = "Error handling password."
		return response
	}

	//query db to check if email already exists
	rows, err := database.Conn.Query("select email from user where email = ?", email)
	if err != nil {
		log.Fatal(err)
		response.Status = http.StatusInternalServerError
		response.Message = "Database Error"
		return response
	}

	defer rows.Close()

	if rows.Next() {
		response.Status = http.StatusConflict
		response.Message = "Email already registered."
		return response
	} else {
		code, err := GenerateRandomString(32)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Error handling sign up."
			return response
		}

		q, err := database.Conn.Prepare("INSERT INTO user(email, password, active, code) VALUES(?, ?, ?, ?)")
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		res, err := q.Exec(email, hash, 0, code)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		_, err = res.LastInsertId()
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		response.Status = http.StatusOK
		response.Data = make(map[string]interface{})
		response.Data["code"] = code
		return response
	}
}
