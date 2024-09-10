/* eslint-disable react/prop-types */
import {
    Container,
    Navbar,
    Form,
    FormControl,
    Row,
    Dropdown,
    Button,
    Nav
} from "react-bootstrap";
import { Search, HouseDoorFill, PeopleFill, BriefcaseFill, ChatDotsFill, BellFill } from "react-bootstrap-icons";
import TendinaTu from "./TendinaTu";
// import {Link} from "react-router-dom"
import { useState, useEffect, Suspense } from "react";
import "./MyNavbar.css";

function MyNavbar({ onScrollChange, onUserProfileChange }) {

    const [userProfile, setUserProfile] = useState({});

    const [isScroll, setIsscroll] = useState(false);

    const onScroll = () => {
        if (window.scrollY >= 150) {
            setIsscroll(true);
        } else {
            setIsscroll(false);
        }
    };

    useEffect(() => {
        onScrollChange(isScroll)
    }, [isScroll, onScrollChange]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    })

    useEffect(() => {
        userInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const userInfo = async () => {
        const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRmNDI3NWFmNDM0YjAwMTU5ZDgzMmIiLCJpYXQiOjE3MjU5MDc5NDAsImV4cCI6MTcyNzExNzU0MH0.9BnplLmgaQIFjhcARlwTs5Yimp8cJnqRsIQPvF23W1g'

        try {
            const url = "https://striveschool-api.herokuapp.com/api/profile/me";
            const response = await fetch(url, {
                headers: {
                    Authorization: API_KEY
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUserProfile(userData);
                onUserProfileChange(userData);
                console.log(userData)
                return userProfile
            }
        } catch (error) {
            console.log("errore", error)
        }
    }

    return (
        <>
            <Suspense fallback={<p>Caricamento...</p>}>
                {isScroll ? (
                    <Row className="fixed-top w-100 fs-xs">
                        <Navbar bg="light" variant="light" expand="lg" fixed="top" className={`w-100 ${isScroll ? 'shadow-sm' : ''}`}>
                            <Container className="d-flex justify-content-between align-items-center">
                                <Navbar.Brand href="/">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                        alt="linkedin logo"
                                        style={{ width: 33 }}
                                    />
                                </Navbar.Brand>

                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto d-none d-md-inline">
                                        <Form className="d-flex align-items-center">
                                            <Search className="me-2 navbar-icon" size={20} />
                                            <FormControl
                                                type="text"
                                                placeholder="Cerca"
                                                className="me-2 search-background"
                                            />
                                        </Form>
                                    </Nav>

                                    <Nav className="ms-auto d-flex align-items-center">
                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <HouseDoorFill size={20} />
                                            <div>Home</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <PeopleFill size={20} />
                                            <div>Rete</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <BriefcaseFill size={20} />
                                            <div>Lavoro</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <ChatDotsFill size={20} />
                                            <div>Messaggistica</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <BellFill size={20} />
                                            <div>Notifiche</div>
                                        </div>
                                        <Dropdown className="mx-3">
                                            <Dropdown.Toggle
                                                variant="link"
                                                className="d-flex flex-column align-items-center dropdown-toggle text-decoration-none text-dark"
                                            >
                                                <img
                                                    className="navbar-profile-pic"
                                                    src={userProfile.image}
                                                    alt="profilo"
                                                    style={{ width: 30, borderRadius: '50%' }}
                                                />
                                                <span className="mt-1">Tu</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <TendinaTu dati={userProfile} />
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown className="mx-3">
                                            <Dropdown.Toggle
                                                variant="link"
                                                className="d-flex flex-column align-items-center dropdown-toggle text-decoration-none text-dark"
                                            >
                                                <i className="bi bi-grid" style={{ fontSize: '20px' }} />
                                                <span className="mt-1">Per le aziende</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {/* Other menu items */}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <div className="text-center d-none d-lg-block">
                                            <a href="#" className="text-premium-color text-decoration-underline">
                                                Passa a Premium per 0<br /> EUR
                                            </a>
                                        </div>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <Navbar
                            className="sticky-top border border-start-0 border-end-0 second-nav w-100 mt-5 mt-xl-2"
                            id="navbar-body"
                            bg="white"
                            expand="lg"
                        >
                            <Container className="nav_scroll">
                                <div className="d-flex gap-3">

                                    <img
                                        className="navbar-icon-container d-none d-md-block"
                                        id="navbar-logo"
                                        src={userProfile.image}
                                        alt="linkedin-logo"
                                        style={{
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                        }}
                                    />
                                    <div className="d-flex flex-column align-items-start no-spacex">
                                        <strong>
                                            {userProfile.name} {userProfile.surname}
                                        </strong>
                                        <br />
                                        <small> {userProfile.bio}</small>
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <Button variant="light" className=" bg-light text-secondary text-muted rounded-5 me-3 fw-semibold">
                                        Altro
                                    </Button>
                                    <Button variant="light" className="bg-light text-primary fw-semibold rounded-5 me-3">
                                        Aggiungi sezione del profilo
                                    </Button>
                                    <Button variant="primary" className="btn-primary rounded-5 fw-semibold">
                                        Disponibile per
                                    </Button>
                                </div>
                            </Container>
                        </Navbar>
                    </Row>

                ) : (
                    <Row className="fixed-top w-100 fs-xs no-scroll-margin">
                        <Navbar bg="light" variant="light" expand="lg" fixed="top" className={`w-100 ${isScroll ? 'shadow-sm' : ''}`}>
                            <Container className="d-flex justify-content-between align-items-center">
                                <Navbar.Brand href="/">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                        alt="linkedin logo"
                                        style={{ width: 33 }}
                                    />
                                </Navbar.Brand>

                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto d-none d-md-inline">
                                        <Form className="d-flex align-items-center">
                                            <Search className="me-2 navbar-icon" size={20} />
                                            <FormControl
                                                type="text"
                                                placeholder="Cerca"
                                                className="me-2 search-background"
                                            />
                                        </Form>
                                    </Nav>

                                    <Nav className="ms-auto d-flex align-items-center">
                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <HouseDoorFill size={20} />
                                            <div>Home</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <PeopleFill size={20} />
                                            <div>Rete</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <BriefcaseFill size={20} />
                                            <div>Lavoro</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <ChatDotsFill size={20} />
                                            <div>Messaggistica</div>
                                        </div>

                                        <div className="navbar-icon-container text-center mx-3 navbar-icon">
                                            <BellFill size={20} />
                                            <div>Notifiche</div>
                                        </div>
                                        <Dropdown className="mx-3">
                                            <Dropdown.Toggle
                                                variant="link"
                                                className="d-flex flex-column align-items-center dropdown-toggle text-decoration-none text-dark"
                                            >
                                                <img
                                                    className="navbar-profile-pic"
                                                    src={userProfile.image}
                                                    alt="profilo"
                                                    style={{ width: 30, borderRadius: '50%' }}
                                                />
                                                <span className="mt-1">Tu</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <TendinaTu dati={userProfile} />
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown className="mx-3">
                                            <Dropdown.Toggle
                                                variant="link"
                                                className="d-flex flex-column align-items-center dropdown-toggle text-decoration-none text-dark"
                                            >
                                                <i className="bi bi-grid" style={{ fontSize: '20px' }} />
                                                <span className="mt-1">Per le aziende</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {/* Other menu items */}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <div className="text-center d-none d-lg-block">
                                            <a href="#" className="text-premium-color text-decoration-underline">
                                                Passa a Premium per 0<br /> EUR
                                            </a>
                                        </div>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Row>
                )}
            </Suspense>

        </>
    );
}

export default MyNavbar;
