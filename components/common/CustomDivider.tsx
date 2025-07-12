import React from 'react';

export default function CustomDivider({
  className = '',
}) {
  return (
    <div
      className={`h-px w-full bg-gray-300 dark:bg-gray-700 my-10 ${className}`}
      role="separator"
    />
  );
}