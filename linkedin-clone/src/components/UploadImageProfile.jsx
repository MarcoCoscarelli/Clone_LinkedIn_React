import { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';

/* eslint-disable react/prop-types */
function ImageUploadProfile({ show, hide }) {
  const inputRef = useRef();

  // Recupera la chiave API dal local storage
  const API_KEY = localStorage.getItem('bearerToken');

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = () => {
    let file = inputRef.current.files[0];

    // Validazione file immagine
    if (file && file.type.startsWith("image/")) {
      let formData = new FormData();
      formData.append('profile', file);

      let id = '66decad84d0def0015cef103'; // ID aggiornato

      fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${id}/picture`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Aggiunto controllo degli errori
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          window.location.reload(); // Manteniamo il reload per ora
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert("Per favore seleziona un file immagine valido.");
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={hide}
        animation={false}
        aria-labelledby="example-modal-sizes-title-lg"
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Aggiungi foto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Modifica la tua foto profilo</Modal.Body>
        <Modal.Footer className="justify-content-between ">
          <div>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <Button variant="secondary" onClick={hide} className="me-3">
              Modifica foto di sfondo
            </Button>
            <Button variant="primary" onClick={handleButtonClick}>
              Modifica foto profilo
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageUploadProfile;
