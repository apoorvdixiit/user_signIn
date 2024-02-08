import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if the user is logged in
        const getTokenFromUrl = () => {
          const queryParams = new URLSearchParams(window.location.search);
          return queryParams.get('token');
      };

      // Check if the user is logged in
      const token = getTokenFromUrl();
      if (token) {

        if (token) {
          // Verify token validity
          axios.get(`http://localhost:3000/api/v1/users/verify-token?token=${token}`)
              .then(response => {
                  setIsLoggedIn(true);
                  console.log(response);
              })
              .catch(error => {
                  console.error('Error verifying token:', error);
                  // Remove invalid token
                  localStorage.removeItem('token');
              });
      }
          // Store token in local storage
          localStorage.setItem('token', token);
          setIsLoggedIn(true);
      }
    }, []);

    const handleLogin = () => {
        // Redirect the user to the backend endpoint for Google OAuth login
        
        window.location.href = 'http://localhost:3000/api/v1/users/auth-google';
    };

    return (
        <div>

            {isLoggedIn ? (
                <div>
                    <h1>Login Successful</h1>
                    <p>Welcome back!: </p>
                </div>
            ) : (
                <div>
                    <h1>Login</h1>
                    <button onClick={handleLogin}>Login with Google</button>
                </div>
            )}
        </div>
    );
}

export default App;