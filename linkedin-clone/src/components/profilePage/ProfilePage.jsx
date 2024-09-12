import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom'; 

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  return (
    <div>
      <h1>Profilo Utente</h1>
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
};

export default ProfilePage;
