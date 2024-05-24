import React from 'react';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="px-7 py-2 bg-cyan-400 text-white rounded-md hover:bg-blue-600">
      {children}
    </button>
  );
};

export default Button;