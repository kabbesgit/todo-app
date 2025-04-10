import PouchDB from 'pouchdb-browser';
import { COUCHDB_CONFIG } from '../config';

console.log('Testing database connections...');

// Test remote connection
const remoteDb = new PouchDB(`${COUCHDB_CONFIG.url}/kabWebCouchDB`, {
  auth: {
    username: COUCHDB_CONFIG.username,
    password: COUCHDB_CONFIG.password
  }
});

// Test local connection
const localDb = new PouchDB('todos-local');

// Using Promise.all to run both tests concurrently
Promise.all([
  remoteDb.info().then(info => {
    console.log('Remote database connection successful:', info);
  }).catch(error => {
    console.error('Remote database connection failed:', error);
  }),
  
  localDb.info().then(info => {
    console.log('Local database connection successful:', info);
  }).catch(error => {
    console.error('Local database connection failed:', error);
  })
]); 