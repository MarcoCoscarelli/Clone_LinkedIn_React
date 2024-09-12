import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProfileSection from './ProfileSection'
import Suggestions from './Suggestions'
import Analysis from './Analisys'
import Resources from './Resources'
import Activities from './Activities'
import Professional from './Professional'
import MainSidebar from './MainSidebar'
import { myProfile } from "../redux/actions/ProfileSection";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); // Recupera il token dal localStorage

  useEffect(() => {
    if (token) {
      dispatch(myProfile(token)); // Passa il token alla action per recuperare il profilo
    }
  }, [dispatch, token]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7} lg={8} xl={9}>
          <ProfileSection />
          <Suggestions />
          <Analysis />
          <Resources />
          <Activities />
          <Professional />
        </Col>
        <Col xs={12} md={5} lg={4} xl={3}>
          <MainSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;


