// Polyfill for global object
if (typeof window !== 'undefined') {
  (window as any).global = window;
}

// Polyfill for events module
import { EventEmitter } from 'events';
if (typeof window !== 'undefined') {
  (window as any).EventEmitter = EventEmitter;
} 