import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button, Spinner } from "@nextui-org/react";
import AddButton from "@/components/smallComponents/AddButton";
import RequiredStar from "@/components/smallComponents/RequiredStar";

const WorkModal = ({ isOpen,loading, setIsOpen, handleSubmit, data, setData }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({ ...prev, image: file }));
    }
  };

  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Work Experience</ModalHeader>
        <ModalBody>
          <div className="flex flex-col w-full p-2 gap-4 text-sm">
            <div>
              <p className="mb-1">Work Type <RequiredStar /></p>
              <div className="flex gap-2 flex-wrap items-center">
                {['Freelancer', 'Employed in company'].map((i) =>
                  <div key={i} onClick={() => setData((p) => ({ ...p, jobType: i }))} className={`px-2 cursor-pointer text-xs flex-wrap rounded-full hover:bg-blue-500 hover:text-white py-1 ${i === data?.jobType ? 'bg-blue-500 text-white' : 'bg-gray-200 '}`}>
                    {i}
                  </div>
                )}
              </div>
            </div>
            <div>
              <p>Company Name <RequiredStar /></p>
              <input required onChange={(e) => setData((p) => ({ ...p, companyName: e.target.value }))} className="p-2 w-full rounded bg-gray-100 text-gray-800" type="text" placeholder="e.g. Aero2Astro" />
            </div>
            <div>
              <p>Designation <RequiredStar /></p>
              <input required onChange={(e) => setData((p) => ({ ...p, designation: e.target.value }))} className="p-2 rounded w-full bg-gray-100 text-gray-800" type="text" placeholder="UAV Pilot" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p>Start Mon <RequiredStar /></p>
                <input required onChange={(e) => setData((p) => ({ ...p, startMon: e.target.value }))} className="p-2 rounded bg-gray-100 text-gray-800" type="month" placeholder="start month" />
              </div>
              <div>
                <p>End Mon <RequiredStar /></p>
                <input required onChange={(e) => setData((p) => ({ ...p, endMon: e.target.value }))} className="p-2 rounded bg-gray-100 text-gray-800" type="month" placeholder="end month" />
              </div>
            </div>
            <div>
              <p>Upload Certificate <RequiredStar /></p>
              <input required className="p-2 rounded bg-gray-100 text-gray-800" type="file" name="image" accept=".pdf" onChange={handleFileChange} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
            Close
          </Button>
        { loading? <Spinner/>
        :  <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default WorkModal;
