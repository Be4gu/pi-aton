/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://piñaton.com', // con la ñ
  generateRobotsTxt: true, // crea /robots.txt
  priority: null, // usa rules abajo
  changefreq: null,
  sitemapSize: 50000,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://piñaton.com/sitemap-video.xml' // cuando esté listo
    ]
  },
  transform: async (config, url) => {
    // Aquí puedes fijar reglas custom por patrón de URL
    const rules = [
      { test: /^\/$/, changefreq: 'daily', priority: 1.0 },
      { test: /^\/wiki.*$/, changefreq: 'daily', priority: 1.0 },
      { test: /^\/tienda$/, changefreq: 'weekly', priority: 0.9 },
      { test: /^\/profiles\/\d+$/, changefreq: 'weekly', priority: 0.8 }
    ]
    const rule = rules.find((r) => r.test.test(url)) || { changefreq: 'weekly', priority: 0.5 }
    return {
      loc: url,
      changefreq: rule.changefreq,
      priority: rule.priority,
      lastmod: new Date().toISOString()
    }
  }
}
