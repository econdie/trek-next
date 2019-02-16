package auth

import (
    "crypto/rand"
    "database/sql"
    "encoding/base64"
    "log"
    "time"
)

//User is exported for use in the API go file
type User struct {
    id        int
    email     string
    firstname string
    lastname  string
}

//StandardResponse is generally the response struct that should always be returned from the API
type StandardResponse struct {
    Status  string                 `json:"status"`  //should equal "Success" if successful request, or "Error" if unsuccessful
    Data    map[string]interface{} `json:"data"`    //struct for request specific data, can be null if not applicable
    Message string                 `json:"message"` //Optional success message, in case of error should indicate error message
}

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
