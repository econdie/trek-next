package model

//StandardResponse - all responses should use this struct
type StandardResponse struct {
	Status  int                     `json:"status"`  //response status code, 200 for OK, etc.
	Payload map[string]interface{}  `json:"payload"` //struct for request specific data, can be null if not applicable
	Message string                  `json:"message"` //optional message text
}
