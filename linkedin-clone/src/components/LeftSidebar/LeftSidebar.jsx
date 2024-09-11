/* eslint-disable react/prop-types */
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import { BsBookmarkFill } from "react-icons/bs";
import "./leftSidebar.css";

const LeftSidebar = ({ userProfile }) => {
    return (
        <>
            <Row style={{ marginLeft: "0px", marginTop: "100px" }}>
                <Card>
                    <Card.Header className="text-center" style={{ height: "3rem" }}>
                        <img
                            className="profile-image-posts"
                            src={userProfile?.image}
                            alt=""
                        />
                    </Card.Header>
                    <Card.Title className="text-center mt-5">
                        {userProfile?.name} {userProfile?.surname}
                    </Card.Title>
                    <Card.Text className="text-secondary text-center">
                        <p>{userProfile?.bio}</p>
                    </Card.Text>
                    <ListGroup variant="flush" className="d-flex py-3">
                        <div className="d-flex align-items-center ">
                            <p className="  text-secondary ">
                                Visitatori del profilo
                            </p>
                            <p className="num_post ">681</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className=" text-secondary ptl-1">
                                Collegamenti
                            </p>
                            <p className="num_post ">186</p>
                        </div>
                        <div className="d-flex align-items-center ">
                            <p className="text_muted fw-semibold ptl-1">
                                Espandi la tua rete
                            </p>
                        </div>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <div className="d-flex flex-column">
                            <p className="pl-3 pt-1 mt-2  text-secondary ">
                                Raggiungi i tuoi obiettivi di carriera con Premium
                            </p>
                            <p className="pl-5 pt-1 text-dark fw-semibold ptl-1"> <i className="bi bi-award-fill text-warning"></i>Prova per 0 EUR</p>
                        </div>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <div className="d-flex py-3">
                            <BsBookmarkFill className="saved" />{" "}
                            <p className="pl-2 fw-semibold">Elementi salvati</p>
                        </div>
                    </ListGroup>
                </Card>
                <Card
                    id="right-sidebar__right"
                    className="pt-2 px-0 mt-3"
                    style={{ borderRadius: "7px", width: "18rem", marginLeft: "5.5em" }}
                >
                    <Card.Body id="follow" >
                        <Row>
                            <Col className="d-flex flex-column ">
                                <a href=""> Gruppi </a>
                                <span className="d-flex justify-content-between">
                                    <a href="" className="my-2 mr-auto">
                                        Eventi
                                    </a>
                                    <i className="bi bi-plus-lg align-self-center"></i>
                                </span>
                                <a href="">Hashtag seguiti</a>
                            </Col>
                        </Row>
                    </Card.Body>
                    <hr className="my-0" />
                    <Card.Footer className="pt-2 pb-0 text-center">
                        <p>Scopri di più</p>
                    </Card.Footer>
                </Card>
            </Row>
        </>
    );
};

export default LeftSidebar;