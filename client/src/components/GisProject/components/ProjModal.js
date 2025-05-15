"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button, Spinner } from "@nextui-org/react";
import AddButton from "@/components/smallComponents/AddButton";
import RequiredStar from "@/components/smallComponents/RequiredStar";
import { getAllProj } from "@/routes/gisProj";
import { toast } from "react-toastify";

const ProjModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  loading,
  setData,
  data,
  selectedFile,
  setSelectedFile,
}) => {
  const [tags, setTags] = useState([
    "Solar",
    "Tower",
    "Building",
    "Construction",
  ]);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const { title, location, startDate, endDate, type, rangeCovered } =
      data || {};
    if (title && location && startDate && endDate && type && rangeCovered) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setIsAddTagOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="flex items-center justify-center"
      >
        <ModalContent className="overflow-y-auto max-h-[90vh]">
          <ModalHeader className="flex flex-col gap-1">Add Project</ModalHeader>
          <ModalBody>
            <form className="flex flex-col w-full p-2 gap-4 text-tiny md:text-sm">
              
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>
                    Project Title <RequiredStar />
                  </p>
                  <input
                    name="title"
                    value={data?.title}
                    required
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="text"
                    placeholder="Project Title"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-1/2">
                  <p>
                    Project Objective <RequiredStar />
                  </p>
                  <input
                    name="objective"
                    required
                    value={data?.objective}
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="text"
                    placeholder="Project Objective"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Industry and application */}
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>
                    Industry <RequiredStar />
                  </p>
                  <select
                    name="industry"
                    onChange={handleInputChange}
                    value={data?.industry}
                    placeholder={"Select the Industry"}
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                  >
                    <option value="Solar">Solar</option>
                    <option value="Wind">Wind</option>
                    <option value="Construction">Construction</option>
                    <option value="Railways">Railways</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <p>
                    Application <RequiredStar />
                  </p>
                  <select
                    name="application"
                    onChange={handleInputChange}
                    value={data?.application}
                    placeholder={"Select the Application"}
                    className="p-2 rounded w-full bg-gray-100 text-gray-800"
                  >
                    <option value="Surveying">Surveying</option>
                    <option value="Mapping">Mapping</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Surveillance">Surveillance</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              {/* Missioin Type and Distance */}
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>
                    Mission Type <RequiredStar />
                  </p>
                  <select
                    name="type"
                    onChange={handleInputChange}
                    value={data?.type}
                    placeholder={"Select the Type"}
                    className="p-2 rounded w-full bg-gray-100 text-gray-800"
                  >
                    <option value="linear videography">
                      Linear VideoGraphy
                    </option>
                    <option value="linear mapping">Linear Mapping</option>
                    <option value="area videography">Area VideoGraphy</option>
                    <option value="area mapping">Area Mapping</option>
                    <option value="vertical videography">
                      Vertical VideoGraphy
                    </option>
                    <option value="vertical mapping">Vertical Mapping</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <p>
                    {data?.type === "linear videography" ||
                    data?.type === "linear mapping"
                      ? "Distance in Km"
                      : "Area in Acres"}{" "}
                    <RequiredStar />
                  </p>
                  <input
                    name="rangeCovered"
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="number"
                    min={0}
                    placeholder="Enter Value"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Tools and scope */}
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>
                    Tools
                    <RequiredStar />
                  </p>
                  <select
                    name="tools"
                    onChange={handleInputChange}
                    value={data?.tools}
                    placeholder={"Select the Type"}
                    className="p-2 rounded w-full bg-gray-100 text-gray-800"
                  >
                    <option value="Phantom-4-pro">Phantom 4 pro</option>
                    <option value="Mavic-2-pro">Mavic 2 pro</option>
                    <option value="Air-2S">Air 2S</option>
                    <option value="Air-3">Air 3</option>
                    <option value="Mavic-3E-enterprise">
                      Mavic 3E enterprise
                    </option>
                    <option value="Mavic-3T-thermal">Mavic 3T thermal</option>
                    <option value="Mavic-3M-Multispectral">
                      Mavic 3M Multispectral
                    </option>
                    <option value="Matrice-300-rtk">Matrice-300-rtk</option>
                    <option value="Matrice-350-rtk">Matrice-350-rtk</option>
                    <option value="Striver-vtol">Striver vtol</option>
                    <option value="Fighter-vtol">Fighter vtol</option>
                    <option value="Talon-fixed-wing">Talon fixed wing</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <p>
                    Scope & Result
                    <RequiredStar />
                  </p>
                  <textarea
                    name="scope"
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="text"
                    min={0}
                    rows={2}
                    value={data?.scope}
                    placeholder="Enter Value"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>Project Place</p>
                  <input
                    name="location"
                    required
                    className="p-2 rounded w-full bg-gray-100 text-gray-800"
                    type="text"
                    placeholder="Place/Location"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <p>Upload File (KML/KMZ)</p>
                  <input
                    type="file"
                    accept=".kml,.kmz"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <p>
                    Start Date <RequiredStar />
                  </p>
                  <input
                    name="startDate"
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="date"
                    placeholder="start date"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <p>
                    End Date <RequiredStar />
                  </p>
                  <input
                    name="endDate"
                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                    type="date"
                    placeholder="end date"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
          <div className="flex items-center justify-end gap-3 w-full p-4">
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setIsOpen(false);
                setData({
                  startDate: "",
                  endDate: "",
                  location: "",
                  title: "",
                  tag: "",
                  // status: "",
                  type: "linear videography",
                  rangeCovered: "",
                });
              }}
            >
              Close
            </Button>
            {loading ? (
              <Spinner />
            ) : (
              <Button
                color="primary"
                className="cursor-pointer"
                type="submit"
                onClick={(e) => {
                  if (data?.startDate > data?.endDate)
                    return toast.error(
                      "End Date cannot be smaller than start date"
                    );

                  handleSubmit(e);
                  setData(null);
                }}
                disabled={!isFormValid || loading}
              >
                Save
              </Button>
            )}
          </div>
        </ModalContent>
      </Modal>

      {/* Add Tag Modal */}
      <Modal
        isOpen={isAddTagOpen}
        onClose={() => setIsAddTagOpen(false)}
        className="flex items-center justify-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New Tag</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleAddTag}
              className="flex flex-col w-full p-2 gap-4"
            >
              <div>
                <p>New Tag</p>
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  required
                  className="p-2 w-full rounded bg-gray-100 text-gray-800"
                  type="text"
                  placeholder="Enter new tag"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter className="flex justify-end gap-3 items-center">
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsAddTagOpen(false)}
            >
              Cancel
            </Button>

            <Button color="primary" type="submit" onClick={handleAddTag}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjModal;
