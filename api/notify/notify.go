package notify

import (
	"fmt"
	"github.com/econdie/trek-next/api/environment"
)

//this sends a reset password email
func SendResetEmail(to string, code string) error {
	subject := "TrekNext Password Reset"
	html := fmt.Sprintf("<h4>We have received a request to reset the password associated with your email.</h4><p>Here is your reset password link: %s/reset/%s </p>", environment.CLIENT_URL, code)
	from := "noreply@treknext.com"
	return send(to, subject, html, from)
}

//this sends a welcome confirmation email
func SendWelcomeEmail(to string, code string) error {
	subject := "Welcome to TrekNext!"
	html := fmt.Sprintf("<h4>Thanks for signing up!</h4><p>Please follow this link to confirm your email: %s/confirm/%s </p>", environment.CLIENT_URL, code)
	from := "noreply@treknext.com"
	return send(to, subject, html, from)
}
