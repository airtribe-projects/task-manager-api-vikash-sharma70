# Task Manager API

## Overview

This project is a **RESTful Task Manager API** built using **Node.js and Express.js**.
It allows users to perform CRUD operations on tasks, along with advanced features like filtering, sorting, and priority-based retrieval.

The project uses **file-based storage (JSON file)** instead of a database and follows clean code practices like validation, error handling, and modular structure.

---

## Tech Stack

* Node.js
* Express.js
* File System (fs module)

---

## Project Structure

```
.
├── app.js
├── task.json
└── src
    ├── controllers
    │   └── taskController.js
    ├── routes
    │   └── taskRoutes.js
    └── utils
        ├── fileHandler.js
        ├── idGenerator.js
        └── validation.js
```

---

## Setup Instructions

### Clone the repository

```
git clone <your-repo-url>
cd task-manager-api
```

### Install dependencies

```
npm install
```

### Run the server

```
node app.js
```

Server will run on:

```
http://localhost:3000
```

---

## How to Test API

You can test the API using:

* Postman
* curl
* Thunder Client (VS Code extension)

Base URL:

```
http://localhost:3000/api
```

---

# API Endpoints

---

## 1. Get All Tasks

```
GET /api/tasks
```

### Optional Query Params

* Filter by completion:

```
/api/tasks?completed=true
```

* Sort by creation date:

```
/api/tasks?sort=asc
/api/tasks?sort=desc
```

---

## 2. Get Task by ID

```
GET /api/tasks/:id
```

---

## 3. Create Task

```
POST /api/tasks
```

### Request Body

```
{
  "title": "Learn Node",
  "description": "Practice APIs",
  "completed": false,
  "priority": "high"
}
```

### Notes

* `title` and `description` are required
* `completed` must be boolean
* `priority` can be: `low`, `medium`, `high`

---

## 4. Update Task

```
PUT /api/tasks/:id
```

### Request Body (any field optional)

```
{
  "title": "Updated title",
  "priority": "medium"
}
```

---

## 5. Delete Task

```
DELETE /api/tasks/:id
```

---

## 6. Get Tasks by Priority

```
GET /api/tasks/priority/:level
```

### Example:

```
/api/tasks/priority/high
```

---

# Error Handling

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid input         |
| 404         | Task not found        |
| 500         | Internal server error |

---

## Example Errors

### Invalid Input

```
{
  "message": "Title cannot be empty"
}
```

### Task Not Found

```
{
  "message": "Task not found"
}
```

---

# Features

* CRUD Operations
* Input Validation
* Error Handling
* Filtering (completed)
* Sorting (asc/desc)
* Priority support (low, medium, high)
* File-based storage
* Clean and modular code structure

---

# Future Improvements

* Add database (MongoDB)
* Add authentication (JWT)
* Add pagination
* Convert to MVC + service layer

---

# Author

Vikash Sharma

---

# Submission

* All features implemented as per assignment
* Validation & error handling added
* PR created to `feedback` branch

---
