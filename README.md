# n8n-nodes-blinko

This is an n8n community node for interacting with the Blinko API. It provides functionality to create, update, delete, and retrieve notes from a Blinko server.

## Installation

Follow these steps to install this custom node in your n8n instance:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-blinko` in the **Name** field
4. Enter the path to this repository in the **NPM package** field
5. Optionally, select **Update** if you're updating an existing installation
6. Click **Install**

## Credentials

To use this node, you need to set up Blinko API credentials:

1. **Base URL**: The URL of your Blinko server (e.g., http://localhost:3000)
2. **API Key**: Your Blinko API key for authentication

## Node Operations

The Blinko node provides the following resources and operations:

### Note Resource

- **Create**: Create a new note in Blinko
- **Update**: Update an existing note
- **Delete**: Delete one or more notes
- **Get Many**: Retrieve multiple notes with filtering options

### Attachments Resource

The Attachments resource provides operations for managing files in the Blinko system:

- **Upload**: Upload a file to the Blinko server
- **Delete**: Delete a file from the Blinko server
- **Rename**: Rename an existing file
- **Move**: Move a file to a different location
- **List**: List files in a directory

### Note Types

When creating or updating notes, you can specify the note type:

- **BLINKO (0)**: Blinko note type
- **NOTE (1)**: Regular note type

### Attachments

You can attach files to notes when creating or updating them:

1. Add a node that outputs binary data before the Blinko node (e.g., HTTP Request, Read Binary File)
2. Connect it to the Blinko node
3. Specify the binary property name containing the file data
4. Execute the workflow

The file attachment process works as follows:
- The binary data is uploaded to the Blinko server using the `/api/file/upload` endpoint
- The uploaded file is then associated with the note during creation or update
- Each attachment will appear in the note with its original filename and be accessible for download

The binary data should have the following properties:
- `data`: The base64-encoded file content
- `fileName`: The original name of the file
- `mimeType`: The MIME type of the file
- `fileSize`: The size of the file in bytes

## Example Usage

### Create a Note

1. Add a Blinko node to your workflow
2. Select the "Note" resource
3. Choose the "Create" operation
4. Enter the note content and any additional fields
5. Execute the workflow

### Create a Note with Attachments

1. Add a node that provides binary data (e.g., HTTP Request, Read Binary File)
2. Add a Blinko node to your workflow
3. Select the "Note" resource
4. Choose the "Create" operation
5. Enter the note content
6. Under "Additional Fields", add an attachment and specify the binary property
7. Execute the workflow

### Get Notes with Filters

1. Add a Blinko node to your workflow
2. Select the "Note" resource
3. Choose the "Get Many" operation
4. Configure filters as needed (search text, archived status, etc.)
5. Execute the workflow

### Upload a File

1. Add a Blinko node
2. Select the 'Attachments' resource
3. Choose the 'Upload' operation
4. Specify the binary property containing the file data
5. Execute the workflow

### Delete a File

1. Add a Blinko node
2. Select the 'Attachments' resource
3. Choose the 'Delete' operation
4. Enter the file path (e.g., /api/file/filename.jpg)
5. Execute the workflow

### List Files

1. Add a Blinko node
2. Select the 'Attachments' resource
3. Choose the 'List' operation
4. Optionally specify a folder path, search text, and pagination options
5. Execute the workflow

## API Documentation

For more information about the Blinko API, refer to the [Blinko documentation](https://github.com/blinko-io/blinko).
