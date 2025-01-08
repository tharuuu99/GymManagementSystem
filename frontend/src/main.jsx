import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import{
  QueryClient,
  QueryClientProvider,
}from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
//import AuthProvider from './utilities/providers/AuthProvider';
import Router from './routes/Router';
import AuthProvider from './utilities/providers/AuthProvider';

const queryClient = new QueryClient()


Aos.init();
ReactDOM.createRoot(document.getElementById("root")).render(
   <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
   </AuthProvider>
);
