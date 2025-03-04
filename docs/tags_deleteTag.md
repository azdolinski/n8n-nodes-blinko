# tags > deleteTag
Ref: n8n-nodes-blinko/nodes/Blinko/operations/tags/deleteTag.ts

## Request

### Delete Tag Only (Preserve Notes)
```http
POST /api/trpc/tags.deleteOnlyTag?batch=1
Content-Type: application/json

{
  "0": {
    "json": {
      "id": 123
    }
  }
}
```

### Delete Tag with Notes
```http
POST /api/trpc/tags.deleteTagWithAllNote?batch=1
Content-Type: application/json

{
  "0": {
    "json": {
      "id": 123
    }
  }
}
```

## Response
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
- Two deletion modes available:
  - `deleteOnlyTag`: Removes the tag but preserves associated notes
  - `deleteTagWithAllNote`: Removes both the tag and sends all associated notes to trash
- We will have only one node: `deteteTag` with extra option "WithAllNote" (default: false)
- Tag ID must be numeric
- Operation requires authentication
- Server performs cascading deletion of tag relationships
- Must use batch format with ?batch=1 parameter in URL
- Response comes in batch format and needs to be processed accordingly
