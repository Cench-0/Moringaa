import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';  // Import Homepage
import PairingDashboard from './components/PairingDashboard';
import Pairing from './components/Pairing';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);  // Manage user state here
  const [pairedStudents, setPairedStudents] = useState([]);  // Store paired students
  const [history, setHistory] = useState([]);  // Store pairing history
  const [studentsList, setStudentsList] = useState([]); // Store manually added students

  // Function to add a new pair to the paired students
  const addPairedStudents = (pair) => {
    setPairedStudents((prevPairs) => [...prevPairs, pair]);
  };

  // Function to add a pair to history
  const addToHistory = (pair) => {
    setHistory((prevHistory) => [...prevHistory, pair]);
  };

  // Function to add manually entered students to the list
  const addStudentToList = (name) => {
    setStudentsList((prevList) => [...prevList, name]);
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage setUser={setUser} />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/pairing"
              element={
                <Pairing
                  addPairedStudents={addPairedStudents}
                  addStudentToList={addStudentToList}
                  studentsList={studentsList}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PairingDashboard
                  pairedStudents={pairedStudents}
                  addToHistory={addToHistory}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
