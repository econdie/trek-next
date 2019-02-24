package main

import (
	"encoding/json"
	"fmt"
	"github.com/econdie/trek-next/api/auth"
	"github.com/econdie/trek-next/api/database"
	"github.com/econdie/trek-next/api/environment"
	"github.com/econdie/trek-next/api/model"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

//helper function to json encode a response
func jsonResponse(response interface{}, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")

	json, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(response.(model.StandardResponse).Status)
	w.Write(json)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello World")
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	type requestFormat struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	request := requestFormat{}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		var response model.StandardResponse
		response.Status = http.StatusBadRequest
		jsonResponse(response, w)
	} else {
		jsonResponse(auth.Register(request.Email, request.Password), w)
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	type requestFormat struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	request := requestFormat{}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		var response model.StandardResponse
		response.Status = http.StatusBadRequest
		jsonResponse(response, w)
	} else {
		jsonResponse(auth.Login(request.Email, request.Password), w)
	}
}

func resetHandler(w http.ResponseWriter, r *http.Request) {
	type requestFormat struct {
		Email string `json:"email"`
	}

	request := requestFormat{}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		var response model.StandardResponse
		response.Status = http.StatusBadRequest
		jsonResponse(response, w)
	} else {
		jsonResponse(auth.Reset(request.Email), w)
	}
}

func resetConfirmationHandler(w http.ResponseWriter, r *http.Request) {
	type requestFormat struct {
		Code     string `json:"code"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	request := requestFormat{}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		var response model.StandardResponse
		response.Status = http.StatusBadRequest
		jsonResponse(response, w)
	} else {
		jsonResponse(auth.ResetConfirmation(request.Code, request.Email, request.Password), w)
	}
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
	//auth routes
	mux.HandleFunc("/signup", signupHandler)
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/reset/confirmation", resetConfirmationHandler)
	mux.HandleFunc("/reset", resetHandler)

	//handler with CORS options
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT"},
		AllowedHeaders:   []string{"Accept", "Accept-Language", "Authorization", "Content-Type", "Origin"},
		AllowCredentials: false,
		Debug:            true,
	}).Handler(mux)

	//database credentials which are taken from yaml file
	var (
		connectionName = checkEnv("CLOUDSQL_CONNECTION_NAME")
		user           = checkEnv("CLOUDSQL_USER")
		password       = checkEnv("CLOUDSQL_PASSWORD")
	)

	//initialize dev/prod env variables
	environment.Initialize()

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
