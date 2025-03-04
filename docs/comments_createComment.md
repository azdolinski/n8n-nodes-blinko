# POST > createComment
Ref: n8n-nodes-blinko/nodes/Blinko/operations/comments/createComment.ts

## Request
```http
POST /api/trpc/comments.create?batch=1
{
  "0": {
    "json": {
      "content": "string",
      "noteId": number,
      "parentId": number (optional),
      "guestName": string (optional)
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
        "json": true
      }
    }
  }
]
```

## Code Implementation Guidelines
- The endpoint supports both authenticated and guest comments
- If no guestName is provided for guest comments, it will be auto-generated as "void-" + MD5 hash of IP and UserAgent
- If content includes "@Blinko AI", it will trigger AI response
- Creates a notification for the note owner if:
  - Comment is from a different user than note owner
  - Comment is from a guest
- Response is boolean indicating success
