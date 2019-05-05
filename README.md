# treknext

What will be your next trek? | WIP

# SDK Commands

Update Cloud SDK:
gcloud components update

List Available Cloud Projects:
gcloud projects list

View Current Cloud Config:
gcloud config list

Change Current Project:
gcloud config set project MY_PROJECT

# API Setup

To install and build API go dependencies, cd into /api/main and 'go build'
To prune any no longer needed dependencies, cd into /api/main and 'go mod tidy'
To run api dev server locally, cd into /api/main and 'dev_appserver.py api.yaml'
To deploy api updates live, cd into /api/main and 'gcloud app deploy api.yaml --version 1'
To run Go code formatter, cd into /api/ and 'gofmt -w ./'

# Client Setup

To install client next.js dependencies, cd into /www/ and 'npm install'
To run client dev server locally, cd into /www/ and 'npm run dev'
To deploy client updates live, cd into /www/ and 'npm run deploy'
