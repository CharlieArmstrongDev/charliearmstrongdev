import React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, date }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">
        <a href={`/blog/${slug}`} className="hover:underline">
          {title}
        </a>
      </h2>
      <p className="text-sm text-gray-600">{date}</p>
      <p className="mt-2 text-gray-800">{excerpt}</p>
    </div>
  );
};

export default PostCard;
