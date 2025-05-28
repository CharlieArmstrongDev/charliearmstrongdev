import React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">
        <a href={`/blog/${slug}`} className="hover:underline">
          {title}
        </a>
      </h2>
      <p className="text-gray-600 text-sm">{date}</p>
      <p className="mt-2 text-gray-800">{excerpt}</p>
    </div>
  );
};

export default PostCard;