'use client';

import React from 'react';

const ErrorPage: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-lg text-gray-700">{error.message}</p>
      <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
