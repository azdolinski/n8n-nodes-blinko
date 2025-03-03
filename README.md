# n8n-nodes-blinko

This is an n8n community node for interacting with the Blinko API. It provides functionality to create, update, delete, and retrieve notes, manage attachments, and handle tags in a Blinko server.

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

1. **Base URL**: The URL of your Blinko server (e.g., https://blinko.zdolny.top)
2. **API Key**: Your Blinko API key for authentication

## Node Operations

The Blinko node provides the following resources and operations:

### Notes Resource

- **Create**: Create a new note in Blinko
- **Update**: Update an existing note
- **Delete**: Delete one or more notes
- **Share**: Share a note with other users
- **Get Notes**: Retrieve multiple notes with filtering options
- **Get By ID**: Retrieve a specific note by its ID

### Attachments Resource

- **Upload**: Upload a file to the Blinko server
- **List**: List attachments associated with notes

### Tags Resource

- **List**: Get all tags with optional filtering
- **Delete**: Delete a tag with options to delete or preserve associated notes

### Note Types

When creating or updating notes, you can specify the note type:

- **BLINKO (0)**: Blinko note type
- **NOTE (1)**: Regular note type

## Batch Operations

Some operations in the Blinko API use a batch format:

1. URL includes the parameter `?batch=1`
2. Request body has the format: `{"0": {"json": {...}}}`
3. Response from the server has the format: `[{"result": {"data": ...}}]`

Operations that use this format include:
- Notes creation and updates
- Note sharing
- Note deletion
- Tag deletion

## Example Usage

### Create a Note

1. Add a Blinko node to your workflow
2. Select the "Notes" resource
3. Choose the "Create" operation
4. Enter the note content and any additional fields
5. Execute the workflow

### Upload an Attachment

1. Add a node that provides binary data (e.g., HTTP Request, Read Binary File)
2. Add a Blinko node to your workflow
3. Select the "Attachments" resource
4. Choose the "Upload" operation
5. Specify the binary property containing the file data
6. Execute the workflow

### List Tags

1. Add a Blinko node to your workflow
2. Select the "Tags" resource
3. Choose the "List" operation
4. Optionally add filters like name prefix
5. Execute the workflow

### Delete a Tag

1. Add a Blinko node to your workflow
2. Select the "Tags" resource
3. Choose the "Delete" operation
4. Enter the Tag ID
5. Choose whether to also delete associated notes
6. Execute the workflow

## API Documentation

For more information about the Blinko API, refer to the server code in `/opt/docker/n8n/custom-nodes/blinko/src/server/routers`.
