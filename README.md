# Petavue Schedular
## Get Started

Setup .ENV file...
```shell
PORT = <PORT_NO>
CLIENT_ID = <GOOGLE_CLOUD_PLATFORM_CLIENT_ID>
CLIENT_SECRET = <GOOGLE_CLOUD_PLATFORM_CLIENT_SECRET>
REDIRECT_URL = <BACKEND_URL>/auth/google/callback
API_KEY = <API_KEY>
SESSION_SECRET_KEY=<YOUR_SECRET>
JWT_SECRET_KEY=<JWT_SECRET>
MONGO_URI=<MONGO_URI>
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

## Routes Info
#### Register/Login User (using google authentication):
```shell
GET http://localhost:8000/auth/google
```

#### Home (User Info):
```shell
POST http://localhost:8000/home
```

#### Register Meet(create all the slots):
```shell
POST http://localhost:8000/register_meet
```

#### Get available slots(of some user using his email):
```shell
POST http://localhost:8000/available_slots/:email
```

#### Schedule an event between both the users(using Google calender API):
```shell
POST http://localhost:8000/schedule_meet
```
