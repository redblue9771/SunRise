import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
// App
import App from './App';
// Service worker
import * as serviceWorker from './common/serviceWorker';
// import * as  from 'react-dom/experimental';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

const domRoot: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.unstable_createRoot(domRoot).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);

serviceWorker.register();
