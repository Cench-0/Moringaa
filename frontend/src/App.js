
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import PairingDashboard from './components/PairingDashboard';
import History from './components/History'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import UserProfile from './components/UserProfile'; 
import Pairing from './components/Pairing'; 


function App() {
    return (
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" exact component={PairingDashboard} />
              <Route path="/history" component={History} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/pairing" component={Pairing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;