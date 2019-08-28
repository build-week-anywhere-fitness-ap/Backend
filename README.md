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

---

### Classes Overview

| Method | Endpoint            | Requires                                                          | Description                                    |
| ------ | ------------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| POST   | `/api/classes/`     | Successful Login, `name`, `location`, `instructor_id`, `dateTime` | Used to add a new class to the database.       |
| GET    | `/api/classes/`     | Successful Login                                                  | Used to show all classes in the database.      |
| GET    | `/api/classes/:id/` | Successful Login                                                  | Used to show a specific class in the database. |
| PUT    | `/api/classes/:id/` | Successful Login                                                  | Used to edit a specific class.                 |
| DELETE | `/api/classes/:id/` | Successful Login                                                  | Used to delete a specific class.               |

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
| dateTime       | datetime           | yes                               | The date and time the class takes place.                             |

Example of what to use:

```
{
    name: "Cardio Kickboxing",
    type: "cardio",
    location: "123 Main St",
    instructor_id: 1,
    dateTime: "2019-08-30 18:00:00"
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

| Parameter Name | Type               | Required | Notes                                                                                                 |
| -------------- | ------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login. Will only update the class belonging to the user that is logged in. |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database.                                  |
| name           | string             | yes      | The name of the class.                                                                                |
| type           | string             | no       | The class's type. Examples: High Intensity, Yoga                                                      |
| location       | string             | no       | The place where the class takes place.                                                                |
| instructor_id  | integer            | no       | The `id` of the user who instructs this class.                                                        |
| dateTime       | datetime           | no       | The date and time the class takes place.                                                              |

---

### Delete Class

Method used: **[DELETE]** `/api/classes/:id`

On Success: Returns `1`, or returns `0` if class could not be deleted.

Parameters:

| Parameter Name | Type               | Required | Notes                                                                                                 |
| -------------- | ------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| Authorization  | **Header**         | yes      | Acquired from a successful login. Will only delete the class belonging to the user that is logged in. |
| Instructor     | Key in User Object | yes      | User must have the `Instructor` parameter set to *true* in database.                                  |

---

More coming soon!