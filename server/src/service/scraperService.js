import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { fetchWithProxy } from '../utils/proxyHelper.js';
import { Job } from '../models/job.model.js';

function extractSkills($, element) {
  const skills = [];
  const desc = (
    $(element).find('.job-snippet, .summary, .job-desc, .srp-desc, div[class*="desc"]').text().toLowerCase() || ''
  );
  const techKeywords = ['javascript', 'python', 'java', 'node', 'react', 'angular', 'sql', 'mongodb'];

  techKeywords.forEach(keyword => {
    if (desc.includes(keyword)) skills.push(keyword);
  });

  return skills;
}

export const scrapeIndeed = async (query, location) => {
  // Unchanged, as it’s working
  const url = `https://in.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`;

  try {
    const html = await fetchWithProxy(url, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'Referer': 'https://in.indeed.com/',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 60000
    });

    const $ = cheerio.load(html);
    const jobs = [];

    $('.job_seen_beacon, .cardOutline, .jobsearch-SerpJobCard').each((i, element) => {
      const job = {
        title: $(element).find('h2.jobTitle a, .jobTitle a, h2 a').text().trim(),
        company: $(element).find('.companyName, [data-testid="company-name"], .company').text().trim(),
        location: $(element).find('.companyLocation, [data-testid="text-location"], .location').text().trim(),
        salary: $(element).find('.salary-snippet, .salaryText, .attribute_snippet').text().trim() || 'Not disclosed',
        description: $(element).find('.job-snippet, .summary').text().trim(),
        postedDate: $(element).find('.date, .date-a11y').text().trim(),
        jobUrl: `https://in.indeed.com${$(element).find('h2.jobTitle a, .jobTitle a').attr('href') || ''}`,
        source: 'Indeed',
        skills: extractSkills($, element)
      };

      if (job.title) jobs.push(job);
    });

    console.log(`Scraped ${jobs.length} jobs from Indeed for query "${query}" in "${location}"`);
    return jobs;
  } catch (error) {
    console.error('Indeed scrape failed:', {
      message: error.message,
      url,
      stack: error.stack
    });
    throw error;
  }
};

export const scrapeNaukri = async (query, location) => {
  if (!query || !location || typeof query !== 'string' || typeof location !== 'string') {
    console.error('Invalid query or location provided');
    return [];
  }

  const url = `https://www.naukri.com/${encodeURIComponent(query.trim().replace(/\s+/g, '-').toLowerCase())}-jobs-in-${encodeURIComponent(location.trim().replace(/\s+/g, '-').toLowerCase())}`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for job listings to load
    await page.waitForSelector('article[class*="tuple"], div[class*="tuple"], .srp-jobtuple-wrapper, .jobTuple', { timeout: 10000 }).catch(() => {
      console.warn('Job container selector not found within timeout');
    });

    const html = await page.content();
    //console.log('HTML snippet:', html.substring(0, 500));

    const $ = cheerio.load(html);
    const jobs = [];

    $('article[class*="tuple"], div[class*="tuple"], .srp-jobtuple-wrapper, .jobTuple').each((i, element) => {
      const job = {
        title: $(element).find('a[class*="title"], .title a, .title').text().trim() || '',
        company: $(element).find('a[class*="company"], .comp-name, .company').text().trim() || '',
        location: $(element).find('span[class*="loc"], .locWdth, .location').text().trim() || '',
        salary: $(element).find('span[class*="salary"], .ni-job-tuple-icon-srp-rupee, .salary').text().trim() || 'Not disclosed',
        description: $(element).find('div[class*="desc"], .job-desc, .srp-desc').text().trim() || '',
        postedDate: $(element).find('span[class*="date"], .job-post-day, .date').text().trim() || '',
        jobUrl: $(element).find('a[class*="title"], .title a').attr('href') || '',
        source: 'Naukri',
        skills: extractSkills($, element)
      };

      if (job.title && job.company) jobs.push(job);
    });

    await browser.close();
    console.log(`Scraped ${jobs.length} jobs from Naukri for query "${query}" in "${location}"`);
    if (jobs.length === 0) {
      console.warn('No jobs found. Check selectors or ensure jobs exist for this query/location.');
      console.log('Job container count:', $('article[class*="tuple"], div[class*="tuple"], .srp-jobtuple-wrapper, .jobTuple').length);
    }
    return jobs;
  } catch (error) {
    console.error('Naukri scrape failed:', {
      message: error.message,
      url,
      stack: error.stack
    });
    return [];
  }
};


export const scrapeLinkedIn = async (query, location) => {
  if (!query || !location || query.trim() === '' || location.trim() === '') {
    throw new Error('Query and location must be non-empty strings');
  }

  const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(query.trim())}&location=${encodeURIComponent(location.trim())}`;

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Disable loading of images and stylesheets to speed up
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Check for CAPTCHA or login wall
    const isBlocked = await page.evaluate(() => {
      return !!document.querySelector('.checkpoint-container, .login-form, [data-test-id="challenge"]');
    });
    if (isBlocked) {
      console.error('LinkedIn scrape blocked: CAPTCHA or login wall detected');
      await browser.close();
      return [];
    }

    // Wait for job listings to load
    await page.waitForSelector('.jobs-search-results__list-item, .jobs-search__results-list li', { timeout: 15000 }).catch(() => {
      console.warn('LinkedIn job container selector not found within timeout');
    });

    // Scroll to load more jobs (LinkedIn uses infinite scroll)
    await page.evaluate(async () => {
      for (let i = 0; i < 2; i++) {
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });

    const html = await page.content();
    const $ = cheerio.load(html);
    const jobs = [];

    $('.jobs-search-results__list-item, .jobs-search__results-list li').each((i, element) => {
      const job = {
        title: $(element).find('a.job-card-list__title, .base-card__full-link, a[class*="job-title"]').text().trim() || '',
        company: $(element).find('.job-card-container__company-name, .base-search-card__subtitle').text().trim() || '',
        location: $(element).find('.job-card-container__metadata-item, .base-search-card__metadata').text().trim() || '',
        salary: $(element).find('.job-card-container__metadata-item--salary, .salary').text().trim() || 'Not disclosed',
        description: $(element).find('.jobs-description__content, .job-card-list__insight').text().trim() || '',
        postedDate: $(element).find('time, .job-card-container__footer-item, .posted-time-ago').text().trim() || '',
        jobUrl: $(element).find('a.job-card-list__title, .base-card__full-link').attr('href') || '',
        source: 'LinkedIn',
        skills: extractSkills($, element)
      };

      if (job.title && job.company && job.location) jobs.push(job);
    });

    await browser.close();
    console.log(`Scraped ${jobs.length} jobs from LinkedIn for query "${query}" in "${location}"`);
    if (jobs.length === 0) {
      console.warn('No jobs found. Check selectors or ensure jobs exist for this query/location.');
      console.log('Job container count:', $('.jobs-search-results__list-item, .jobs-search__results-list li').length);
      console.log('HTML snippet:', html.substring(0, 500));
    }
    return jobs;
  } catch (error) {
    if (browser) await browser.close();
    console.error('LinkedIn scrape failed:', {
      message: error.message,
      url,
      selectors: '.jobs-search-results__list-item, .jobs-search__results-list li',
      stack: error.stack
    });
    return [];
  }
};
 