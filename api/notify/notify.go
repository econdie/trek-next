package notify

//this sends a reset password email
func SendResetEmail(to string, code string) error {
	subject := "TrekNext Password Reset"
	html := "<h1>We have received a request to reset the password associated with your email.</h1><br /><p>Here is your reset password link https://journeyz-195518.appspot.com/change?code=" + code + "</p>"
	from := "noreply@treknext.com"
	return send(to, subject, html, from)
}
