import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from "./components/Profile";
import LoginPage from './components/login/Login';
import MyFooter from './components/MyFooter';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import PrivateRoute from './components/PrivateRoute'; // Importiamo il PrivateRoute



const App = () => {
  // Stato per gestire eventi scroll e cambio utente
  const [isScrollFromChild, setIsScrollFromChild] = useState(false);
  const [onUserChange, setOnUserChange] = useState({});

  // Funzioni per gestire scroll e cambiamento utente
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
          {/* Navbar presente in ogni pagina */}
          <header>
            {/* <MyNavbar onScrollChange={handleScrollChange} onUserProfileChange={handleUserChange} />
 */}          </header>

          <Routes>
            {/* Rotte pubbliche */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rotte protette con PrivateRoute */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            {/* <Route path="/home" element={<PrivateRoute><Home userProfile={onUserChange} /></PrivateRoute>} /> */}
            
            {/* Rotta di default che reindirizza al login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>

          {/* Footer visibile in tutte le pagine */}
          <footer>
            <MyFooter />
          </footer>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

