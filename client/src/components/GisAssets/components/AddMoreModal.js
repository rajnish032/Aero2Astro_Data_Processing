"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import RequiredStar from "@/components/smallComponents/RequiredStar";
import { useState } from "react";

const AddMoreModal = ({ isOpen, setIsOpen, handleSubmit }) => {
  const [newPayload, setNewPayload] = useState("");

  const handleFormSubmit = () => {
    if (newPayload.trim()) {
      handleSubmit(newPayload);
      setNewPayload("");
      setIsOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <ModalHeader className="">Add Payload</ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <p className="text-sm">
              Enter Payload <RequiredStar />
            </p>
            <input
              type="text"
              value={newPayload}
              onChange={(e) => setNewPayload(e.target.value)}
              required
              className="w-[300px] text-sm p-2 bg-gray-100 outline-none"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
            Close
          </Button>
          <Button color="primary" onPress={handleFormSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMoreModal;
