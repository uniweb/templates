---
type: ApiReference
---

# List Users (v1)

Legacy endpoint for retrieving users.

```yaml:api
method: GET
path: /api/v1/users
parameters:
  - name: Authorization
    in: header
    type: string
    required: true
    description: Bearer token
response:
  status: 200
  body: |
    {
      "users": [
        {
          "id": "123",
          "email": "user@example.com"
        }
      ]
    }
```

For the current API with pagination and filtering, see the [v2 REST API](page:rest-api).
