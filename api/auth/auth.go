package auth

import (
	"github.com/econdie/trek-next/api/database"
	"github.com/econdie/trek-next/api/model"
	"github.com/econdie/trek-next/api/track"
	"log"
	"net/http"
	"time"
)

func Register(email string, password string) model.StandardResponse {
	var response model.StandardResponse

	//password email server side validation
	if len(password) < 8 {
		response.Status = http.StatusBadRequest
		response.Message = "Password must be at least 8 characters."
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
		//hash the password
		hash, err := hashPassword(password)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Error handling password."
			return response
		}

		code, err := generateRandomString(32)
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

		userID, err := res.LastInsertId()
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		token, err := createToken(int(userID), email)
		if err != nil {
			log.Fatal(err)
			response.Status = http.StatusInternalServerError
			response.Message = "Token Failure"
			return response
		}

		//track a login
		track.LoginLog(int(userID), token)

		//return successful login response with JWT to store in cookie client side
		response.Status = http.StatusOK
		response.Payload = make(map[string]interface{})
		response.Payload["code"] = code
		response.Payload["token"] = token
		return response
	}
}

func Login(email string, password string) model.StandardResponse {
	var response model.StandardResponse

	//validate user credentials
	rows, err := database.Conn.Query("select id, email, password from user where email = ?", email)
	if err != nil {
		response.Status = http.StatusInternalServerError
		response.Message = "Database Error"
		return response
	}

	defer rows.Close()
	hasResult := false
	for rows.Next() {
		hasResult = true
		var (
			dbEmail    string
			dbPassword string
			dbUserID   int
		)

		err := rows.Scan(&dbUserID, &dbEmail, &dbPassword)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		//check if credentials are valid
		if email == dbEmail && checkPasswordHash(password, dbPassword) {
			//successful login
			token, err := createToken(dbUserID, dbEmail)
			if err != nil {
				log.Fatal(err)
				response.Status = http.StatusInternalServerError
				response.Message = "Token Failure"
				return response
			}

			//track the login
			track.LoginLog(dbUserID, token)

			//return successful login response with JWT to store in cookie client side
			response.Status = http.StatusOK
			response.Message = "Successful Login"
			response.Payload = make(map[string]interface{})
			response.Payload["token"] = token

			return response
		}
	}

	//login failed - sleep so not obvious in case of no result
	if !hasResult {
		time.Sleep(1 * time.Second)
	}
	response.Status = http.StatusUnprocessableEntity
	response.Message = "Failed Login"
	return response
}
