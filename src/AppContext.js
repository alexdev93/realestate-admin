import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const token = Cookies.get('token');

  const createArticle = async (formDataToSend) => {
    try {
        const response = await fetch(`${API_URL}/news`, {
            method: 'POST',
            body: formDataToSend,
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
    
          if (!response.ok) {
            alert('Failed to create news');
            return true;
          }
    
          const news = await response.json();
          console.log('Created news:', news);
          alert('Created news');
          return false;
    } catch (error) {
      console.error('Failed to create articles:', error);
      alert('Failed to create articles');
      return true;
    }
  };

const createHouse = async (formDataToSend) => {
  try {
    console.log('FormDataToSend:', formDataToSend);
    
    const response = await axios.post(`${API_URL}/houses`, formDataToSend, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 201) {
      alert('Failed to create selling house');
      throw new Error('Failed to create house');
    }

    const house = await response.data;
    console.log('Created House:', house);
    alert('Created House');
  } catch (error) {
    console.error('Failed to create house:', error);
    alert('Failed to create house');
  }
};


  return (
    <AppContext.Provider value={{ createArticle, createHouse }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
