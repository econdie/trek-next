package auth

import (
	"github.com/econdie/trek-next/api/database"
	"github.com/econdie/trek-next/api/model"
	"github.com/econdie/trek-next/api/notify"
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

		//get code and do a confirmation email on signup
		code, err := generateRandomString(32)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Error handling sign up."
			return response
		}

		q, err := database.Conn.Prepare("INSERT INTO user(email, password, code) VALUES(?, ?, ?)")
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		res, err := q.Exec(email, hash, code)
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
	response.Message = "Failed Login - credentials do not match an account in our system."
	return response
}

func Reset(email string) model.StandardResponse {
	var response model.StandardResponse

	//validate user credentials
	rows, err := database.Conn.Query("select id from user where email = ?", email)
	if err != nil {
		response.Status = http.StatusInternalServerError
		response.Message = "Database Error"
		return response
	}

	defer rows.Close()
	hasResult := false
	for rows.Next() {
		hasResult = true

		code := getResetCode(email)
		err := notify.SendResetEmail(email, code)
		if err != nil {
			response.Status = http.StatusInternalServerError
			return response
		}
	}

	//no email found - sleep so not obvious in case of no result
	if !hasResult {
		response.Status = http.StatusUnprocessableEntity
		response.Message = "An account with that email does not exist."
	} else {
		response.Status = http.StatusOK
		response.Message = "Please check your email for further instructions."
	}

	return response
}

func ResetConfirmation(code string, email string, password string) model.StandardResponse {
	var response model.StandardResponse

	rows, err := database.Conn.Query("select id from reset where code = ? and email = ? and used = 0", code, email)
	if err != nil {
		log.Fatal(err)
		response.Status = http.StatusInternalServerError
		response.Message = "Database Error"
		return response
	}
	defer rows.Close()

	if rows.Next() {
		var resetID int
		err := rows.Scan(&resetID)

		q, err := database.Conn.Prepare("Update reset SET used = ?, code = ? WHERE id = ?")
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		_, err = q.Exec(1, database.Null, resetID)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		err = setPasswordByEmail(email, password)
		if err != nil {
			response.Status = http.StatusInternalServerError
			response.Message = "Database Error"
			return response
		}

		response.Status = http.StatusOK
		response.Message = "Password has been updated successfully."
		return response
	}

	response.Status = http.StatusUnprocessableEntity
	response.Message = "Something went wrong. Your password reset may have expired."
	return response
}
