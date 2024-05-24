import React from 'react'

interface LinkProps {
    to: string;
    children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, children }) => {
    return (
        <a href={to} className="underline">
          {children}
        </a>
      );
}

export default Link