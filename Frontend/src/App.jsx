import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  // const [data, setDate] = useState(null);
  // useEffect(() => {
  //   fetch('http://localhost:3000/api')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  // })

  return (
    <div>
      <BrowserRouter>
        {/* navbar component + data to be added */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

//keep
// const token = localStorage.getItem('token');

// if (token) {
//   const res = await fetch('/api/auth/me', {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   const user = await res.json();
//   setUser(user);
// }

