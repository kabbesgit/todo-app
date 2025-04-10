// Import PouchDB with all required plugins
import PouchDB from 'pouchdb-browser';
import { COUCHDB_CONFIG } from '../config';

// Initialize PouchDB with the correct adapter
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
PouchDB.plugin(PouchDBAdapterIdb);

// Create a remote database connection
const remoteDb = new PouchDB(`${COUCHDB_CONFIG.url}/kabwebcouchdb`, {
  auth: {
    username: COUCHDB_CONFIG.username,
    password: COUCHDB_CONFIG.password
  }
});

// Create a local database for offline support
const localDb = new PouchDB('todos-local', { adapter: 'idb' });

// Set up replication
const sync = PouchDB.sync(localDb, remoteDb, {
  live: true,
  retry: true
});

sync.on('change', function (info) {
  console.log('Sync change:', info);
}).on('error', function (err) {
  console.error('Sync error:', err);
});

export interface Todo {
  _id?: string;
  _rev?: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const todoService = {
  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    try {
      const result = await localDb.allDocs({ include_docs: true });
      return result.rows.map(row => row.doc as Todo);
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  },

  // Add a new todo
  async addTodo(text: string): Promise<Todo> {
    const todo: Todo = {
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    try {
      const result = await localDb.post(todo);
      return { ...todo, _id: result.id, _rev: result.rev };
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  // Update a todo
  async updateTodo(todo: Todo): Promise<Todo> {
    try {
      const result = await localDb.put(todo);
      return { ...todo, _rev: result.rev };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  async deleteTodo(todo: Todo): Promise<void> {
    if (!todo._id || !todo._rev) {
      throw new Error('Cannot delete todo: missing _id or _rev');
    }
    try {
      await localDb.remove({
        _id: todo._id,
        _rev: todo._rev
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}; 