import React, { useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
import NavBar from '../Component/Nav_Bar';
import Footer from '../Component/Footer';
import '../Styles/CustomerProfile.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    user_ID: '',
    Name: '',
    Email: '',
    PhoneNo: '',
  });

  useEffect(() => {
    console.log("sadddd");
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (token) {
        try {
          const response = await fetch('http://localhost:3000/getUser', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
    
          if (response.ok) {
            const data = await response.json();
            setUserInfo({
              user_ID: data.userId,
              Name: data.userName,
              Email: data.userEmail,
              PhoneNo: data.userPhone,
            
            });
          } else {
            console.error('Failed to fetch user information');
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const postData = async () => {
    try {
      const formData = { /* Your form data here */ };
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch('http://localhost:3000/getUser', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('POST request successful:', result);
          // Handle the response as needed
        } else {
          console.error('Failed to make POST request');
        }
      } else {
        console.error('Token not found. User may not be logged in.');
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="profile-container">
        <div className="profile-header-container">
          <div className="profile-info-container">
            <div className="profile-picture-container">
              <img
                src="https://via.placeholder.com/200"
                alt="Profile"
                className="profile-picture"
              />
            </div>
            <div className="profile-text-container">
              <p>{userInfo.Name}</p>
            </div>
          </div>
        </div>
        <div className="profile-details-container">
          <div className="details-column">
            {Object.entries(userInfo).map(([key, value]) => (
              <div className="detail-row" key={key}>
                <label className="detail-label">{key}:</label>
                <span className="detail-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;