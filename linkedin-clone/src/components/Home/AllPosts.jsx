import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Post from "./Post";


const AllPosts = ({ postsAdded }) => {

    const [posts, setPosts] = useState(null);
    const [numOfPosts, setNumOfPosts] = useState(20);

    // const [postsChanged, setPostsChanged] = useState(0);
    // const [selectedPost, setSelectedPost] = useState(null);
    const [selectedPostDetails, setSelectedPostDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);


    const fetchPosts = async () => {
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/posts",
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmRmNDI3NWFmNDM0YjAwMTU5ZDgzMmIiLCJpYXQiOjE3MjU5MDc5NDAsImV4cCI6MTcyNzExNzU0MH0.9BnplLmgaQIFjhcARlwTs5Yimp8cJnqRsIQPvF23W1g`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
                console.log(posts)
            } else {
                console.error("Fetch fallita");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            {posts &&
                posts
                    .slice(posts.length - numOfPosts, posts.length).reverse()
                    .map((post) => <Post key={post._id} post={post} />)}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPostDetails?.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            as="textarea"
                            className="border-0"
                            rows={3}
                            value={selectedPostDetails?.text}
                            onChange={(e) =>
                                setSelectedPostDetails({
                                    ...selectedPostDetails,
                                    text: e.target.value,
                                })
                            }
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" >
                        Aggiorna
                    </Button>
                    <Button variant="danger" >
                        Elimina
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default AllPosts;