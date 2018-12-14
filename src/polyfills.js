import unfetch from 'unfetch';
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

if (!window.fetch) {
  window.fetch = unfetch;
}
