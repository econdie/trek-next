package environment

import (
	"google.golang.org/appengine"
	"os"
)

var (
	IS_DEV     bool
	CLIENT_URL string
)

func Initialize() {
	IS_DEV = appengine.IsDevAppServer()

	if IS_DEV {
		CLIENT_URL = os.Getenv("CLIENT_DEV")
	} else {
		CLIENT_URL = os.Getenv("CLIENT_PROD")
	}

	return
}
