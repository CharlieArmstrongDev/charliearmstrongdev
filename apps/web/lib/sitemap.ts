// Utility functions for sitemap generation
export const baseUrl = 'https://charliearmstrongdev.com';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastModified?: Date;
}

export interface ProjectData {
  slug: string;
  title: string;
  lastModified?: Date;
}

// Mock data for blog posts (replace with actual data fetching)
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // This would normally fetch from your database or CMS
  return [
    {
      slug: 'first-post',
      title: 'First Blog Post',
      date: '2024-01-15',
      lastModified: new Date('2024-01-15'),
    },
    {
      slug: 'second-post',
      title: 'Second Blog Post',
      date: '2024-01-20',
      lastModified: new Date('2024-01-20'),
    },
  ];
};

// Mock data for projects (replace with actual data fetching)
export const getProjects = async (): Promise<ProjectData[]> => {
  // This would normally fetch from your database or CMS
  return [
    {
      slug: 'project-one',
      title: 'Project One',
      lastModified: new Date('2024-01-10'),
    },
    {
      slug: 'project-two',
      title: 'Project Two',
      lastModified: new Date('2024-01-25'),
    },
  ];
};

export const formatDateForSitemap = (date: Date): string => {
  return date.toISOString();
};
