import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  footerContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  footerContent,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      {footerContent && <div className="border-t p-4">{footerContent}</div>}
    </div>
  );
};

export default Card;
