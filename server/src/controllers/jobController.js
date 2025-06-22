import {
  scrapeIndeed,
  scrapeNaukri,
  scrapeLinkedIn,
} from "../service/scraperService.js";
import { Job } from "../models/job.model.js";

export const getJobs = async (req, res) => {
  try {
    const {
      query = "Geospatial",
      location = "India",
      maxJobs = 200,
    } = req.query;
    const maxPerSource = Math.ceil(maxJobs / 3); // Distribute jobs among sources

    // Step 1: Scrape from all sources in parallel with error handling
    const sourcePromises = [
      scrapeIndeed(query, location)
        .then((jobs) => ({
          source: "Indeed",
          status: "Success",
          data: jobs.slice(0, maxPerSource),
        }))
        .catch((error) => {
          console.error("Indeed scrape failed:", {
            message: error.message,
            stack: error.stack,
          });
          return {
            source: "Indeed",
            status: "Failed",
            data: [],
            error: error.message,
          };
        }),
      scrapeNaukri(query, location)
        .then((jobs) => ({
          source: "Naukri",
          status: "Success",
          data: jobs.slice(0, maxPerSource),
        }))
        .catch((error) => {
          console.error("Naukri scrape failed:", {
            message: error.message,
            stack: error.stack,
          });
          return {
            source: "Naukri",
            status: "Failed",
            data: [],
            error: error.message,
          };
        }),
      scrapeLinkedIn(query, location)
        .then((jobs) => ({
          source: "LinkedIn",
          status: "Success",
          data: jobs.slice(0, maxPerSource),
        }))
        .catch((error) => {
          console.error("LinkedIn scrape failed:", {
            message: error.message,
            stack: error.stack,
          });
          return {
            source: "LinkedIn",
            status: "Failed",
            data: [],
            error: error.message,
          };
        }),
    ];

    // Wait for all scraping promises to resolve
    const results = await Promise.all(sourcePromises);

    // Step 2: Combine and deduplicate jobs from successful sources
    const allJobs = results.flatMap((result) => result.data);
    const uniqueJobs = allJobs
      .reduce((acc, current) => {
        const exists = acc.some((job) => job.jobUrl === current.jobUrl);
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, [])
      .slice(0, maxJobs);

    // Step 3: Save or update each job
    await Promise.all(
      uniqueJobs.map((jobData) => {
        const { _id, ...cleanJobData } = jobData;
        return Job.findOneAndUpdate(
          { jobUrl: cleanJobData.jobUrl },
          cleanJobData,
          { upsert: true, new: true }
        );
      })
    );

    // Step 4: Fetch saved jobs for response
    const savedJobs = await Job.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
        { skills: new RegExp(query, "i") },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(maxJobs));

    // Step 5: Prepare source status summary
    const sourceStatus = results.reduce((acc, result) => {
      acc[result.source.toLowerCase()] = {
        status: result.status,
        count: result.data.length,
        ...(result.error && { error: result.error }),
      };
      return acc;
    }, {});

    // Final response
    res.json({
      success: true,
      count: savedJobs.length,
      data: savedJobs,
      sources: sourceStatus,
    });
  } catch (error) {
    console.error("Job scraping error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching jobs",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      sources: {},
    });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const { query, maxJobs = 100 } = req.query;
    const filter = query ? { $text: { $search: query } } : {};

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(maxJobs));

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching jobs from database",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
