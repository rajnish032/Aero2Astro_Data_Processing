import { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { reqUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const UnavailabilityStatus = ({ userId,showAll}) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailabilityDates, setUnavailabilityDates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchAvailability();
  }, [userId]);

  const fetchAvailability = async () => {
    try {
      const token = cookies.get("auth");
      const { data } = await axios.get(
        `${reqUrl}/gis/unavailable/check/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setIsAvailable(data.isAvailable);
      setUnavailabilityDates(data.unavailabilityDates || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch availability.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      setLoading(true);
      const token = cookies.get("auth");
      await axios.delete(`${reqUrl}/gis/unavailable/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      toast.success("Unavailability entry deleted!");
      fetchAvailability();
    } catch (error) {
      console.error("Error deleting unavailability:", error);
      toast.error(error?.response?.data?.message || "Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    setLoading(true);
    try {
      const token = cookies.get("auth");
      await axios.post(
        `${reqUrl}/gis/unavailable/mark`,
        { startDate, endDate, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Unavailability saved!");
      fetchAvailability();
      setAddModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.warning(error?.response?.data?.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2 text-center">
      <div className="flex items-center gap-3">
        {/* Availability Status */}
        <h2 className="font-semibold">
          <span>Today: </span>
          <span className={`${isAvailable ? "text-green-600" : "text-red-600"}`}>
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </h2>

        {/* Show Unavailability Dates Button */}
        {showAll&&<button
          className="bg-blue-600 text-white px-[5px] py-[3px] text-xs rounded-full shadow hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Manage
        </button>}
      </div>

      {/* Unavailability List Modal */}
      {showAll&&modalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-10/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Unavailable Dates</h2>

            {unavailabilityDates.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-500 text-white">
                    <th className="border border-gray-300 px-6 py-3 text-center">Period</th>
                    <th className="border border-gray-300 px-6 py-3 text-center">Reason</th>
                    <th className="border border-gray-300 px-6 py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {unavailabilityDates.map((date) => (
                    <tr
                      key={date?._id}
                      className="border border-gray-300 even:bg-gray-100 hover:bg-gray-200 transition duration-200"
                    >
                      <td className="border border-gray-300 px-6 py-3 font-medium text-gray-800">
                        {new Date(date.startDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                        {"\u2013"}
                        {new Date(date.endDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {date.reason || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-center">
                        <button
                          onClick={() => handleDelete(date?._id)}
                          disabled={loading}
                          className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded-md transition duration-200"
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No unavailable dates recorded.</p>
            )}

            <div className="flex justify-end gap-5 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setAddModalOpen(true)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Unavailability Modal */}
      {showAll&&addModalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select Date Range</h2>

            <label className="block mb-2 text-start">
              Start Date:
              <input
                type="date"
                className="border p-2 w-full rounded mt-1"
                value={startDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            <label className="block mb-4 text-start">
              End Date:
              <input
                type="date"
                className="border p-2 w-full rounded mt-1"
                value={endDate}
                min={startDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>

            <label className="block mb-4 text-start">
              Reason:
              <input
                type="text"
                className="border p-2 w-full rounded mt-1 outline-none"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write Reason"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setAddModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnavailabilityStatus;
