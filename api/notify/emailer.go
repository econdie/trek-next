package notify

import (
	"context"
	"github.com/mailgun/mailgun-go/v3"
	"log"
	"os"
	"strings"
	"time"
)

// sends an email via mailgun
func send(to string, subject string, html string, from string) error {
	//email sent from logic
	var mgFrom strings.Builder
	mgFrom.WriteString("TrekNext <")
	mgFrom.WriteString(from)
	mgFrom.WriteString(">")

	//init mailgun engine
	mg := mailgun.NewMailgun(os.Getenv("MAILGUN_DOMAIN"), os.Getenv("MAILGUN_KEY"))
	message := mg.NewMessage(mgFrom.String(), subject, "", to)
	message.SetHtml(html)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	// Send the message with a 10 second timeout
	_, _, err := mg.Send(ctx, message)

	if err != nil {
		log.Fatal(err)
	}
	return err
}
