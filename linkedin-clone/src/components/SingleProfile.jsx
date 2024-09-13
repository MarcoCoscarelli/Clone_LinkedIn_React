import { Button, Card, Col, Row, Spinner, Modal, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProfile } from "../redux/actions/homePostAction";
import ImageUploadProfile from "./UploadImageProfile";
import { Link } from "react-router-dom";
import Suggestions from './Suggestions'
import Analysis from './Analisys'
import Resources from './Resources'
import Professional from './Professional'
import SidebarProfile from "./SidebarProfile"
import AdvertisingSide from "./AdvertisingSide"
import PeopleToKnowSide from "./PeopleToKnowSide"
import JobsCard from "./JobsCard"
import AdvImg from "./AdvImg"


const SingleProfile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.singleProfile);
  const loading = useSelector((state) => state.user.loading);

  const [show, setShow] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  // Funzione per chiudere il modale
  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  useEffect(() => {
    dispatch(fetchSingleProfile(profileId));
  }, [dispatch, profileId]);

  if (loading || !profile) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
        <Row>
      <Col xs={12} md={7} lg={8} xl={9}>
          <Card>
            <Card.Header className="p-0">
              <div className="position-relative">
                <div className="hero"></div>
                <div className="position-absolute z-index-1 propic-container">
                  <img
                    src={profile.image}
                    alt="propic"
                    className="border border-3 rounded-circle border-white pointer w-100 h-100 objectfit-cover"
                  />
                </div>
             
                <ImageUploadProfile
                  show={showPostModal}
                  hide={handleClosePostModal}
                />
              </div>
            </Card.Header>
            <Card.Body className="px-4 pb-4 pt-0 mt-5">
              <Row className="justify-content-between">
                <Col className="col-12 col-lg-7">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="fw-semibold fs-4 lh-1 pointer bg-gray-hover py-1 rounded-1 me-2">
                      {profile.name} {profile.surname}
                    </span>
                    <Button className="py-0 mt-2 bg-transparent btn-add-language fs-7">
                      <i className="bi bi-shield-check me-1"></i>Verifica ora
                    </Button>
                  </div>
                  <p className="mb-2 mt-2 lh-1">{profile.title}</p>
                  <p className="text-secondary fs-7 m-0 mt-2">
                    {profile.area}
                    <span>
                      <i className="bi bi-dot"></i>
                    </span>
                    <a
                      href="#"
                      className="fw-semibold link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      Informazioni di contatto
                    </a>
                  </p>
                </Col>
                <Col className="col-4 p-0 d-none d-lg-block"></Col>
              </Row>
              <Row className="mt-2 g-2 justify-content-start">
                <Col className="px-1 d-flex flex-wrap">
                  <Button className="rounded-pill py-1 fw-semibold me-2 mb-2 justify-self-stretch flex-grow-1 flex-lg-grow-0">
                    Disponibile per
                  </Button>
                  <Button className="bg-transparent btn-add-language py-1 me-2 mb-2">
                    Aggiungi sezione del profilo
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-pill py-1 btn-modal-italiano bg-transparent mb-2"
                  >
                    <span className="text-secondary">Altro</span>
                  </Button>
                </Col>
              </Row>
              <div className="mt-3 card-text">
                <Row>
                  <Col className="col-12 col-lg-6 col-md-8 pointer">
                    <Card
                      className="py-2 ps-3 pe-2 border-0 fs-7"
                      style={{
                        backgroundColor: "#dde7f1",
                      }}
                    >
                      <span className="fw-semibold position-relative">
                        Disponibile a lavorare
                        <i
                          className="bi bi-pencil position-absolute top-0 end-0 text-secondary fs-6 pointer bg-darkgray-hover rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            height: "30px",
                            width: "30px",
                          }}
                        ></i>
                      </span>

                      <p className="m-0">Ruoli di Sviluppatore front-end</p>
                      <a
                        href="#"
                        className="fs-7 fw-semibold link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                      >
                        Mostra dettagli
                      </a>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          {/*Modale informazioni di contatto con dati profilo recuperati da database */}
          <Modal show={show} onHide={() => setShow(false)} className="mt-5">
            <Modal.Header closeButton>
              <Modal.Title className="fs-5 px-2">
                {profile.name} {profile.surname}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="ms-2 mb-0 fw-normal">Informazioni di contatto</h5>
                <i
                  className="bi bi-pencil text-secondary fs-5 pointer bg-gray-hover rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                ></i>
              </div>
              <Row className="px-2 mb-3">
                <Col xs={1}>
                  <i className="fa-brands fa-linkedin fs-4 pt-1"></i>
                </Col>
                <Col xs={11}>
                  <p className="mb-0 fw-semibold">Il tuo profilo</p>
                  <Link
                    to={`/profile/${profile._id}`}
                    className="fs-7 fw-semibold link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                  >
                    /profile/{profile._id}
                  </Link>
                </Col>
              </Row>
              <Row className="px-2 mb-3">
                <Col xs={1}>
                  <i className="fa-regular fa-envelope fs-5 pt-1"></i>
                </Col>
                <Col xs={11}>
                  <p className="mb-0 fw-semibold">Email</p>
                  <a
                    href="#"
                    className="fs-7 fw-semibold link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                  >
                    {profile.email}
                  </a>
                </Col>
              </Row>
              <Row className="px-2 mb-3">
                <Col xs={1}>
                  <i className="fa-solid fa-circle-info fs-5 pt-1"></i>
                </Col>
                <Col xs={11}>
                  <p className="mb-0 fw-semibold">Bio</p>
                  <p className="m-0 fs-7 fw-semibold link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
                    {profile.bio}
                  </p>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        <Suggestions />
            <Analysis />
            <Resources />
            <Professional />
    </Col>
      <Col xs={12} md={5} lg={4} xl={3}>
          
      <SidebarProfile/>
     
        <AdvertisingSide/>
        <PeopleToKnowSide/>
        <JobsCard/>
        <AdvImg/>

          </Col>
          </Row>
    </Container>
  );
};

export default SingleProfile;
