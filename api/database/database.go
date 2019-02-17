package database

import (
	"database/sql"
	"fmt"
	_ "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/mysql"
	_ "github.com/go-sql-driver/mysql"
)

var (
	Conn *sql.DB
	err  error
)

func Initialize(connectionName string, user string, password string) error {
	Conn, err = sql.Open("mysql", fmt.Sprintf("%s:%s@cloudsql(%s)/journeyz_prod", user, password, connectionName))
	return err
}
