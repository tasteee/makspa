# PocketBase Setup Complete! 🎉

PocketBase has been successfully installed and configured for your Makspa project.

## What Was Set Up

### 1. PocketBase Executable ✅
- Downloaded PocketBase v0.22.0 for macOS ARM64
- Located at: `./pocketbase`
- Ready to run with: `bun run pb`

### 2. Database Collections ✅
Four collections have been created with migrations:

- **artists** - Artist profiles with avatars and info
- **models** - 3D models with files and transforms
- **items** - Scene items with full properties
- **spaces** - User spaces with environment settings

### 3. Migration Files ✅
Located in `pb_migrations/`:
- `1735679400_created_artists.js`
- `1735679401_created_models.js`
- `1735679402_created_items.js`
- `1735679403_created_spaces.js`

### 4. API Helpers ✅
Updated `src/database/api.ts` with:
- `items` collection reference
- `getItemById()` - Fetch single item with model
- `getItemsBySpaceId()` - Fetch all items in a space
- `createItem()` - Create new item
- `updateItem()` - Update item properties
- `deleteItem()` - Remove item

### 5. Configuration Files ✅
- `.env` - Environment variables
- `.env.example` - Template for new developers
- Updated `.gitignore` - Excludes pb_data, keeps migrations
- Updated `package.json` - Added `pocketbase` and `pb` scripts

### 6. Documentation ✅
- `README.md` - Complete setup and usage instructions
- `POCKETBASE.md` - Detailed schema and API documentation
- `scripts/verify-pocketbase.sh` - Setup verification script

## Quick Start

### Start PocketBase

```bash
bun run pb
```

This will start PocketBase on `http://127.0.0.1:8090`

### First Time Setup

1. Visit http://127.0.0.1:8090/_/
2. Create an admin account
3. Collections will be created automatically

### Access Points

- **Admin UI**: http://127.0.0.1:8090/_/
- **API Base**: http://127.0.0.1:8090/api/
- **Artists**: http://127.0.0.1:8090/api/collections/artists/records
- **Models**: http://127.0.0.1:8090/api/collections/models/records
- **Items**: http://127.0.0.1:8090/api/collections/items/records
- **Spaces**: http://127.0.0.1:8090/api/collections/spaces/records

## Development Workflow

### Run Both Servers

Open two terminals:

**Terminal 1 - PocketBase:**
```bash
bun run pb
```

**Terminal 2 - Dev Server:**
```bash
bun run dev
```

## Usage Examples

### Fetch Items in Your App

```typescript
import { api } from '$lib/database/api'

// Get all items in a space
const items = await api.getItemsBySpaceId(spaceId)

// Get single item with model data
const item = await api.getItemById(itemId)

// Create new item
const newItem = await api.createItem({
  name: "My Item",
  model: modelId,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
})

// Update item
await api.updateItem({
  id: itemId,
  positionX: 10,
  isVisible: true
})

// Delete item
await api.deleteItem(itemId)
```

### Direct PocketBase Access

```typescript
import { pocket } from '$lib/database/pocket'

// List with filters
const spaces = await pocket.collection('spaces').getFullList({
  filter: 'isPublic = true',
  sort: '-created',
  expand: 'artists'
})

// Subscribe to changes
pocket.collection('items').subscribe('*', (e) => {
  console.log(e.action, e.record)
})
```

## File Storage

PocketBase handles file uploads automatically:

```typescript
// Upload model file
const formData = new FormData()
formData.append('name', 'My Model')
formData.append('file', modelFile)

const model = await pocket.collection('models').create(formData)

// Get file URL
const fileUrl = pocket.files.getUrl(model, model.file)
```

## Authentication

```typescript
import { api } from '$lib/database/api'

// Login
await api.login('username', 'password')

// Logout
api.logout()

// Check auth state
if (api.pocket.authStore.isValid) {
  const user = api.pocket.authStore.model
}
```

## Troubleshooting

### Port Already in Use

If port 8090 is in use, you can specify a different port:

```bash
./pocketbase serve --http="127.0.0.1:8091"
```

Update `.env`:
```
PUBLIC_POCKET_PATH=http://127.0.0.1:8091
```

### Reset Database

To start fresh:

```bash
rm -rf pb_data
bun run pb
```

This will create a new database and apply migrations.

## Next Steps

1. **Start PocketBase**: `bun run pb`
2. **Create Admin Account**: Visit http://127.0.0.1:8090/_/
3. **Configure API Rules**: Set authentication rules in Admin UI
4. **Add Sample Data**: Create some test artists, models, and spaces
5. **Start Developing**: `bun run dev`

## Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase API Reference](https://pocketbase.io/docs/api-records/)
- [SvelteKit + PocketBase Guide](https://github.com/pocketbase/js-sdk)

---

**Status**: ✅ Ready to use!

For detailed schema information, see [POCKETBASE.md](./POCKETBASE.md)
