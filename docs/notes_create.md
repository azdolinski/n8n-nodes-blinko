# Notes > Create
Ref: n8n-nodes-blinko/nodes/Blinko/operations/notes/createNote.ts


## Request
POST /api/trpc/notes.upsert?batch=1
{
    "0": {
        "json": {
            "content": "test\n",
            "type": 1,
            "isArchived": null,
            "isRecycle": null,
            "id": null,
            "attachments": [
                {
                    "name": "Blinko (2).png",
                    "path": "/api/file/Blinko_(2)_1740959482107.png",
                    "size": 5507,
                    "type": "image/png"
                }
            ],
            "isTop": null,
            "isShare": null,
            "references": [],
            "createdAt": null,
            "updatedAt": null
        },
        "meta": {
            "values": {
                "isArchived": [
                    "undefined"
                ],
                "isRecycle": [
                    "undefined"
                ],
                "id": [
                    "undefined"
                ],
                "isTop": [
                    "undefined"
                ],
                "isShare": [
                    "undefined"
                ],
                "createdAt": [
                    "undefined"
                ],
                "updatedAt": [
                    "undefined"
                ]
            }
        }
    }
}


## Response:
[
    {
        "result": {
            "data": {
                "json": {
                    "id": 251,
                    "type": 1,
                    "content": "test\n",
                    "isArchived": false,
                    "isRecycle": false,
                    "isShare": false,
                    "isTop": false,
                    "isReviewed": false,
                    "sharePassword": "",
                    "shareEncryptedUrl": null,
                    "shareExpiryDate": null,
                    "shareMaxView": 0,
                    "shareViewCount": 0,
                    "metadata": null,
                    "accountId": 1,
                    "createdAt": "2025-03-02T23:52:51.998Z",
                    "updatedAt": "2025-03-02T23:52:51.998Z"
                },
                "meta": {
                    "values": {
                        "createdAt": [
                            "Date"
                        ],
                        "updatedAt": [
                            "Date"
                        ]
                    }
                }
            }
        }
    }
]

## Code Implementation Guidelines

- **Batch Format**: Must wrap parameters in `"0.json"` object (required by Blinko API batch protocol)
- **Note Types**:
  - `0` = BLINKO (short-form notes)
  - `1` = NOTE (long-form documents)
- **Tag Handling**:
  - Input comma-separated tags are converted to hashtags in content
  - Example: `"tags": "important,project"` → `#important #project`
- **Attachments**:
  - Require pre-uploaded file IDs from `/api/file/upload`
  - Array format: `"attachments": [{"id": "1740959482107"}]`
- **Dates**:
  - Use ISO 8601 format when provided
  - `createdAt`/`updatedAt` auto-generated if null
- **Defaults**:
  - `isShare`: false
  - `isTop`: false
  - `isArchived`: false
  - `isRecycle`: false