"use client";
import React, { useEffect, useState } from "react";
import {gisData, logData, gisProject } from "@/atom/states";
import RequiredStar from "@/components/smallComponents/RequiredStar";
import { getAllLog } from "@/routes/gisLog";
import { getAllProj } from "@/routes/gisProj";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from 'next/navigation';
const LogModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  loading,
  setData,
  data,
  handleFileUpload,
  flightDistance,
  flightTime,
  setTotalTime,
  setTotalDistance,
  isManual,
  setIsManual
}) => {
  const [allLog, setAllLog] = useRecoilState(logData);
  const [allProj, setAllProj] = useRecoilState(gisProject);
  const [currentUser,setCurrentUser] =useRecoilState(gisData)
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("duration")) {
      const durationType = name.split(".")[1];
      setData((prevData) => ({
        ...prevData,
        duration: {
          ...prevData.duration,
          [durationType]: parseInt(value) || 0,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="flex items-center justify-center"
      >
        <ModalContent className="overflow-y-auto">
          <ModalHeader className="flex flex-col gap-1">Add Log</ModalHeader>
          <ModalBody>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col min-w-full gap-4 text-tiny md:text-sm"
            >
              {/*toggle option for manual and autonomous mission  */}
              <div className="flex items-center space-x-2">
      <label htmlFor="mode" className="font-medium text-gray-700">
        Flight Type: <RequiredStar/>
      </label>
      <select
        id="mode"
        className="p-2 rounded bg-gray-100 text-gray-800"
        onChange={(event)=>setIsManual(event.target.value === "Manual")}
        defaultValue="Manual" // Default value
      >
        <option value="Manual">Manual</option>
        <option value="Autonomous">Autonomous</option>
      </select>
     
    </div>
              {/*  */}
              <div>
                <p>
                  Flight Name <RequiredStar />
                </p>
                <input
                  name="flightName"
                  required
                  disabled={isManual}
                  className="p-2 w-full rounded bg-gray-100 text-gray-800"
                  type="text"
                  placeholder={`${isManual?"Name will be Extracted from File":"Flight Name(DJI-DDMMYY-SSMMHH)"}`}
                  value={data.flightName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center flex-wrap gap-3">
              <div>
      <p className={`${allProj.length > 0 ? "" : "mb-2"}`}>
        Project <RequiredStar />
      </p>
      <select
        name="project"
        required
        className="p-2 rounded w-40 bg-gray-100 text-gray-800"
        value={data.project}
        onChange={(e) => {
          if (e.target.value === 'create-project') {
            router.push(`/gis/projects/${currentUser?.fullName.toLowerCase().replace(" ", "-")}`);
          } else {
            handleInputChange(e);
          }
        }}
      >
        <option value="">Select Project</option>
        {allProj?.map((i) => (
          <option key={i?._id} value={i?._id}>
            {i?.title}
          </option>
        ))}
        <option value="create-project" className="text-blue-500">
          Create Project
        </option>
      </select>
    </div>

                <div>
                  
                  <p>
                    Location <RequiredStar />
                  </p>
                  <input
                    name="location"
                    required
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    type="text"
                    placeholder="Enter site location"
                    value={data.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p>
                    Project Type <RequiredStar />
                  </p>
                  <select
                    name="flightType"
                    required
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    value={data.flightType}
                    onChange={handleInputChange}
                  >
                    <option value="linear videography">
                      Linear VideoGraphy
                    </option>
                    <option value="linear mapping">Linear Mapping</option>
                    <option value="area videography">Area VideoGraphy</option>
                    <option value="area mapping">Area Mapping</option>
                  </select>
                </div>
                <div>
                  <p>
                    {data.flightType === "linear videography" ||
                    data.flightType === "linear mapping"
                      ? "Distance in Km"
                      : "Area in Acres"}{" "}
                    <RequiredStar />
                  </p>
                  <input
                    name="rangeCovered"
                    required
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    type="number"
                    min={0}
                    placeholder="Enter Value"
                    value={data.rangeCovered}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p>
                    Flight Date <RequiredStar />
                  </p>
                  <input
                    name="flightDate"
                    required
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    type="date"
                    placeholder="Flight Date"
                    value={data.flightDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p>
                    Flight Duration <RequiredStar />
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      name="duration.hr"
                      className="p-2 rounded bg-gray-100 text-gray-800"
                      type="number"
                      min={0}
                      placeholder="Hr"
                      value={data.duration.hr}
                      onChange={handleInputChange}
                    />
                    <input
                      name="duration.min"
                      className="p-2 rounded bg-gray-100 text-gray-800"
                      type="number"
                      min={0}
                      max={59}
                      placeholder="Min"
                      value={data.duration.min}
                      onChange={handleInputChange}
                    />
                    <input
                      name="duration.sec"
                      className="p-2 rounded bg-gray-100 text-gray-800"
                      type="number"
                      min={0}
                      max={59}
                      placeholder="Sec"
                      value={data.duration.sec}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  Upload File
                  {isManual && <RequiredStar/>}
                </p>
                     
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt"
                  required={isManual}
                  placeholder="Upload a File"
                  className="cursor-pointer rounded-md"
                />
              </div>
              <div className="flex items-center gap-3">
              <div>
                  <p>
                    Flight Distance  {isManual && <RequiredStar/>}
                  </p>
                  <input
                    name="flightDistance"
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    type="text"
                    disabled
                    value={`${(flightDistance/1000).toFixed(2)} Km`}
                  />
                </div>
                <div>
                  <p>
                    Flight Time  {isManual && <RequiredStar/>}
                  </p>
                  <input
                    name="flightTime"
                    className="p-2 rounded bg-gray-100 text-gray-800"
                    type="text"
                    disabled
                    value={`${flightTime/1000} Seconds`}
                  />
                </div>
              </div>
              <div className="">
                <textarea
                  name="remark"
                  className="p-2 w-full rounded bg-gray-100 text-gray-800"
                  type="text"
                  placeholder="Add Any Remarks e.g. Equipment Damaged "
                  value={data.remark}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 w-full p-4">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setIsOpen(false);
                    setData({
                      flightName: "",
                      project: "",
                      location: "",
                      flightDate: "",
                      duration: { hr: 0, min: 0, sec: 0 },
                      rangeCovered: "",
                      flightType: "linear videography",
                    });
                    setTotalTime(0);
                    setTotalDistance(0)
                    setIsManual(true)
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
                  >
                    Save
                  </Button>
                )}
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogModal;
