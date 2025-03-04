# tags > listTags
Ref: n8n-nodes-blinko/nodes/Blinko/operations/tags/listTags.ts

## Request
```http
GET /api/trpc/tags.list
```

## Response
```json
{
  "result": {
    "data": {
      "json": [
        {
          "id": 1,
          "name": "Welcome",
          "icon": "🎉",
          "parent": 0,
          "sortOrder": 0,
          "createdAt": "2025-01-16T20:52:23.801Z",
          "updatedAt": "2025-01-16T20:52:23.801Z"
        },
        {
          "id": 2,
          "name": "Attachment",
          "icon": "🔖",
          "parent": 1,
          "sortOrder": 0,
          "createdAt": "2025-01-16T20:52:23.801Z",
          "updatedAt": "2025-01-16T20:52:23.801Z"
        }
      ]
    }
  }
}
```


## Code Implementation Guidelines
- Uses GET method to retrieve tags from Blinko API
- Supports client-side filtering by name prefix (case-insensitive)
- Filter matches tags that include the search term anywhere in the name
- Handles nested response structure: response.result.data.json
- Returns an object with a `tags` property containing the array of tags
- Each tag contains: id, name, icon, parent, sortOrder, createdAt, updatedAt
- Requires valid session/authentication
- Returns an empty array when no tags exist or when no tags match the filter