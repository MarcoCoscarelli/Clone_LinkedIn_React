
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


import Profile from "./components/Profile";
import MyNavbar from "./components/Navbar/MyNavbar";
import { useState } from 'react';
import MyFooter from "./components/MyFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './components/login/Login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store, { persistor } from './redux/store';
import ProfilePage from './components/profilePage/ProfilePage';
import PrivateRoute from './components/PrivateRoute';


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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
    <BrowserRouter>
      <header>
        <MyNavbar onScrollChange={handleScrollChange} onUserProfileChange={handleUserChange} />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <main >
              <Profile />
              <MyFooter />
            </main>
          }
        />
        <Route path="/home" element={
          <Home userProfile={onUserChange} ></Home>
        } />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
