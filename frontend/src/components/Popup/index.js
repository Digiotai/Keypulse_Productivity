import { Modal } from 'react-bootstrap';
export const Popup = ({
    showModal,
    setShowModal,
    headerTitle,
    children
}) => {
    return (
        <Modal fullscreen={true} show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5 style={{fontFamily:"Poppins",fontSize:"20px"}}>{headerTitle} (Detailed View)</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {/* <Modal.Footer>
                <button className='btn btn-primary' onClick={() => setShowModal(false)}>Close</button>
            </Modal.Footer> */}
        </Modal>
    )
}