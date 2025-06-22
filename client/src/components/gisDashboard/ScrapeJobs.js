"use client";

import { useEffect, useState } from 'react';
import { requestUrl } from "../../utils/constants.js";
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job role"
          className="p-2 border border-gray-300 rounded w-60"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="p-2 border border-gray-300 rounded w-60"
        />
        <button
          onClick={fetchScrapedJobs}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Scraping...' : 'Search & Scrape'}
        </button>
        <button
          onClick={fetchSavedJobs}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Jobs
        </button>
      </div>

      {Object.keys(sources).length > 0 && (
        <div className="text-center text-sm mb-4 text-gray-600">
          <p>Fetched from:</p>
          <div className="flex justify-center gap-4 mt-2">
            {['indeed', 'naukri', 'linkedin'].map((source) => (
              <span key={source} className="flex flex-col">
                <span
                  className={`font-medium ${
                    sources[source]?.status === 'Success'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {source.charAt(0).toUpperCase() + source.slice(1)}: {sources[source]?.status || 'N/A'} ({sources[source]?.count || 0} jobs)
                </span>
                {sources[source]?.error && (
                  <span className="text-xs text-red-500">{sources[source].error}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
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