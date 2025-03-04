# n8n-nodes-blinko

[![Blinko Logo](docs/img/blinko.png)](https://github.com/blinko-space/blinko)

This is an n8n community node for interacting with the Blinko API. It provides functionality to create, update, delete, and retrieve notes, manage attachments, handle tags, and interact with comments in a Blinko server.

## Installation

Follow these steps to install this custom node in your n8n instance:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-blinko` in the **Name** field
4. Enter the path to this repository in the **NPM package** field
5. Optionally, select **Update** if you're updating an existing installation
6. Click **Install**


## Node Operations

The Blinko node provides the following resources and operations:

### Notes Resource

- **Create**: Create a new note in Blinko with support for:
  - Text content with optional tags (as hashtags)
  - Multiple file attachments
  - Note type selection (BLINKO/NOTE)
  - Sharing and pinning options
- **Update**: Update an existing note
- **Delete**: Delete one or more notes
- **Share**: Share a note with other users
- **Get Notes**: Retrieve multiple notes with filtering options
- **Get By ID**: Retrieve a specific note by its ID

### Comments Resource

- **Create Comment**: Create a new comment on a note with support for:
  - Text content
  - Optional parent comment ID for replies
  - Optional guest name for unauthenticated comments
- **List Comments**: Retrieve comments for a specific note with options for:
  - Pagination control
  - Sorting order
  - Filtering

### Attachments Resource

- **Upload**: Upload files to the Blinko server (automatically handled during note creation)
- **List**: List attachments associated with notes

### Tags Resource

- **List**: Get all tags with optional filtering
- **Delete**: Delete a tag with options to delete or preserve associated notes
