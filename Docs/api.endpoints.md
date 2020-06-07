# Authentication

**Note**:- For endpoints which require the authentication, provide `Authorization` header as `Bearer "FakeAcessToken"`

### Login

```
POST /api/v1/auth/login
```

**Parameters**

Name              | Data Type | Required | Default Value  | Description
------------------|-----------|----------|----------------|--------------------
email             | text      | true     | null           | email of the user.
password          | text      | true     | null           | password of the user.

__NOTE__ 

- Error out in case of invalid email/password.
- Error out in case of missing **required** attributes.

**Request**
```json
{
    "email": "hello@example.com",
    "password": "VerySafePassword0909"
}
```

**Response**
Status: 200 OK
```json
{
    "user": {
        "id": "171956bd-717f-4021-a901-c5be80fd469b",
        "first_name": "John",
        "last_name": "Howley",
        "email": "hello@example.com",
        "phone_number": "",
        "is_active": true,
        "is_staff": false,
       },

    "token": {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4ODI0MTU2NSwianRpIjoiYTA1OTUzZTE2OTNiNGU0M2IxMTllMjYwMzM5M2NhNWYiLCJ1c2VyX2lkIjoiYjgxY2FkNmQtMGQ1Ni00ODQxLTg1ZWUtODJjNDQ2ZGEzOGI5In0.t_P43_QiNFk2zhNdHRvJGD68jZWWcGrBtZd6G0obINw",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg4MTU1NDY1LCJqdGkiOiIyMmNhNTNkMjgyZDQ0NTc3YjdjMTA4ZDA4M2I2MjMxYyIsInVzZXJfaWQiOiJiODFjYWQ2ZC0wZDU2LTQ4NDEtODVlZS04MmM0NDZkYTM4YjkifQ.qWzd1WVmOpB5GCeCBLnjcnafZuudwPWWUPhSiCpUp9Q"
    }
}
```

### Register

```
POST /api/v1/auth/register
```

**Parameters**

Name              | Data Type | Required | Default Value  | Description
------------------|-----------|----------|----------------|--------------------
email             | text      | true     | null           | email of the user.
password          | text      | true     | null           | password of the user.
first_name        | text      | false    | ""             | first name of the user.
last_name         | text      | false    | ""             | last name of the user.
contact           | text      | false    | ""             | mobile number of the user.

__NOTE__
- Error out if email is already registered with Status 400 Bad Request
- Error out if email is registered but not verified with Status 403 Forbidden

**Request**
```json
{
    "email": "hello@example.com",
    "password": "VerySafePassword0909",
    "first_name": "John",
    "last_name": "Howley",
    "contact": "8234567890"
}
```

**Response**
Status: 201 Created
```json
{ 
    "user":{
        "id": "1f19560d-f1ff-4021-a901-c50e80fd4690",
        "first_name": "John",
        "last_name": "Howley",
        "email": "hello@example.com",
        "phone_number": "+911234567890",
        "is_active": false,
        "is_staff": false,
     },

     "token": {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4ODI0MTU2NSwianRpIjoiYTA1OTUzZTE2OTNiNGU0M2IxMTllMjYwMzM5M2NhNWYiLCJ1c2VyX2lkIjoiYjgxY2FkNmQtMGQ1Ni00ODQxLTg1ZWUtODJjNDQ2ZGEzOGI5In0.t_P43_QiNFk2zhNdHRvJGD68jZWWcGrBtZd6G0obINw",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg4MTU1NDY1LCJqdGkiOiIyMmNhNTNkMjgyZDQ0NTc3YjdjMTA4ZDA4M2I2MjMxYyIsInVzZXJfaWQiOiJiODFjYWQ2ZC0wZDU2LTQ4NDEtODVlZS04MmM0NDZkYTM4YjkifQ.qWzd1WVmOpB5GCeCBLnjcnafZuudwPWWUPhSiCpUp9Q"
    },

    "message":"User registered"
}
```

### Validate Email Registeration

```
POST /api/v1/auth/validate-register
```

