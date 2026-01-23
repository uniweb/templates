---
type: ApiReference
---

# List Users

Retrieves a paginated list of users from your organization.

```yaml:api
method: GET
path: /api/v1/users
parameters:
  - name: page
    in: query
    type: integer
    description: Page number (starts at 1)
  - name: limit
    in: query
    type: integer
    description: Number of results per page (max 100)
  - name: status
    in: query
    type: string
    description: Filter by user status (active, inactive, pending)
  - name: Authorization
    in: header
    type: string
    required: true
    description: Bearer token for authentication
response:
  status: 200
  body: |
    {
      "data": [
        {
          "id": "usr_123abc",
          "email": "john@example.com",
          "name": "John Doe",
          "status": "active",
          "created_at": "2024-01-15T10:30:00Z"
        }
      ],
      "meta": {
        "page": 1,
        "limit": 20,
        "total": 42
      }
    }
```
