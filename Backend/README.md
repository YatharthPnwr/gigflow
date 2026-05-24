# GigFlow API Documentation

This directory contains the Express.js backend for the GigFlow Smart Leads Dashboard.

## Base URL
All API endpoints are prefixed with `/api` (or relative to where you mount the express router, e.g. `http://localhost:5000/api`).

---

## Authentication Endpoints

### 1. Register a new user
Registers a new user (default role is usually `sales` unless overridden in DB).

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Registration successful",
      "data": {
        "user": {
          "_id": "60b...",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "sales"
        },
        "token": "eyJhb..."
      }
    }
    ```

### 2. Login
Authenticates a user and returns a JWT.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "user": {
          "_id": "60b...",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "sales"
        },
        "token": "eyJhb..."
      }
    }
    ```

---

## Leads Endpoints

> **Note:** All `/leads` endpoints require a valid JWT passed in the `Authorization` header (`Bearer <token>`).

### 1. Get All Leads (with Pagination & Filters)
Fetches a paginated list of leads. Supports advanced filtering, search, and sorting.

- **URL:** `/leads`
- **Method:** `GET`
- **Query Parameters (Optional):**
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10)
  - `search` (string): Search by name or email
  - `status` (string): Filter by status (`New`, `Contacted`, `Qualified`, `Lost`)
  - `source` (string): Filter by source (`Website`, `Instagram`, `Referral`)
  - `sort` (string): Sort order (`latest`, `oldest`)
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "...",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "status": "Qualified",
          "source": "Instagram",
          "createdBy": {
            "_id": "...",
            "name": "John Doe"
          },
          "createdAt": "2023-10-01T12:00:00.000Z"
        }
      ],
      "pagination": {
        "total": 45,
        "page": 1,
        "pages": 5,
        "limit": 10
      }
    }
    ```

### 2. Export Leads to CSV (Admin Only)
Exports the filtered leads list directly into a CSV string/file.

- **URL:** `/leads/export/csv`
- **Method:** `GET`
- **Requires:** `Admin` role
- **Query Parameters:** Same as `Get All Leads`
- **Success Response:**
  - **Code:** `200 OK`
  - **Headers:** `Content-Type: text/csv`
  - **Content:** `Name,Email,Status,Source,Created At...` (CSV data)

### 3. Create a Lead
Creates a new lead.

- **URL:** `/leads`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website"
  }
  ```
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Lead created",
      "data": { ... }
    }
    ```

### 4. Get a Single Lead
Fetches a single lead by its ID.

- **URL:** `/leads/:id`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Lead fetched",
      "data": { ... }
    }
    ```

### 5. Update a Lead
Updates fields of an existing lead.

- **URL:** `/leads/:id`
- **Method:** `PATCH`
- **Body:** (Any of the lead fields)
  ```json
  {
    "status": "Contacted"
  }
  ```
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Lead updated",
      "data": { ... }
    }
    ```

### 6. Delete a Lead (Admin Only)
Deletes an existing lead.

- **URL:** `/leads/:id`
- **Method:** `DELETE`
- **Requires:** `Admin` role
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "success": true,
      "message": "Lead deleted"
    }
    ```

---

## Error Handling
Standard error responses look like this:

```json
{
  "success": false,
  "message": "Error description here",
  "errors": [ ... ] // Optional detailed validation errors
}
```
Typical status codes:
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Invalid token or credentials
- `403 Forbidden` - Insufficient permissions (e.g. non-admin trying to delete)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server crash
