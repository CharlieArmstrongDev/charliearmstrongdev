import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  link,
}) => {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">{description}</p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <a href={link} className="text-blue-500 hover:text-blue-800">
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
