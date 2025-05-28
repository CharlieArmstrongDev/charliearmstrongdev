import React from 'react';
import { useQuery } from 'react-query';
import { getBlogPosts } from '../../lib/api'; // Adjust the import based on your API structure
import PostCard from '../../components/domain/blog/post-card';

const BlogPage = () => {
  const { data: posts, isLoading, error } = useQuery('blogPosts', getBlogPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog posts</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;