import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createHomePost, fetchUserProfile, deleteHomePost } from '../redux/actions/homePostAction';
import { FaCalendarDays } from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";
import { FaSmile, FaImage, FaCalendarAlt, FaCog, FaPlus } from 'react-icons/fa';

const HomeCreatePost = () => {
    const [showHomeModal, setShowHomeModal] = useState(false);
    const [postHomeContent, setPostHomeContent] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertVariant, setAlertVariant] = useState('');

    // Recupera user e homeposts dallo store Redux
    const user = useSelector((state) => state.user.user);
    const posts = useSelector((state) => state.homePosts.homeposts); // Lista di post
    const dispatch = useDispatch();

    // Creazione di un nuovo post
    const handleCreatePost = () => {
        if (postHomeContent) {
            dispatch(createHomePost(postHomeContent))
                .then(() => {
                    setAlertMessage('Il tuo post è stato creato con successo!');
                    setAlertVariant('success');
                })
                .catch(() => {
                    setAlertMessage('Si è verificato un errore nella creazione del post.');
                    setAlertVariant('danger');
                });
            setPostHomeContent('');
            setShowHomeModal(false);
        } else {
            setAlertMessage('Il contenuto del post non può essere vuoto.');
            setAlertVariant('warning');
        }
    };

    // Cancella il post
    const handleDeletePost = (postId) => {
        dispatch(deleteHomePost(postId));
    };

    // Carica il profilo utente quando il componente viene montato
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    return (
        <div className="p-3 mb-4" style={{ marginTop: "100px" }}>
            <Card className='p-3 rounded-3'>
                <div className="d-flex align-items-center">
                    {user && user.image ? (
                        <img
                            src={user.image}
                            alt="avatar"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}
                        />
                    ) : (
                        <div className="rounded-circle bg-secondary me-2" style={{ width: '40px', height: '40px' }}></div>
                    )}
                    <Button variant="light" onClick={() => setShowHomeModal(true)} className="w-100 text-start rounded-5">
                        Crea un post
                    </Button>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <Button variant="outline-secondary" className='border border-0 text-black'>
                        <i className="bi bi-image text-primary"></i> Contenuti multimediali
                    </Button>
                    <Button variant="outline-secondary" className='d-flex align-items-center border border-0 text-black'>
                        <FaCalendarDays className='calendar-icon-home me-1' /> Evento
                    </Button>
                    <Button variant="outline-secondary" className='d-flex align-items-center border border-0 text-black'>
                        <RiArticleFill className='me-1 article-icon-home' /> Scrivi un articolo
                    </Button>
                </div>
            </Card>

            {/* Alert per mostrare messaggi di post o errore */}
            {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            {/* Modal per creare un nuovo post */}
            <Modal show={showHomeModal} onHide={() => setShowHomeModal(false)} centered>
                <Modal.Header closeButton>
                    <div className="d-flex align-items-center">
                        <img
                            src={user?.image || 'default-avatar.png'}
                            alt="avatar"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <div>
                            <h6 className="mb-0">{user?.name}</h6>
                            <small>Pubblica: Chiunque</small>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Di cosa vorresti parlare?"
                                value={postHomeContent}
                                onChange={(e) => setPostHomeContent(e.target.value)}
                                style={{ border: 'none', fontSize: '16px' }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <FaSmile className="me-3" size={20} />
                        <FaImage className="me-3" size={20} />
                        <FaCalendarAlt className="me-3" size={20} />
                        <FaCog className="me-3" size={20} />
                        <FaPlus className="me-3" size={20} />
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleCreatePost}
                        disabled={!postHomeContent.trim()}
                    >
                        Pubblica
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Mostra i post creati */}
            <div className="mt-4">

                {posts.map((post) => (
                    <Card key={post._id} className="mb-3">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>{user?.name}</Card.Title>
                                <Card.Text>{post.text}</Card.Text>
                            </div>
                            <Button
                                variant="outline-danger"
                                onClick={() => handleDeletePost(post._id)}
                            >
                                Elimina
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomeCreatePost;


