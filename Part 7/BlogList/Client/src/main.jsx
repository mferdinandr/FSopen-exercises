import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/index.css';
import { NotificationContextProvider } from './NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginContextProvider } from './LoginContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </LoginContextProvider>
);
