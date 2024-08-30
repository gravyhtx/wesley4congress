import React from 'react';
import Marquee from 'react-fast-marquee';

interface MarqueeItemProps {
  company: string;
  amount: string;
}

const parseAmount = (amount: string): number => {
  return Number(amount.replace(/[^0-9.-]+/g, ""));
};

const calculateGlow = (amount: number): string => {
  const scaleFactor = 40000; // Adjust this factor to scale the glow appropriately
  const glowSize = Math.min(2 + amount / scaleFactor, 5); // Max glow size to prevent overly large shadows
  const opacity = Math.min(0.5 + amount / 50000, 1); // Adjust the glow opacity scaling
  return `0 0 ${glowSize}px rgba(255, 255, 255, 1)`;
};

const MarqueeItem: React.FC<MarqueeItemProps & { index: number }> = ({ company, amount, index }) => {
  const numericAmount = parseAmount(amount);
  const glow = calculateGlow(numericAmount);

  return (
    <div className="mx-4 marquee">
      <h3 className={`text-lg ` + (index % 2 === 0 ? `opacity-90` : `opacity-100`)}><b>{company}</b></h3>
      <div 
        className="text-4xl" 
        style={{ textShadow: glow }}
      >
        {amount}
      </div>
    </div>
  );
};

interface MarqueeProps {
  items: MarqueeItemProps[]; // No need to omit key or index here
  speed?: number;
}

export const CustomMarquee: React.FC<MarqueeProps> = ({ items, speed=50 }) => (
  <Marquee className="bg-purple py-2" gradient={false} speed={speed}>
    {items.map((item, index) => (
      <MarqueeItem key={index} index={index} company={item.company} amount={item.amount} />
    ))}
  </Marquee>
);