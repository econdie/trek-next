package main

import (
  "fmt"
  "net/http"
  "log"
  "os"
  "github.com/rs/cors"
  "github.com/gorilla/mux"
  "github.com/econdie/trek-next/api/database"
)

var (
  jwtkey = os.Getenv("JWT_KEY")
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprint(w, "Hello World")
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprint(w, "Hello World")
}

//we need to check if the database environment variables have been set in the yaml
func checkEnv(envVar string) string {
  v := os.Getenv(envVar)
  if v == "" {
    log.Panicf("%s environment variable not set.", envVar)
  }
  return v
}

func main() {
  //init mux router
  mux := mux.NewRouter()

  //routes
  mux.HandleFunc("/", indexHandler)
  mux.HandleFunc("/signup", signupHandler)

  //handler with CORS options
  handler := cors.New(cors.Options{
      AllowedOrigins:   []string{"*"},
      AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT"},
      AllowedHeaders:   []string{"Accept", "Accept-Language", "Authorization", "Content-Type"},
      AllowCredentials: false,
      Debug:            true,
  }).Handler(mux);

  //database credentials which are taken from yaml file
  var (
    connectionName = checkEnv("CLOUDSQL_CONNECTION_NAME")
    user           = checkEnv("CLOUDSQL_USER")
    password       = checkEnv("CLOUDSQL_PASSWORD")
  )

  //intialize database
  err := database.Initialize(connectionName, user, password)
  if err != nil {
    log.Fatalf("Could not open db: %v", err)
  }

  //start server
  port := os.Getenv("PORT")
  if port == "" {
          port = "8080"
          log.Printf("Defaulting to port %s", port)
  }

  log.Printf("Listening on port %s", port)
  log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handler))
}
