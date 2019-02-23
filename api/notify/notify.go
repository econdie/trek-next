package notify

import (
	"fmt"
	"github.com/econdie/trek-next/api/environment"
)

//this sends a reset password email
func SendResetEmail(to string, code string) error {
	subject := "TrekNext Password Reset"
	html := fmt.Sprintf("<h4>We have received a request to reset the password associated with your email.</h4><br /><p>Here is your reset password link: %s/reset/%s </p>", environment.CLIENT_URL, code)
	from := "noreply@treknext.com"
	return send(to, subject, html, from)
}
