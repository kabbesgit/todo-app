// CouchDB Configuration
export const COUCHDB_CONFIG = {
  url: import.meta.env.VITE_COUCHDB_URL || 'https://your-couchdb-instance.cloudant.com',
  username: import.meta.env.VITE_COUCHDB_USERNAME || 'your-username',
  password: import.meta.env.VITE_COUCHDB_PASSWORD || 'your-password',
  database: 'todos'
}; 