import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Admin } from './pages/Admin'
import { Private } from "./routes/private";
import { Error } from "./pages/Error";

export const Router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/admin',
    element: <Private><Admin/></Private>
  },
  {
    path:'*',
    element:<Error/>
  },
])

