import React from 'react';
import Marquee from 'react-fast-marquee';

interface MarqueeItemProps {
  company: string;
  amount: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({ company, amount }) => (
  <div className="mx-4">
    <h3 className="text-lg"><b>{company}</b></h3>
    <div className="text-4xl">{amount}</div>
  </div>
);

interface MarqueeProps {
  items: MarqueeItemProps[];
  speed?: number;
}

export const CustomMarquee: React.FC<MarqueeProps> = ({ items, speed=50 }) => (
  <Marquee className="bg-purple py-2" gradient={false} speed={speed}>
    {items.map((item, index) => (
      <MarqueeItem key={index} company={item.company} amount={item.amount} />
    ))}
  </Marquee>
);