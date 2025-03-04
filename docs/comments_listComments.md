# Method > ListComments
Ref: n8n-nodes-blinko/nodes/Blinko/operations/comments/listComments.ts

## Request
```http
GET /api/trpc/comments.list?batch=1
{
  "0": {
    "json": {
      "noteId": 262,
      "page": 1,
      "size": 30,
      "orderBy": "desc"
    }
  }
}
```

## Response:
```json
[
  {
    "result": {
      "data": {
        "total": 10,
        "items": [
          {
            "id": 1,
            "content": "Comment content",
            "createdAt": "2024-01-01T12:00:00.000Z",
            "account": {
              "id": 1,
              "name": "User Name",
              "nickname": "nickname",
              "image": "profile_image_url"
            }
          }
        ]
      }
    }
  }
]
```

## Code Implementation Guidelines
- `noteId` is required and must be a number
- `page` is optional, defaults to 1
- `size` is optional, defaults to 20
- `orderBy` is optional, can be "asc" or "desc", defaults to "desc"
- Response includes total count and paginated list of comments with author details
- Only root comments are returned (parentId: null)
