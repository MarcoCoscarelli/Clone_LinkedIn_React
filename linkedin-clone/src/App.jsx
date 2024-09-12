import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import Home from "./components/Home/Home";
import Profile from "./components/Profile";
import MyNavbar from "./components/Navbar/MyNavbar";
import MyFooter from "./components/MyFooter";
import LoginPage from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';

const App = () => {
  const [isScrollFromChild, setIsScrollFromChild] = useState(false);
  const [onUserChange, setOnUserChange] = useState({});

  const handleScrollChange = (newScrollState) => {
    setIsScrollFromChild(newScrollState);
  };

  const handleUserChange = (newUser) => {
    setOnUserChange(newUser);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <header>
            <MyNavbar onScrollChange={handleScrollChange} onUserProfileChange={handleUserChange} />
          </header>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <main>
                    <Profile />
                    <MyFooter />
                  </main>
                </PrivateRoute>
              }
            />
            <Route 
              path="/home" 
              element={
                <PrivateRoute>
                  <Home userProfile={onUserChange} />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;