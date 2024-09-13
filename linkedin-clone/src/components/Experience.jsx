import { useState, useEffect } from "react";
import { Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Experiences = ({ userId, canEdit = false }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });
  const state = useSelector((state) => state.profile);
  console.log('state', state)
  const urlAPI = userId
    ? `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`
    : null;

  // Fetch delle esperienze
  const fetchExperiences = async () => {
    if (!urlAPI) {
      console.error("userId non definito, impossibile fare fetch");
      return;
    }
    try {
      const response = await fetch(urlAPI, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero delle esperienze");
      }
      const data = await response.json();
      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error("Errore:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExperiences();
    }
  }, [userId]);

  if (!userId) {
    return <div>Impossibile caricare esperienze.</div>;
  }

  const handleAddExperience = async () => {
    try {
      const response = await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
        },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione dell'esperienza");
      }

      const data = await response.json();

      // Aggiungi la nuova esperienza alla lista locale
      setExperiences((prevExperiences) => [...prevExperiences, data]);

      // Resetta il form
      setNewExperience({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        area: "",
      });

      setShowModal(false);
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleEditExperience = async (expId) => {
    try {
      const response = await fetch(`${urlAPI}/${expId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
        },
        body: JSON.stringify(currentExperience),
      });

      if (!response.ok) {
        throw new Error("Errore nella modifica dell'esperienza");
      }

      const data = await response.json();

      // Aggiorna l'esperienza modificata nella lista locale
      setExperiences((prevExperiences) =>
        prevExperiences.map((exp) => (exp._id === expId ? data : exp))
      );

      setCurrentExperience(null);
      setShowModal(false);
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`${urlAPI}/${expId}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRlYjA5YjRkMGRlZjAwMTVjZWYwZmYiLCJpYXQiOjE3MjU4NzAyNjYsImV4cCI6MTcyNzA3OTg2Nn0.BzqbDuJcgAVaJ4zqQUJZ_9qggQsyBP3riei09Byqd68",
        },
      });

      if (!response.ok) {
        throw new Error("Errore nell'eliminazione dell'esperienza");
      }

      // Rimuovi l'esperienza eliminata dalla lista locale
      setExperiences((prevExperiences) =>
        prevExperiences.filter((exp) => exp._id !== expId)
      );
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h5 className="mt-3">Esperienze</h5>

      {canEdit && (
        <Button onClick={() => setShowModal(true)}>Aggiungi esperienza</Button>
      )}

      {experiences.length > 0 ? (
        experiences.map((experience) => (
          <Card key={experience._id} className="mb-2">
            <Card.Body>
              <Card.Title>{experience.role}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {experience.company}
              </Card.Subtitle>
              <Card.Text>{experience.description}</Card.Text>

              {canEdit && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCurrentExperience(experience);
                      setShowModal(true);
                    }}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDeleteExperience(experience._id)}
                  >
                    Elimina
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Non ci sono esperienze da mostrare</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentExperience ? "Modifica esperienza" : "Aggiungi esperienza"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type="text"
                value={
                  currentExperience ? currentExperience.role : newExperience.role
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        role: e.target.value,
                      })
                    : setNewExperience({ ...newExperience, role: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Azienda</Form.Label>
              <Form.Control
                type="text"
                value={
                  currentExperience
                    ? currentExperience.company
                    : newExperience.company
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        company: e.target.value,
                      })
                    : setNewExperience({ ...newExperience, company: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data di inizio</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentExperience
                    ? currentExperience.startDate
                    : newExperience.startDate
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        startDate: e.target.value,
                      })
                    : setNewExperience({ ...newExperience, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data di fine</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentExperience ? currentExperience.endDate : newExperience.endDate
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        endDate: e.target.value,
                      })
                    : setNewExperience({ ...newExperience, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={
                  currentExperience
                    ? currentExperience.description
                    : newExperience.description
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        description: e.target.value,
                      })
                    : setNewExperience({
                        ...newExperience,
                        description: e.target.value,
                      })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                value={
                  currentExperience ? currentExperience.area : newExperience.area
                }
                onChange={(e) =>
                  currentExperience
                    ? setCurrentExperience({
                        ...currentExperience,
                        area: e.target.value,
                      })
                    : setNewExperience({ ...newExperience, area: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              currentExperience
                ? handleEditExperience(currentExperience._id)
                : handleAddExperience()
            }
          >
            {currentExperience ? "Salva modifiche" : "Aggiungi esperienza"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Experiences;

            
