---
type: ApiReference
---

# Delete User

Permanently deletes a user from your organization. This action cannot be undone.

```yaml:api
method: DELETE
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
  - status: 204
    description: User deleted successfully
  - status: 404
    description: User not found
    body: |
      {
        "error": "not_found",
        "message": "User not found"
      }
  - status: 403
    description: Insufficient permissions
    body: |
      {
        "error": "forbidden",
        "message": "You do not have permission to delete this user"
      }
```
