# Todo App with CouchDB

A modern todo application built with React, TypeScript, and CouchDB. The application features a clean, responsive UI built with Chakra UI and persistent storage using CouchDB.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Persistent storage with CouchDB
- Modern, responsive UI with Chakra UI
- TypeScript for type safety
- Offline support with local-first architecture

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A CouchDB instance (local or remote)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your CouchDB credentials:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your CouchDB credentials

## Setting up a CouchDB Instance

### Option 1: Use a Cloud Provider

1. Sign up for a CouchDB service like [Cloudant](https://www.ibm.com/cloud/cloudant) or [Couchbase](https://www.couchbase.com/products/couchbase-server)
2. Create a new database named "todos"
3. Get your credentials and update the `.env` file

### Option 2: Set up a Local CouchDB Instance

1. Install CouchDB on your machine:
   - [CouchDB Installation Guide](https://docs.couchdb.org/en/stable/install/index.html)
2. Create a new database named "todos"
3. Update the `.env` file with your local CouchDB URL and credentials

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- Chakra UI
- PouchDB (CouchDB client)
- CouchDB

## License

MIT
