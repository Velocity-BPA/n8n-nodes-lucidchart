# n8n-nodes-lucidchart

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for the Lucidchart REST API, enabling diagram and document management automation. This node allows users to programmatically create, manage, and collaborate on Lucidchart documents, export diagrams, manage folders, control sharing, and integrate diagramming capabilities into automated workflows.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green)

## Features

- **Document Management**: Create, copy, import, get, export, and trash Lucidchart documents
- **Export Formats**: Export diagrams as PDF, PNG, or SVG
- **Folder Organization**: Create and manage folders, list contents, search
- **User Management**: Create users, search by email, manage profiles
- **Team Management**: Create teams, manage members, assign roles
- **Collaboration**: Manage document and folder collaborators with granular permissions
- **Sharing**: Create and manage share links with optional passwords and expiration
- **Embedding**: Generate embed codes and session tokens for external integration
- **Audit Logs**: Query audit logs with comprehensive filtering
- **Account Info**: Retrieve account information and settings

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-lucidchart` and click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-lucidchart

# Restart n8n
```

### Development Installation

```bash
# 1. Extract the zip file
unzip n8n-nodes-lucidchart.zip
cd n8n-nodes-lucidchart

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Create symlink to n8n custom nodes directory
# For Linux/macOS:
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-lucidchart

# For Windows (run as Administrator):
# mklink /D %USERPROFILE%\.n8n\custom\n8n-nodes-lucidchart %CD%

# 5. Restart n8n
n8n start
```

## Credentials Setup

### API Key Authentication

| Field | Description |
|-------|-------------|
| Authentication Type | Select "API Key" |
| API Key | Your Lucidchart API key from Admin Panel > API Keys |

### OAuth 2.0 Authentication

| Field | Description |
|-------|-------------|
| Authentication Type | Select "OAuth 2.0" |
| Client ID | OAuth client ID from Lucid Developer Portal |
| Client Secret | OAuth client secret |
| Access Token | OAuth access token |
| Refresh Token | OAuth refresh token (for token renewal) |

**Required OAuth Scopes**: `user.profile`, `offline_access`, `account.info`, `folder`, `lucidchart.document.app`

## Resources & Operations

### Document (8 operations)

| Operation | Description |
|-----------|-------------|
| Create | Create a new Lucidchart document |
| Copy | Duplicate an existing document |
| Import | Import a document from .lucid file |
| Get | Retrieve document metadata |
| Export | Export document as PDF/PNG/SVG |
| Get Contents | Get document contents as JSON |
| Trash | Move document to trash |
| Search | Search documents by query |

### Folder (8 operations)

| Operation | Description |
|-----------|-------------|
| Create | Create a new folder |
| Get | Get folder metadata |
| Update | Update folder name |
| Trash | Move folder to trash |
| Restore | Restore folder from trash |
| List Contents | List folder contents |
| List Root | List root folder contents |
| Search | Search folders by query |

### User (5 operations)

| Operation | Description |
|-----------|-------------|
| Get | Get user by ID |
| Get All | List all users |
| Create | Create a new user |
| Search By Email | Find user by email address |
| Get Profile | Get authenticated user's profile |

### Team (9 operations)

| Operation | Description |
|-----------|-------------|
| Create | Create a new team |
| Get | Get team by ID |
| Get All | List all teams |
| Update | Update team settings |
| Add Users | Add users to team |
| Remove Users | Remove users from team |
| List Users | List team members |
| Archive | Archive a team |
| Restore | Restore archived team |

### Document Collaboration (7 operations)

| Operation | Description |
|-----------|-------------|
| Get User Collaborators | List document user collaborators |
| Add User Collaborator | Add user as collaborator |
| Update User Collaborator | Update user permissions |
| Remove User Collaborator | Remove user collaborator |
| Get Team Collaborator | Get team collaborator info |
| Add Team Collaborator | Add team as collaborator |
| Remove Team Collaborator | Remove team collaborator |

### Folder Collaboration (10 operations)

