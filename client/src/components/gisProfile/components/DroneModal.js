
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { equipmentName } from "@/data/dataset";
import AddButton from "@/components/smallComponents/AddButton";
const EquipmentModal = ({ isOpen, setIsOpen, handleSubmit }) => {
  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Equipment Names</ModalHeader>
        <ModalBody>
          <div className="flex items-center flex-wrap text-xs font-medium text-gray-900 gap-3 justify-center">
            {equipmentName?.map((i) => {
              return <div key={i} className="px-2 cursor-pointer hover:bg-blue-500 hover:text-white bg-gray-200 py-1">
                {i}
              </div>
            })}

            <AddButton></AddButton>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EquipmentModal;
