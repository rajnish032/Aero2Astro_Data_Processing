/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://dronepilots.aero2astro.com', 
    generateRobotsTxt: true, 
    exclude: ['/admin/*', '/dashboard/*', '/pilot/*'], 
    changefreq: 'weekly', 
    priority: 0.8, 
  };
  