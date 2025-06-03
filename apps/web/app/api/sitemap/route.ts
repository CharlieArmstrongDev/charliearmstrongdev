import { NextResponse } from 'next/server';
import { getBlogPosts, getProjects, baseUrl } from '../../../lib/sitemap';

export async function GET() {
  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  const staticPages = [
    { url: baseUrl, lastmod: new Date().toISOString(), priority: '1.0' },
    {
      url: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      priority: '0.8',
    },
    {
      url: `${baseUrl}/projects`,
      lastmod: new Date().toISOString(),
      priority: '0.8',
    },
    {
      url: `${baseUrl}/sign-in`,
      lastmod: new Date().toISOString(),
      priority: '0.3',
    },
    {
      url: `${baseUrl}/sign-up`,
      lastmod: new Date().toISOString(),
      priority: '0.3',
    },
  ];

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: (post.lastModified || new Date()).toISOString(),
    priority: '0.7',
  }));

  const projectPages = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastmod: (project.lastModified || new Date()).toISOString(),
    priority: '0.6',
  }));

  const allPages = [...staticPages, ...blogPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
