import React from 'react';
import PostCard from '@/components/domain/blog/post-card';

// Mock data for now since we don't have the actual API
const getBlogPosts = async () => {
  // Mock implementation - replace with actual data fetching
  return [
    { 
      slug: 'first-post', 
      title: 'First Blog Post', 
      excerpt: 'This is my first blog post excerpt.',
      date: '2025-05-28'
    },
    { 
      slug: 'second-post', 
      title: 'Second Blog Post', 
      excerpt: 'This is my second blog post excerpt.',
      date: '2025-05-27'
    }
  ];
};

const BlogPage = async () => {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard 
            key={post.slug} 
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;