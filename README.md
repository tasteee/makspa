# Makspa

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Setup

### Prerequisites

- [Bun](https://bun.sh) or Node.js
- PocketBase (included)

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
```

### PocketBase Setup

This project uses [PocketBase](https://pocketbase.io) as the backend database with the following collections:

- **artists** - Artist profiles with name, about, color, and avatar
- **models** - 3D models with files, thumbnails, and transform properties
- **items** - Scene items with model references and detailed properties
- **spaces** - User spaces with environment settings and item collections

#### Starting PocketBase

```bash
# Start PocketBase server (runs on http://127.0.0.1:8090)
bun run pocketbase
# or
bun run pb
```

#### First Time Setup

1. Start the PocketBase server: `bun run pb`
2. Visit http://127.0.0.1:8090/_/
3. Create an admin account when prompted
4. The database collections will be automatically created from the migrations in `pb_migrations/`

#### PocketBase Admin UI

Access the admin dashboard at: http://127.0.0.1:8090/_/

From here you can:
- View and edit collections
- Manage records
- Configure API rules
- View logs
- Import/export data

#### API Access

The PocketBase API is available at: http://127.0.0.1:8090/api/

Collections endpoints:
- `GET/POST /api/collections/artists/records`
- `GET/POST /api/collections/models/records`
- `GET/POST /api/collections/items/records`
- `GET/POST /api/collections/spaces/records`

## Developing

Once you've set up PocketBase and installed dependencies, start the development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

Make sure PocketBase is running in a separate terminal:

```bash
bun run pb
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Project Structure

```
makspa/
├── pb_migrations/          # PocketBase database migrations
├── scripts/                # Utility scripts
├── src/
│   ├── components/         # Svelte components
│   ├── database/          # Database API and utilities
│   ├── routes/            # SvelteKit routes
│   ├── stores/            # Svelte stores
│   └── types/             # TypeScript type definitions
└── static/                # Static assets
```
