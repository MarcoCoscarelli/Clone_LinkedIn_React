import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProfileSection from './ProfileSection'
import Suggestions from './Suggestions'
import Analysis from './Analisys'
import Resources from './Resources'
import Activities from './Activities'
import Professional from './Professional'





import { myProfile } from '../redux/actions/ProfileSection'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Profile = () => {
  const dispatch = useDispatch()
  const API_KEY = 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlY2FkODRkMGRlZjAwMTVjZWYxMDMiLCJpYXQiOjE3MjU4OTY2ODMsImV4cCI6MTcyNzEwNjI4M30.UMss5w-kKWhh82MNP_XXrl81zWY5Eu9fIi17fe-n7eY'

  useEffect(() => {
    dispatch(myProfile(API_KEY))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
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
          
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default Profile