| Operation | Description |
|-----------|-------------|
| Get User Collaborators | List folder user collaborators |
| Add User Collaborator | Add user to folder |
| Update User Collaborator | Update user permissions |
| Remove User Collaborator | Remove user from folder |
| Get Group Collaborators | Get group collaborators |
| Add Group Collaborator | Add group to folder |
| Remove Group Collaborator | Remove group from folder |
| Get Team Collaborator | Get team collaborator info |
| Add Team Collaborator | Add team to folder |
| Remove Team Collaborator | Remove team from folder |

### Sharing (9 operations)

| Operation | Description |
|-----------|-------------|
| Get Document Share Link | Get existing share link |
| Create Document Share Link | Create new share link |
| Update Document Share Link | Update share link settings |
| Delete Document Share Link | Revoke share link |
| Get Folder Share Link | Get folder share link |
| Create Folder Share Link | Create folder share link |
| Update Folder Share Link | Update folder share link |
| Delete Folder Share Link | Revoke folder share link |
| Accept Share Link | Accept a share invitation |

### Embedding (7 operations)

| Operation | Description |
|-----------|-------------|
| Get Embed | Get embed information |
| Create Embed | Create new embed |
| Delete Embed | Delete embed |
| Get Embed Document | Get embedded document info |
| Change Embed Version | Update embed to different version |
| Generate Session Token | Generate embed session token |
| Get Embed Viewer | Get embed viewer URL |

### Audit Log (2 operations)

| Operation | Description |
|-----------|-------------|
| Get | Get audit logs |
| Query | Query with filters (event type, actor, target, date range) |

### Account (1 operation)

| Operation | Description |
|-----------|-------------|
| Get Info | Get account information |

## Usage Examples

### Create a New Document

```javascript
// Using the Lucidchart node with:
// Resource: Document
// Operation: Create
// Title: "My Workflow Diagram"
// Product: lucidchart
// Folder ID: (optional) target folder
```

### Export Document as PDF

```javascript
// Resource: Document
// Operation: Export
// Document ID: "abc123xyz"
// Format: pdf
// Page Index: 0 (first page)
// Scale: 1.0
```

### Add Collaborator to Document

```javascript
// Resource: Document Collaboration
// Operation: Add User Collaborator
// Document ID: "abc123xyz"
// User ID: "user456"
// Role: edit
// Notify: true
```

### Search Documents

```javascript
// Resource: Document
// Operation: Search
// Query: "flowchart"
// Return All: false
// Limit: 50
```

### Create Share Link

```javascript
// Resource: Sharing
// Operation: Create Document Share Link
// Document ID: "abc123xyz"
// Role: view
// Password: (optional)
// Expiration: (optional) 2024-12-31
```

## Error Handling

The node handles common API errors:

| Error Code | Description | Resolution |
|------------|-------------|------------|
| 400 | Invalid request | Check parameter values |
| 401 | Unauthorized | Verify credentials |
| 403 | Forbidden | Check permissions/scopes |
| 404 | Not found | Verify resource ID exists |
| 409 | Conflict | Resource already exists |
| 429 | Rate limited | Wait and retry |
| 500 | Server error | Retry later |

## Security Best Practices

1. **Store credentials securely** using n8n's credential management
2. **Use OAuth 2.0** for production environments when possible
3. **Limit API key scopes** to only required permissions
4. **Rotate credentials** periodically
5. **Monitor audit logs** for suspicious activity
6. **Use share link passwords** for sensitive documents
7. **Set expiration dates** on share links

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Watch mode for development
npm run dev
```

## Testing the Node

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

### Verify Installation in n8n

1. Open n8n in your browser (default: http://localhost:5678)
2. Create a new workflow
3. Click the "+" button to add a node
4. Search for "Lucidchart"
5. The node should appear in the list
6. Add the node and configure credentials
7. Test the node operations

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Passes all tests (`npm test`)
- Passes linting (`npm run lint`)
- Follows the existing code style
- Includes appropriate documentation

## Support

- **Documentation**: [Lucidchart API Docs](https://developer.lucid.co/api/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-lucidchart/issues)
- **Email**: licensing@velobpa.com

## Acknowledgments

- [Lucid Software](https://lucid.co/) for their comprehensive API
- [n8n](https://n8n.io/) for the workflow automation platform
- The n8n community for inspiration and support
