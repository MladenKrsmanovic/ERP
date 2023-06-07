
import './App.css';

import { useParams } from 'react-router-dom';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Details from './pages/Details'
import Login from './pages/Login'
import HomeBuyer from './pages/HomeBuyer'
import AdminHome from './pages/AdminHome'
import Dashboard from './pages/Dashboard'
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Cart from './pages/Cart';



function App() {

 


  return (

    <Router>
    
      <div className="App">
          
          <Routes>
           <Route path="/" exact element={<Home/>}></Route>
           <Route path="/products/:id" element={<Details />} />
           <Route path="/login" element={<Login/>}/>
           <Route path="/login/buyers/:id/home" element={<HomeBuyer/>}/>
           <Route path="/login/buyers/:id/admin" element={<AdminHome/>}/>
           <Route path="/login/buyers/:id/admin/dashboard" element={<Dashboard/>}/>
           <Route path="/success" element={<Success/>}/>
           <Route path="/cancel" element={<Cancel/>}/>
           <Route path="/login/buyers/:id/cart" element={<Cart/>}/>
          </Routes>


        
      </div>

      </Router>
      
   
  );
}

export default App;
