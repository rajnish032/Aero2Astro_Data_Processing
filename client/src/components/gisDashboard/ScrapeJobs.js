"use client";

import { useEffect, useState } from 'react';
import { requestUrl } from "../../utils/constants.js";
import ShimmerJobs from '../ShimmerJobs.jsx';


export default function ScrapeJobs() {
  const [query, setQuery] = useState('Geospatial, Drone Pilot, Gis Data Processing');
  const [location, setLocation] = useState('India');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState({});

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${requestUrl}/jobs/saved?query=${encodeURIComponent(query)}&maxJobs=100`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
        setSources({});
      }
    } catch (err) {
      console.error('Error fetching saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchScrapedJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${requestUrl}/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&maxJobs=100`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
        setSources(data.sources);
      }
    } catch (err) {
      console.error('Error fetching scraped jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job role..."
          className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md bg-white shadow-sm"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md bg-white shadow-sm"
        />
        <button
          onClick={fetchScrapedJobs}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button
          onClick={fetchSavedJobs}
          className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full transition"
        >
          View More Jobs
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <ShimmerJobs key={i} />)}
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found try different location.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.jobUrl} className="bg-white p-5 shadow-md rounded-xl hover:shadow-lg transition-all">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
                <span className="text-sm text-gray-500">{job.source}</span>
              </div>
              <p className="text-gray-700 mt-1 font-medium">{job.company}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-600">{job.experience || 'Experience not specified'}</p>
              <p className="text-sm text-gray-600">{job.salary}</p>
              <p className="text-sm mt-2 text-gray-700">
                {job.description.slice(0, 150)}...
              </p>
              <div className="mt-3 flex justify-between items-center">
                <a
                  href={job.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Job
                </a>
                <span className="text-xs text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}