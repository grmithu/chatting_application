import React from 'react'
import { createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/Home';

 
export default function App() {

  const router = createBrowserRouter([
    {path: '/', element: <Home />},
    {path: 'registration', element: <Registration />},
    {path: 'login', element: <Login />},
  ])

  return (
  <>
    
    <RouterProvider router={router}></RouterProvider>
  </>
  )
}
