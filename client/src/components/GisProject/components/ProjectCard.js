"use client";
import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { TbDeviceRemote } from "react-icons/tb";
import { GiDeliveryDrone } from "react-icons/gi";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiChatDeleteFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import DelModal from "../../smallComponents/DelModal";
import { MdFileDownload } from "react-icons/md";
import dayjs from "dayjs";

const industryImages = {
  Solar:
    "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523457/6692f7ec62b53e48c07aa510cd3fdf16_npxmcn.jpg",
  Wind: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523860/2a5d9552856098222ca2c36b7d793102_nrbymx.jpg",
  Construction:
    "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523928/free-photo-of-drone-shot-of-building-construction_roqlsr.jpg",
  Railways:
    "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745523978/train-traveling-down-train-tracks-next-to-a-forest_zvy6w0.jpg",
  Agriculture:
    "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524095/irri-bbm-rice-drone-demo-2-9d108c-1024_mnbmxs.jpg",
  Others:
    "https://res.cloudinary.com/dfrcswf0n/image/upload/v1745524173/original_1_w4tami.jpg",
};

const ProjectCard = ({ project, projId, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatDate = (date) => {
    if (!date) return "";
    return dayjs(date).format("DD/MM/YYYY");
  };

  const openModal = () => {
    console.log("open");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close");

    setIsModalOpen(false);
  };

  const confirmDelete = (projId) => {
    handleDelete(projId);
    console.log("delete");

    closeModal();
  };

  const imageUrl =
    industryImages[project?.industry] || industryImages["Others"];

  return (
    <>
      <Card className="py-2 relative ">
        {/* <DelModal isOpen={isModalOpen} handleDelete={confirmDelete} handleClose={closeModal} /> */}
        <CardHeader className="pb-0 pt-2 px-4 flex-col  items-start">
          <div className="flex items-center justify-between w-full mb-1">
            <h4 className="font-bold text-xl">{project?.title}</h4>
            <TiDelete
              onClick={() => handleDelete(projId)}
              className="text-md cursor-pointer w-fit h-fit inline-block  text-red-600 hover:text-red-700"
            />
          </div>

          <div className="flex mb-2 items-center  w-full  justify-between rounded-full flex-wrap gap-3">
            <p className="text-sm text-blue-500 font-medium">
              {project?.industry} - {project?.application}
            </p>
            {/* <p className={`text-tiny font-medium  ${project?.status==='ongoing'?'text-yellow-600':'text-green-500'}`}>{project?.status?.replace(project?.status[0],project?.status[0].toUpperCase())}</p> */}
          </div>
          <p className="text-tiny flex items-center gap-2 text-gray-500 ">
            {" "}
            <IoLocation></IoLocation>
            {project?.location}
          </p>
          <p className="text-tiny flex items-center gap-2 text-gray-500 ">
            {" "}
            <TbDeviceRemote />
            {project?.type}
          </p>
          <p className="text-tiny flex items-center gap-2 text-gray-500 ">
            {" "}
            <GiDeliveryDrone />
            {project?.rangeCovered}
            {project?.type.includes("linear") ? "km" : "acres"}
          </p>
          <div className="w-full flex justify-between">
            <small className="text-default-500 flex text-tiny  items-center gap-2">
              <FaClockRotateLeft></FaClockRotateLeft>{" "}
              {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
            </small>
            {project?.fileUrl && (
              <a
                href={project.fileUrl}
                download
                target="_blank"
                className="flex items-center gap-1 text-blue-500"
              >
                <span>File</span>
                <span className="relative top-[1px]">
                  <MdFileDownload size={18} />
                </span>
              </a>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={imageUrl}
            width={270}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ProjectCard;
