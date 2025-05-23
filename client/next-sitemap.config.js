/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://aero2-astro-data-processing.vercel.app', 
    generateRobotsTxt: true, 
    exclude: ['/admin/*', '/dashboard/*', '/pilot/*'], 
    changefreq: 'weekly', 
    priority: 0.8, 
  };
  