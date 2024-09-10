import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';

const FooterHome = () => (
  <footer className=" bg-light py-3" style={{ width: "250px" }}>
    <Container fluid>
      <Row>
        <Col md={6}>
          <ul className="list-unstyled">
            <li><a href="https://about.linkedin.com/" className="text-muted text-decoration-none">Informazioni</a></li>
            <li><a href="https://www.linkedin.com/help/linkedin?trk=d_flagship3_search_srp_all" className="text-muted text-decoration-none">Centro assistenza</a></li>
          </ul>
        </Col>
        <Col md={6}>
          <ul className="list-unstyled">
            <li><a href="https://www.linkedin.com/accessibility" className="text-muted text-decoration-none">Accessibilità</a></li>
            <li><a href="https://www.linkedin.com/legal/privacy-policy" className="text-muted text-decoration-none">Privacy e condizioni</a></li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="text-muted small" style={{ fontSize: "0.75rem" }}>
          <a href="https://www.linkedin.com/help/linkedin/answer/a1342443/?lang=it" className="text-muted text-decoration-none">Opzioni per gli annunci pubblicitari</a>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ul className="list-unstyled">
            <li><a href="https://www.linkedin.com/advertising" className="text-muted text-decoration-none">Pubblicità</a></li>
            <li><a href="/" className="text-muted text-decoration-none">Scarica l'app LinkedIn</a></li>
          </ul>
        </Col>
        <Col md={6}>
          <ul className="list-unstyled">
            <li><a href="/" className="text-muted text-decoration-none">Servizi alle aziende</a></li>
            <li><a href="/" className="text-muted text-decoration-none">Altro</a></li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="text-muted small d-flex align-items-center">
          <i className="fab fa-linkedin me-2 bg-primary"></i>
          <p className="mb-0">LinkedIn Corporation © {new Date().getFullYear()}</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default FooterHome;


