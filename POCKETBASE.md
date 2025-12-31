# PocketBase Database Schema

This document describes the database structure for the Makspa project.

## Collections

### Artists Collection

Stores artist profile information.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | auto | Unique identifier |
| name | text | yes | Artist name |
| about | text | no | Artist bio/description |
| color | text | no | Theme color for artist |
| avatar | file | no | Profile image (jpg/png/webp, max 5MB) |

**Endpoints:**
- List: `GET /api/collections/artists/records`
- Create: `POST /api/collections/artists/records`
- View: `GET /api/collections/artists/records/:id`
- Update: `PATCH /api/collections/artists/records/:id`
- Delete: `DELETE /api/collections/artists/records/:id`

---

### Models Collection

Stores 3D model files and metadata.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | auto | Unique identifier |
| name | text | yes | Model name |
| about | text | no | Model description |
| file | file | no | 3D model file (max 100MB) |
| thumbnail | file | no | Preview image (jpg/png/webp, max 5MB) |
| artists | relation[] | no | Related artists |
| scaleX | number | no | X-axis scale |
| scaleY | number | no | Y-axis scale |
| scaleZ | number | no | Z-axis scale |
| rotationX | number | no | X-axis rotation |
| rotationY | number | no | Y-axis rotation |
| rotationZ | number | no | Z-axis rotation |

**Relationships:**
- `artists` → Artists Collection (many-to-many)

---

### Items Collection

Stores item instances in scenes with full transformation and material properties.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | auto | Unique identifier |
| name | text | yes | Item name |
| about | text | no | Item description |
| thumbnail | file | no | Preview image |
| model | relation | no | Reference to model |
| modelUrl | text | no | Alternative model URL |
| scaleX, scaleY, scaleZ | number | no | Scale values |
| rotationX, rotationY, rotationZ | number | no | Rotation values (radians) |
| positionX, positionY, positionZ | number | no | Position in 3D space |
| opacity | number | no | Material opacity (0-1) |
| isGlowing | bool | no | Enable glow effect |
| isVisible | bool | no | Visibility toggle |
| isObstructive | bool | no | Collision detection |
| glowColor | text | no | Glow color (hex) |
| glowIntensity | number | no | Glow effect intensity |
| glowRadius | number | no | Glow effect radius |
| glowPositionX, glowPositionY, glowPositionZ | number | no | Glow effect position |
| metalness | number | no | Material metalness (0-1) |
| roughness | number | no | Material roughness (0-1) |
| hasBeenSetUp | bool | no | Setup completion flag |

**Relationships:**
- `model` → Models Collection (many-to-one)

---

### Spaces Collection

Stores user spaces with environment settings and item collections.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | auto | Unique identifier |
| name | text | yes | Space name |
| about | text | no | Space description |
| owner | text | no | Owner user ID |
| artists | relation[] | no | Featured artists |
| color | text | no | Theme color |
| isPublic | bool | no | Public visibility |
| items | json | no | Item instances in space |
| sizeX, sizeY, sizeZ | number | no | Space dimensions |
| visits | number | no | Visit counter (integer) |

**Environment Settings:**
| Field | Type | Description |
|-------|------|-------------|
| hdrIntensity | number | HDR lighting intensity |
| showHdrSky | bool | Show HDR skybox |
| hdr | text | HDR file path |
| hdrBlur | number | HDR blur amount |
| isHdrEnabled | bool | Enable HDR lighting |
| backgroundColor | text | Background color (hex) |
| backgroundMode | select | "hdr" or "color" |

**Grid Settings:**
| Field | Type | Description |
|-------|------|-------------|
| isGridVisible | bool | Show grid |
| gridOpacity | number | Grid opacity (0-1) |
| gridCellLineColor | text | Cell line color |
| gridCellSize | number | Cell size |
| gridCellLineThickness | number | Cell line thickness |
| gridSectionLineColor | text | Section line color |
| gridSectionSize | number | Section size |
| gridSectionLineThickness | number | Section line thickness |
| gridFadeAmount | number | Fade amount |
| gridFadeDistance | number | Fade distance |

**Floor Settings:**
| Field | Type | Description |
|-------|------|-------------|
| isFloorVisible | bool | Show floor |
| floorColor1 | text | Primary floor color |
| floorColor2 | text | Secondary floor color |
| floorOpacity1 | number | Primary opacity (0-1) |
| floorOpacity2 | number | Secondary opacity (0-1) |

**Other:**
| Field | Type | Description |
|-------|------|-------------|
| soundtrack | json | Audio track references |
| assets | json | Additional assets |

**Relationships:**
- `artists` → Artists Collection (many-to-many)

---

## Authentication & Authorization

By default, all collections are set with open API rules for development. Before deploying to production, configure proper authentication rules in the PocketBase admin UI.

### Recommended Rules:

**Artists:**
- List/View: Public (`""`)
- Create/Update/Delete: Admin only

**Models:**
- List/View: Public (`""`)
- Create/Update/Delete: Admin or owner

**Items:**
- List/View: Public (`""`)
- Create/Update/Delete: Owner only

**Spaces:**
- List: Public spaces only (`isPublic = true`)
- View: Public or owner
- Create: Authenticated users
- Update/Delete: Owner only

---

## Usage Examples

### Create an Artist

```javascript
import { pocket } from '$lib/database/pocket'

const artist = await pocket.collection('artists').create({
  name: "John Doe",
  about: "Digital artist and 3D modeler",
  color: "#FF5733"
})
```

### Fetch All Models

```javascript
const models = await pocket.collection('models').getFullList({
  sort: '-created',
  expand: 'artists'
})
```

### Create a Space

```javascript
const space = await pocket.collection('spaces').create({
  name: "My Gallery",
  about: "A virtual art gallery",
  isPublic: true,
  sizeX: 50,
  sizeY: 10,
  sizeZ: 50,
  backgroundColor: "#1a1a1a",
  backgroundMode: "color"
})
```

### Add Items to Space

```javascript
const item = await pocket.collection('items').create({
  name: "Sculpture 1",
  model: modelId,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  isVisible: true
})

// Update space with item
await pocket.collection('spaces').update(spaceId, {
  items: {
    [item.id]: item
  }
})
```

---

## Migration Files

The database schema is defined in migration files located in `pb_migrations/`:

- `1735679400_created_artists.js` - Artists collection
- `1735679401_created_models.js` - Models collection
- `1735679402_created_items.js` - Items collection
- `1735679403_created_spaces.js` - Spaces collection

These migrations are automatically applied when you first start PocketBase.
