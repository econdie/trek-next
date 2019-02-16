package main

import (
  "fmt"
  "net/http"
  "log"
  "os"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprint(w, "Hello World")
}

func main() {
  http.HandleFunc("/", indexHandler)

  port := os.Getenv("PORT")
  if port == "" {
          port = "8080"
          log.Printf("Defaulting to port %s", port)
  }

  log.Printf("Listening on port %s", port)
  log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
