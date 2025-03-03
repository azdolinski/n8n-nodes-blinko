# Attachments > File Upload
Ref: n8n-nodes-blinko/nodes/Blinko/operations/attachments/uploadFile.ts

## Request
```http
POST /api/file/upload
Content-Type: multipart/form-data; boundary=WebKitFormBoundary

--WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="example.png"
Content-Type: image/png

<binary data>
--WebKitFormBoundary--
```

## Response
```json
{
    "id": "1740959482107",
    "name": "example.png",
    "path": "/api/file/example_1740959482107.png",
    "size": 5507,
    "type": "image/png"
}
```

## Code Implementation Guidelines
- Uses standard multipart/form-data format for file uploads
- Binary data is retrieved using the `getBinaryDataBuffer` helper
- Original filename is preserved when available
- No wrapping in batch format (unlike other operations)
- Response contains file metadata including id, name, path, size, and type
- Returns complete API response without additional processing
