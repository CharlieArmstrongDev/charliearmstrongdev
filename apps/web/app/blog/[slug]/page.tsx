import React from 'react';
import { notFound } from 'next/navigation';

// Mock data for now since we don't have the actual lib files
const getPostBySlug = async (slug: string) => {
  // Mock implementation - replace with actual data fetching
  const mockPosts = [
    { slug: 'first-post', title: 'First Blog Post', content: 'This is my first blog post.' },
    { slug: 'second-post', title: 'Second Blog Post', content: 'This is my second blog post.' }
  ];
  
  return mockPosts.find(post => post.slug === slug) || null;
};

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage: React.FC<BlogPostProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose prose-lg">{post.content}</div>
    </article>
  );
};

export default BlogPostPage;