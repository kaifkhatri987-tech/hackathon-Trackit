
import React, { useMemo } from 'react';

interface AvatarProps {
  name: string;
  image?: string;
  themeColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, image, themeColor, size = 'md', className = '' }) => {
  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 
    'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 
    'bg-cyan-500', 'bg-fuchsia-500', 'bg-orange-500', 'bg-teal-500'
  ];

  const bgColor = useMemo(() => {
    if (themeColor) return themeColor;
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }, [name, themeColor]);

  const initial = name.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-32 h-32 text-4xl'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md font-black text-white ${image ? '' : bgColor} ${className}`}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
};

export default Avatar;
