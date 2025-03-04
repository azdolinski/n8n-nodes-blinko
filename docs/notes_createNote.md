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
                    "name": "example.png",
                    "path": "/api/file/example_1740959482107.png",
                    "size": 5507,
                    "type": "image/png"
                }
            ],
            "isTop": null,
            "isShare": null,
            "references": [],
            "createdAt": null,
            "updatedAt": null
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
- **Attachments**:
  - Files must be uploaded first using `/api/file/upload` endpoint
  - Upload uses multipart/form-data format
  - Response contains `filePath`, `fileName`, `type`, and `size`
  - Array format for attachments: 
    ```json
    "attachments": [{
        "name": "example.png",
        "path": "/api/file/example_1740959482107.png",
        "size": 5507,
        "type": "image/png"
    }]
    ```
  - Multiple files can be attached to a single note
- **Dates**:
  - Use ISO 8601 format when provided
  - `createdAt`/`updatedAt` auto-generated if null
- **Defaults**:
  - `isShare`: false
  - `isTop`: false
  - `isArchived`: false
  - `isRecycle`: false