**Parameters**

Name              | Data Type | Required | Default Value  | Description
------------------|-----------|----------|----------------|--------------------
token             | text      | true     | null           | Token decoded from the url (verification link)

__NOTE__
- Error out if email is already verified or no valid user exist with Status 400 Bad Request

**Request**
```json
{
  "token": "MzY5NWU0NjYtZmI1MC00NDM0LTgzZTctZGNiYmM0NDVlNmRi::5gh-df14f7e78f58286bc8dd"
}
```

**Response**
Status: 200 OK
```json
{
    "user" : {  
         "id": "171956bd-717f-4021-a901-c5be80fd469b",
         "first_name": "John",
         "last_name": "Howley",
         "email": "hello@example.com",
         "phone_number": "",
         "is_active": true,
         "is_staff": false,
    }
}
```

### Send Verification Link to user

```
POST /api/v1/auth/send-verifyemail
```

**Parameters**

Name  | Description
------|-------------------------------------
email | (required) valid email of an existing user.

**Request**
```json
{
    "email": "hello@example.com"
}
```

**Response**
Status: 200 OK


### Refresh access token

```
POST /api/v1/auth/refresh-token
```

**Parameters**

Name              | Data Type | Required | Default Value  | Description
------------------|-----------|----------|----------------|--------------------
refresh           | text      | true     | null           | The refresh token of the current session.

**Request**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4ODM1Mzg2OCwianRpIjoiNDQ4MDE2OTk3ZDJmNGM1YThiNGI3ODRlNTNmNzc2ZDgiLCJ1c2VyX2lkIjoiYjgxY2FkNmQtMGQ1Ni00ODQxLTg1ZWUtODJjNDQ2ZGEzOGI5In0.WyRZ_5rByRH9pZojHc5tmB9s95DPDDWHzFMj2lpTVkw"
}
```

**Response**
Status: 200 OK

```json
{
 "token":{

  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg4ODc2MjgwLCJqdGkiOiI1MTYxM2QzOTliMGM0OTVlOGM1MDM5YmI0NzA5ZTZhMCIsInVzZXJfaWQiOiJmYmNmYTczZC0xNDdjLTQyOTUtYTM2Ny0xNmI0YmZlODQxODUifQ.-rsxySyJ04qBYQi7BQSgzp3Djh5OxQXZzGrMx29xy_U",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4OTA0ODE4MCwianRpIjoiOWM5NzE4ODM2OWEwNDFkZGEzMjdjMmIzMzI4ZmRjNjAiLCJ1c2VyX2lkIjoiZmJjZmE3M2QtMTQ3Yy00Mjk1LWEzNjctMTZiNGJmZTg0MTg1In0.PvzT-P0Swtgi1jUm2iNTKo84A9kF9n1DY2R21CFI_l4"

  }
}
```

### Change password

```
POST /api/v1/auth/change-password (requires authentication)
```

**Parameters**

Name             | Description
-----------------|-------------------------------------
current-password | Current password of the user.
new-password     | New password of the user.

**Request**
```json
{
    "current-password": "NotSoSafePassword",
    "new-password": "VerySafePassword0909"
}
```

**Response**
Status: 204 No-Content

### Request password for reset

Send an email to user if the email exist.

```
POST /api/v1/auth/forgot-password
```

**Parameters**

Name  | Description
------|-------------------------------------
email | (required) valid email of an existing user.

**Request**
```json
{
    "email": "hello@example.com"
}
```

**Response**
Status: 200 OK
```json
{
    "message": "Further instructions will be sent to the email if it exists"
}
```


### Confirm password reset

Confirm password reset for the user using the token sent in email.

```
POST /api/v1/auth/reset-password
```

**Parameters**

Name          | Description
--------------|-------------------------------------
new-password  | New password of the user
token         | Token decoded from the url (verification link)

**Request**
```json
{
    "new-password": "new_pass",
    "token" : "IgotTHISfromTHEverificationLINKinEmail"
}
```

**Response**
Status: 204 No-Content

