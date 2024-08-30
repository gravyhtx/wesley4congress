import React from 'react';
import Link from 'next/link';

interface FooterProps {
  items: [string, string, string][];
}

export const Footer: React.FC<FooterProps> = ({ items }) => {
  return (
    <footer className="bg-purple-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {items.map((item, index) => (
          <p key={index} className="item text-sm mb-2">
            <Link href={item[1]} target={item[2]}>
              {item[0]}
            </Link>
          </p>
        ))}
      </div>
    </footer>
  );
};