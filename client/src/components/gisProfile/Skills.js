"use client";
import { gisData, gisProject } from "@/atom/states";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CiSettings } from "react-icons/ci";
import CircularProgress from "./components/cir";
import { getAllProj } from "@/routes/gisProj";
import { GrEdit } from "react-icons/gr";
import Link from "next/link";

const Skills = () => {
  const [allProj, setAllProj] = useRecoilState(gisProject);
  const [currentUser, setCurrentUser] = useRecoilState(gisData);

  useEffect(() => {
    getAllProj(setAllProj);
  }, []);

  // Group projects by tag
  const projectsByTag = allProj?.reduce((acc, project) => {
    const tag = project.industry;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  // Group projects by Type
  const projectsByType = allProj?.reduce((acc, project) => {
    const tag = project.type;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  // Group projects by Application
  const projectsByApplication = allProj?.reduce((acc, project) => {
    const tag = project.application;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  // Render a section for each category
  const renderSkillsSection = (skillsData) => {
    return (
      <div className="flex flex-row items-center overflow-y-hidden overflow-x-auto min-h-40 max-h-40 w-full box-border">
        {skillsData &&
          Object.entries(skillsData).map(([tag, count]) => {
            const totalProjects = 100; // default total count
            const percentage = (count / totalProjects) * 100;
            let color = "";

            if (percentage < 25) {
              color = "red";
            } else if (percentage < 50) {
              color = "orange";
            } else if (percentage < 75) {
              color = "yellow";
            } else {
              color = "green";
            }

            return (
              <div key={tag} className="flex flex-col items-center mb-4">
                <CircularProgress
                  value={percentage}
                  color={color}
                  radius={35}
                />
                <span
                  className="text-xs font-bold text-center text-gray-700 truncate max-w-[120px] -mt-4" // Truncate long tags with ellipsis
                  title={tag} // Show full tag on hover
                >
                  {tag}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="rounded-md shadow relative h-full min-h-28 bg-white ">
      <h2 className="text-lg flex items-center justify-between gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-sm md:text-xl text-center">
        <span className="inline-flex gap-2 items-center">
          <CiSettings className="w-fit text-lg" /> Skills
        </span>
        <Link
          href={`/gis/projects/${currentUser?.fullName
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <GrEdit className="text-md cursor-pointer text-white hover:text-black" />
        </Link>
      </h2>

      {/* Three Column Layout with Separator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 relative">
        {/* Industry Skills */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-blue-700 mb-2 w-full border-b-2 border-gray-300 pb-2 text-center">
            Industry Skills
          </h3>
          {renderSkillsSection(projectsByTag)}
        </div>
        {/* Vertical line between columns */}
        <div className="hidden md:block border-l-2 border-gray-300 absolute left-1/3 top-0 bottom-0"></div>
        <div className="hidden md:block border-l-2 border-gray-300 absolute left-2/3 top-0 bottom-0"></div>
        {/* Project Skills */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-blue-700 mb-2  w-full border-b-2 border-gray-300 pb-2 text-center">
            Project Skills
          </h3>
          {renderSkillsSection(projectsByType)}
        </div>
        {/* Application Skills */}{" "}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-blue-700 mb-2  w-full border-b-2 border-gray-300 pb-2 text-center">
            Application Skills
          </h3>
          {renderSkillsSection(projectsByApplication)}
        </div>
      </div>
    </div>
  );
};

export default Skills;
