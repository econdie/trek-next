package track

import (
	"github.com/econdie/trek-next/api/database"
	"log"
	"time"
)

//LoginLog logs an entry in the database for each user login
func LoginLog(userID int, token string) {
	q, err := database.Conn.Prepare("INSERT INTO login(user_id, token, time) VALUES(?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}

	_, err = q.Exec(userID, token, time.Now())
	if err != nil {
		log.Fatal(err)
	}
}
