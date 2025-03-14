import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { loadStripe } from '@stripe/stripe-js';
import getEnv from './configs/config.js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(getEnv('STRIPE_PUBLISH_KEY'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </StrictMode>
);
