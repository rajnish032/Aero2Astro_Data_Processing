import React from 'react';
import { Modal, Button } from "@nextui-org/react";

const DeleteModal = ({ isOpen, handleDelete, handleClose }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h4>Confirm Deletion</h4>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>
      <div>
        <Button auto color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button auto onClick={handleDelete}>
          Yes
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
