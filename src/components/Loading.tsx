import React from 'react';

interface LoadingProps {
  fullscreen?: boolean;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  text = '加载中...',
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}; 