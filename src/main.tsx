import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing the CSS file for styling
import { Provider } from 'react-redux'; // Importing Provider from react-redux for state management
import store from './store/store'; // Importing the store for state management
import AppRoutes from './routes'; // Importing the routes for the application
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importing QueryClient and QueryClientProvider for caching and data fetching
import HeaderLayout from './layouts/HeaderLayout'; // Importing the HeaderLayout component for layout structure

// Creating a new instance of QueryClient for caching and data fetching
const queryClient = new QueryClient();

// Rendering the application to the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HeaderLayout>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </HeaderLayout>
  </React.StrictMode>
);
