---
type: ApiReference
---

# Create User

Creates a new user in your organization.

```yaml:api
method: POST
path: /api/v1/users
parameters:
  - name: Authorization
    in: header
    type: string
    required: true
    description: Bearer token for authentication
  - name: Content-Type
    in: header
    type: string
    required: true
    description: Must be application/json
requestBody: |
  {
    "email": "jane@example.com",
    "name": "Jane Smith",
    "role": "member"
  }
responses:
  - status: 201
    description: User created successfully
    body: |
      {
        "id": "usr_456def",
        "email": "jane@example.com",
        "name": "Jane Smith",
        "role": "member",
        "status": "pending",
        "created_at": "2024-01-20T14:22:00Z"
      }
  - status: 400
    description: Invalid request body
    body: |
      {
        "error": "validation_error",
        "message": "Email is required"
      }
  - status: 409
    description: User already exists
    body: |
      {
        "error": "conflict",
        "message": "A user with this email already exists"
      }
```
