package database

import (
  "fmt"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

var (
  Conn *sql.DB
  err error
)

func Initialize(connectionName string, user string, password string) (error) {
  Conn, err = sql.Open("mysql", fmt.Sprintf("%s:%s@cloudsql(%s)/journeyz_prod", user, password, connectionName))
  return err
}
