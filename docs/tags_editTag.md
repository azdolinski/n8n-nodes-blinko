# tags > editTag
Ref: n8n-nodes-blinko/nodes/Blinko/operations/tags/editTag.ts

## Request

### Update Tag Name
```http
POST /api/trpc/tags.updateTagName?batch=1
{"0":{"json":{"id":16,"oldName":"penpot","newName":"penpot1"}}}
```

### Update Tag Icon
```http
POST /api/trpc/tags.updateTagIcon?batch=1
{"0":{"json":{"id":17,"icon":"😄"}}}
```

### Update Tag Order
```http
POST /api/trpc/tags.updateTagOrder?batch=1
{"0":{"json":{"id":123,"sortOrder":10}}}
```

## Response
```json
[
  {
    "result": {
      "data": true
    }
  }
]
```

## Code Implementation Guidelines
- Edit Tag operation allows modification of existing tags
- Requires the tag's ID for identification
- Additional Fields will cover:
  * set new name: string, should not be empty
  * set new icon: string, typically an emoji
  * set new sort order: number, for custom ordering of tags
- When updating a tag's name, the old name will be automatically retrieved from the API
- Parent name is supported by setting name as "parent/tagname"
- Change name cause that serwer recreate tag with new name and old name is deleted (change id of tag)
- Updates are processed in the following order:
  1. Sort order (first)
  2. Icon (second)
  3. Name (last, because it may change the tag ID)
