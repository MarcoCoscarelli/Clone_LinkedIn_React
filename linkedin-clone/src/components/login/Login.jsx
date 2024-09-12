import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Linkedin } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginUserSuccess, loginUserFailure } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [bearerToken, setBearerToken] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser());

    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/api/profile/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Errore durante il login');
      }

      const data = await response.json();
      // Successo login: salva dati utente e token
      dispatch(loginUserSuccess(data, bearerToken));
      // Salva il token nel localStorage
      localStorage.setItem('bearerToken', bearerToken);
      // Reindirizza alla pagina del profilo
      navigate('/profile');
    } catch (error) {
      dispatch(loginUserFailure(error.message));
      console.error('Errore durante il login:', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <Linkedin color="#0a66c2" size={50} />
          </div>
          <h2 className="text-center mb-4">Accedi</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicBearerToken">
              <Form.Control
                type="text"
                placeholder="Bearer Token"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg" disabled={loading}>
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <a href="#" className="text-decoration-none">Hai dimenticato il Bearer Token?</a>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-2">
              Non hai un account? <a href="#" className="text-decoration-none">Iscriviti ora</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
