import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const FlightDetails = ({ allLogs }) => {
  const [selectedFilter, setSelectedFilter] = useState("Overall");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredLogs =
    selectedFilter === "Overall"
      ? allLogs
      : allLogs.filter((log) => log?.projectType === selectedFilter);

  const flightCounts = ["Manual", "Autonomous"].map((type) => {
    const typeLogs = allLogs.filter((log) => log?.projectType === type);
    return typeLogs.length;
  });

  const formatFlyTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const chartData = {
    labels: [ "Manual","Autonomous"],
    datasets: [
      {
        data: flightCounts,
        backgroundColor: ["#4CAF50", "#2196F3"],
        hoverBackgroundColor: ["#45A049", "#1E88E5"],
      },
    ],
  };

  const totalMissionDuration = (() => {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;

    filteredLogs.forEach((log) => {
      const { hr = 0, min = 0, sec = 0 } = log?.duration || {};
      totalHours += hr;
      totalMinutes += min;
      totalSeconds += sec;
    });

    const extraMinutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    totalMinutes += extraMinutes;

    const extraHours = Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    totalHours += extraHours;

    return `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
  })();

  const totalFlightTime = formatFlyTime(
    filteredLogs.reduce(
      (total, log) => total + Number(log?.totalFlyTime || 0),
      0
    )
  );

  const totalRange = filteredLogs
    .filter((log) => log?.flightType?.includes("linear"))
    .reduce((total, log) => total + (log?.rangeCovered || 0), 0)
    .toFixed(2);

  const totalArea = filteredLogs
    .filter((log) => !log?.flightType?.includes("linear"))
    .reduce((total, log) => total + (log?.rangeCovered || 0), 0)
    .toFixed(2);

  const flightDistance = (
    filteredLogs.reduce(
      (total, log) => total + Number(log?.flightDistance || 0),
      0
    ) / 1000
  ).toFixed(2);

  return (
    <div className="flex w-auto justify-center gap-x-6 flex-grow flex-wrap ">
      {/* Flight Details */}
      <div className="bg-white h-fit shadow rounded-lg p-4 mb-6 w-[200px] md:w-[300px]">
      <h3 className="md:text-xl text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          {selectedFilter} Flight Details
        </h3>
        {/* Tab Filter */}
        <div className="w-full flex gap-x-1 rounded-full overflow-hidden text-xs mb-6">
          {["Overall", "Manual", "Autonomous"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-2 py-1 rounded-full ${
                selectedFilter === filter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-blue-400`}
            >
              {filter}
            </button>
          ))}
        </div>

       
        <div className="grid grid-cols-2 gap-4">
          {selectedFilter === "Overall" && (
            <>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Mission Duration</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalMissionDuration}
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Flight Time</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalFlightTime}
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Distance</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalRange} km
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Area</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalArea} acres
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Flight Distance</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {flightDistance} km
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Total Flight</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {allLogs.length} 
                </p>
              </div>
            </>
          )}
          {selectedFilter === "Manual" && (
            <>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Flight Time</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalFlightTime}
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Flight Distance</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {flightDistance} km
                </p>
              </div>
            </>
          )}
          {selectedFilter === "Autonomous" && (
            <>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Distance</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalRange} km
                </p>
              </div>
              <div>
                <p className="md:text-sm text-xs text-gray-500">Area</p>
                <p className="md:text-lg font-medium text-gray-900">
                  {totalArea} acres
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Circular Chart */}
      <div className="bg-white h-fit w-fit shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Flight Distribution
        </h3>
        <Doughnut className="w-[150px] md:w-[250px]" data={chartData} />
      </div>
    </div>
  );
};

export default FlightDetails;
