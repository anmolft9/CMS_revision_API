# API server for the ECommerce admin cms

Here is the repo for the frontend app...

## APIs

All the api lend points will follow the following patterns `{rootUrl}/api/v1`

### Admin User API

This api endpoint us responsible for gabdleing all the admin user related requests.

ALl the Admin api endpoints will follow the following patterns `{rootUrl}/api/v1/admin-user`

| #   | PATH | METHOD | PRIVATE | DESCRIPTION |
| --- | ---- | ------ | ------- | ----------- |

| 1. | `/` | POST | NO | Receives new admin data and create new admin in our database. If admin user's email already exist, it will return error otherwise it will return success with user info from database

| 2. | `/verify-email`| PATCH | NO | Receives `email, verificationCode` to verify newly create user action, returns success or error accordingly.

| 3. | `/login` | POST | NO | Receives `{email, password}` and checks if the user exist for that combination in our database, if it does, it will handle all the login process
