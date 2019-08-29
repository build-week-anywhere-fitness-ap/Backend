# Anywhere Fitness Backend

The backend for Lambda Build Week's `Anywhere Fitness`.

This backend will allow users to register for `Anywhere Fitness`, allow instructors to create classes, and allow clients to sign up for classes.

## Getting Started (Online)

The API can be found at the following url:

```
https://bw-anywhere-fitness.herokuapp.com/
```

## Getting Started (Local)

- run `yarn` in order to install all dependencies
- use the command `yarn server` to run a live server!

## Endpoints

Quick Links: [Users Overview](#users-overview) | [Classes Overview](#classes-overview) | [Passes Overview](#passes-overview) | [Sessions Overview](#sessions-overview)

### Users Overview

| Method | Endpoint         | Requires                                        | Description                                                                                                                           |
| ------ | ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/register/` | `firstName`, `lastName`, `username`, `password` | Used for adding a new user (both client and instructor) to the database.                                                              |
| POST   | `/api/login`     | `username`, `password`                          | Used to log a user in. Returns a token, along with the user's first name, user's last name, and user's status as a client/instructor. |
| GET    | `/api/users`     | Successful Login                                | Used to show all users in the database.                                                                                               |

---

### User Registration

Method used: **[POST]** `/api/register`

On Success: Returns the Id of the new user.

Parameters:

| Parameter Name | Type    | Is Required | Notes                                         |
| -------------- | ------- | ----------- | --------------------------------------------- |
| firstName      | string  | yes         | The user's first name.                        |
| lastName       | string  | yes         | The user's last name.                         |
| username       | string  | yes         | Must be unique.                               |
| password       | string  | yes         | Can be any length, but the longer the better. |
| client         | boolean | no          | Defaults to 0 (false) automatically.          |
| instructor     | boolean | no          | Defaults to 0 (false) automatically.          |

Example of what to use:

```
{
    firstName: "John",
    lastName: "Smith",
    username: "johnsmith",
    password: "testpassword",
    client: true
}
```

---

### User Login

Method used: **[POST]** `/api/login/`

On Success: Returns an object containing a token, as well as the following user information: Id, firstName, lastName, instructor status, client status.

Parameters:

| Parameter Name | Type   | Required |
| -------------- | ------ | -------- |
| username       | string | yes      |
| password       | string | yes      |

Example of what to use:

```
{
    username: "johnsmith",
    password: "testpassword"
}
```

---

### Get Users

Method used: **[GET]** `/api/users/`

On Success: Returns an array of users.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Specific User

Method used: **[GET]** `/api/users/:id`

On Success: Returns an array with just the user specified.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Update User

Method used: **[PUT]** `/api/users/:id`

On Success: Returns `1`, or returns `0` if user could not be updated.

Parameters:

| Parameter Name | Type       | Required | Notes                                                                                |
| -------------- | ---------- | -------- | ------------------------------------------------------------------------------------ |
| Authorization  | **Header** | yes      | Acquired from a successful login. Will only update the user that has been logged in. |
| firstName      | string     | no       | The user's first name.                                                               |
| lastName       | string     | no       | The user's last name.                                                                |
| username       | string     | no       | Must be unique.                                                                      |
| password       | string     | no       | Can be any length, but the longer the better.                                        |
| client         | boolean    | no       | Defaults to 0 (false) automatically.                                                 |
| instructor     | boolean    | no       | Defaults to 0 (false) automatically.                                                 |

---

### Delete User

Method used: **[DELETE]** `/api/users/:id`

On Success: Returns `1`, or returns `0` if user could not be deleted.

Parameters:

| Parameter Name | Type       | Required | Notes                                                                                |
| -------------- | ---------- | -------- | ------------------------------------------------------------------------------------ |
| Authorization  | **Header** | yes      | Acquired from a successful login. Will only delete the user that has been logged in. |

[Top](#endpoints)

---

### Classes Overview

| Method | Endpoint                                   | Requires                                                          | Description                                    |
| ------ | ------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------- |
| POST   | `/api/classes/`                            | Successful Login, `name`, `location`, `instructor_id`, `dateTime` | Used to add a new class to the database.       |
| GET    | `/api/classes/`                            | Successful Login                                                  | Used to show all classes in the database.      |
| GET    | `/api/classes/:id/`                        | Successful Login                                                  | Used to show a specific class in the database. |
| GET    | `/api/users/:id/classes/` Successful Login | Used to show all classes belonging to a specific user.            |
| PUT    | `/api/classes/:id/`                        | Successful Login                                                  | Used to edit a specific class.                 |
| DELETE | `/api/classes/:id/`                        | Successful Login                                                  | Used to delete a specific class.               |

---

### Add Class

Method used: **[POST]** `/api/classes/`

On Success: Returns the Id of the new class.

Parameters:

| Parameter Name | Type               | Required                          | Notes                                                                |
| -------------- | ------------------ | --------------------------------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | Acquired from a successful login. |
| Instructor     | Key in User Object | yes                               | User must have the `Instructor` parameter set to *true* in database. |
| name           | string             | yes                               | The name of the class.                                               |
| type           | string             | no                                | The class's type. Examples: High Intensity, Yoga                     |
| location       | string             | yes                               | The place where the class takes place.                               |
| instructor_id  | integer            | yes                               | The `id` of the user who instructs this class.                       |

Example of what to use:

```
{
    name: "Cardio Kickboxing",
    type: "cardio",
    location: "123 Main St",
    instructor_id: 1,
}
```

---

### Get Classes

Method used: **[GET]** `/api/classes/`

On Success: Returns an array of classes.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Specific Class

Method used: **[GET]** `/api/classes/:id`

On Success: Returns an array with just the class specified.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Classes By User Id

Method used: **[GET]** `/api/users/:id/classes/`

On Success: Returns an array with just the classes belonging to the specified user.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Update Class

Method used: **[PUT]** `/api/classes/:id`

On Success: Returns `1`, or returns `0` if class could not be updated.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                |
| -------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                    |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database. |
| name           | string             | no       | The name of the class.                                               |
| type           | string             | no       | The class's type. Examples: High Intensity, Yoga                     |
| location       | string             | no       | The place where the class takes place.                               |
| instructor_id  | integer            | no       | The `id` of the user who instructs this class.                       |

---

### Delete Class

Method used: **[DELETE]** `/api/classes/:id`

On Success: Returns `1`, or returns `0` if class could not be deleted.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                |
| -------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                    |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database. |

[Top](#endpoints)

---

### Passes Overview

| Method | Endpoint                                  | Requires                                              | Description                                   |
| ------ | ----------------------------------------- | ----------------------------------------------------- | --------------------------------------------- |
| POST   | `/api/passes/`                            | Successful Login, `client_id`, `class_id`             | Used to add a new class to the database.      |
| GET    | `/api/passes/`                            | Successful Login                                      | Used to show all passes in the database.      |
| GET    | `/api/passes/:id/`                        | Successful Login                                      | Used to show a specific pass in the database. |
| GET    | `/api/users/:id/passes/` Successful Login | Used to show all passes belonging to a specific user. |
| PUT    | `/api/passes/:id/`                        | Successful Login                                      | Used to edit a specific pass.                 |
| DELETE | `/api/passes/:id/`                        | Successful Login                                      | Used to delete a specific pass.               |

---

### Add Pass

Method used: **[POST]** `/api/passes/`

On Success: Returns the Id of the new class.

Parameters:

| Parameter Name | Type               | Required | Notes                                                            |
| -------------- | ------------------ | -------- | ---------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                |
| Client         | Key in User Object | yes      | User must have the `Client` parameter set to *true* in database. |
| client_id      | integer            | yes      | The `id` of the user who bought the pass.                        |
| class_id       | integer            | yes      | The `id` of the class the pass belongs to.                       |
| timesUsed      | integer            | no       | The number of times the pass has been used. Defaults to 0.       |
| completed      | boolean            | no       | Should be set to *true* when `timesUsed` reaches 10.             |

Example of what to use:

```
{
    client_id: 1,
    class_id: 1,
    timesUsed: 0,
    completed: false
}
```

---

### Get Passes

Method used: **[GET]** `/api/passes/`

On Success: Returns an array of passes.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Specific Pass

Method used: **[GET]** `/api/passes/:id`

On Success: Returns an array with just the pass specified.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Passes By User Id

Method used: **[GET]** `/api/users/:id/passes/`

On Success: Returns an array with just the passes belonging to the specified user.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Update Pass

Method used: **[PUT]** `/api/passes/:id`

On Success: Returns `1`, or returns `0` if class could not be updated.

Parameters:

| Parameter Name | Type               | Required | Notes                                                            |
| -------------- | ------------------ | -------- | ---------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                |
| Client         | Key in User Object | yes      | User must have the `Client` parameter set to *true* in database. |
| client_id      | integer            | no       | The `id` of the user who bought the pass.                        |
| class_id       | integer            | no       | The `id` of the class the pass belongs to.                       |
| timesUsed      | integer            | no       | The number of times the pass has been used. Defaults to 0.       |
| completed      | boolean            | no       | Should be set to *true* when `timesUsed` reaches 10.             |

---

### Delete Pass

Method used: **[DELETE]** `/api/passes/:id`

On Success: Returns `1`, or returns `0` if pass could not be deleted.

Parameters:

| Parameter Name | Type               | Required | Notes                                                            |
| -------------- | ------------------ | -------- | ---------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                |
| Client         | Key in User Object | yes      | User must have the `Client` parameter set to *true* in database. |
|                |

[Top](#endpoints)

---

### Sessions Overview

| Method | Endpoint                                      | Requires                                                            | Description                                      |
| ------ | --------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| POST   | `/api/sessions/`                              | Successful Login with **Instructor status**, `class_id`, `dateTime` | Used to add a new session to the database.       |
| GET    | `/api/sessions/`                              | Successful Login                                                    | Used to show all sessions in the database.       |
| GET    | `/api/sessions/:id/`                          | Successful Login                                                    | Used to show a specific session in the database. |
| GET    | `/api/classes/:id/sessions/` Successful Login | Used to show all sessions belonging to a specific class.            |
| PUT    | `/api/sessions/:id/`                          | Successful Login with **Instructor status**                         | Used to edit a specific session.                 |
| DELETE | `/api/sessions/:id/`                          | Successful Login with **Instructor status**                         | Used to delete a specific session.               |

---

### Add Session

Method used: **[POST]** `/api/sessions/`

On Success: Returns the Id of the new session.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                |
| -------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                    |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database. |
| class_id       | integer            | yes      | The `id` of the class group that this session is associated with.    |
| dateTime       | datetime           | yes      | The time and date the session takes place.                           |

Example of what to use:

```
{
    class_id: 1,
    dateTime: "2019-08-30 18:00:00"
}
```

---

### Get Sessions

Method used: **[GET]** `/api/sessions/`

On Success: Returns an array of sessions.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Specific Session

Method used: **[GET]** `/api/sessions/:id`

On Success: Returns an array with just the session specified.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Get Sessions By Class Id

Method used: **[GET]** `/api/classes/:id/sessions/`

On Success: Returns an array with just the sessions belonging to the specified class.

Parameters:

| Parameter Name | Type       | Required | Notes                             |
| -------------- | ---------- | -------- | --------------------------------- |
| Authorization  | **Header** | yes      | Acquired from a successful login. |

---

### Update Session

Method used: **[PUT]** `/api/session/:id`

On Success: Returns `1`, or returns `0` if session could not be updated.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                |
| -------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                    |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database. |
| class_id       | integer            | no       | The `id` of the class group that this session is associated with.    |
| dateTime       | datetime           | no       | The time and date the session takes place.                           |

---

### Delete Session

Method used: **[DELETE]** `/api/session/:id`

On Success: Returns `1`, or returns `0` if session could not be deleted.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                |
| -------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login.                                    |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database. |

[Top](#endpoints)