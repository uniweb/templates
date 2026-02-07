---
type: ApiReference
show_try_it: true
---

# Get User

Retrieves a single user by their unique identifier.

```yaml:api
method: GET
path: /api/v1/users/{id}
parameters:
  - name: id
    in: path
    type: string
    required: true
    description: The user's unique identifier
  - name: Authorization
    in: header
    type: string
    required: true
    description: Bearer token for authentication
responses:
  - status: 200
    description: User found
    body: |
      {
        "id": "usr_123abc",
        "email": "john@example.com",
        "name": "John Doe",
        "role": "admin",
        "status": "active",
        "created_at": "2024-01-15T10:30:00Z",
        "last_login": "2024-01-20T09:15:00Z"
      }
  - status: 404
    description: User not found
    body: |
      {
        "error": "not_found",
        "message": "User not found"
      }
```
