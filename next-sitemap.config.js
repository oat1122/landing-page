/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://xn--o3c1bj3b4bj8cd.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
