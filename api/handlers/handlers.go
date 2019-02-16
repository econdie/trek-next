package handlers

import (
  "strings"
  "fmt"
  "net/http"
  "log"
  "os"
  "encoding/json"
  "database/sql"
  "google.golang.org/appengine"
  _ "github.com/go-sql-driver/mysql"
)

func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprint(w, "Hello World")
}

func init() {
  //database credentials which are taken from yaml file
  // var (
  //   connectionName = mustGetenv("CLOUDSQL_CONNECTION_NAME")
  //   user           = mustGetenv("CLOUDSQL_USER")
  //   password       = os.Getenv("CLOUDSQL_PASSWORD") // NOTE: password may be empty
  // )

  //open the database connection
  // var err error
  // db, err = sql.Open("mysql", fmt.Sprintf("%s:%s@cloudsql(%s)/journeyz_prod", user, password, connectionName))
  // if err != nil {
  //   log.Fatalf("Could not open db: %v", err)
  // }

  http.HandleFunc("/", handler)
  // http.HandleFunc("/register", registerHandler)
  // http.HandleFunc("/login", loginHandler)
  // http.HandleFunc("/profile", profileHandler)
  // http.HandleFunc("/activate", activateHandler)
  // http.HandleFunc("/reset", resetHandler)
  // http.HandleFunc("/change", changeHandler)
  // http.HandleFunc("/addJourney", addJourneyHandler)
  // http.HandleFunc("/getSettings", getSettingsHandler)
  // http.HandleFunc("/saveSettings", saveSettingsHandler)
}
