import './App.css';
import React from 'react'
import Form from './components/Form';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Update from './components/Update';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
  useLocation 
} from "react-router-dom";


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} >
        <Route index element={<Main />} />
        <Route path='/form' element={<Form />} />
        <Route path='/update' element={<Update />} />
      
      </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}



const Root = () => {
  const location = useLocation()

  return (
    <>
    <div className='root_route'>
      <Navbar />
     { location.pathname === '/' && (<div className='nav_icon'>
      <Link to='/form' > <FontAwesomeIcon icon={faUserPlus} /> Mark Attendence</Link>
      
     </div>
     )}
      { location.pathname === '/form' && (<div className='nav_icon'>
      <Link to='/'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
      
     </div>
     )}
      {location.pathname.startsWith('/update') && (<div className='nav_icon'>
      <Link to='/'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
      
     </div>
     )}
      <Outlet />
    </div>
    </>
  )
}


  

export default App;
