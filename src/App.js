// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import NewsForm from './pages/NewsForm';
import HouseForm from './pages/HouseForm';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import { AppProvider } from './AppContext';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-house"
                element={
                  <ProtectedRoute>
                    <HouseForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
