module github.com/econdie/trek-next/api

replace git.apache.org/thrift.git => github.com/apache/thrift v0.12.0

require (
	github.com/GoogleCloudPlatform/cloudsql-proxy v0.0.0-20190129172621-c8b1d7a94ddf
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/go-sql-driver/mysql v1.4.1
	github.com/gorilla/mux v1.7.0
	github.com/mailgun/mailgun-go/v3 v3.3.0
	github.com/rs/cors v1.6.0
	golang.org/x/crypto v0.0.0-20190211182817-74369b46fc67
	golang.org/x/net v0.0.0-20190213061140-3a22650c66bd // indirect
	golang.org/x/oauth2 v0.0.0-20190212230446-3e8b2be13635 // indirect
	google.golang.org/api v0.1.0 // indirect
	google.golang.org/appengine v1.4.0
)
