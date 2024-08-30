import React from 'react';

interface ElectionDayProps {
  daysUntilElection: number;
}

export const ElectionDay: React.FC<ElectionDayProps> = ({ daysUntilElection }) => {
  const calculateGlow = (days: number): string => {
    const maxGlow = 10; // maximum glow at 0 days
    const minGlow = 0; // minimum glow at 100+ days
    const glow = Math.min(maxGlow, Math.max(minGlow, maxGlow - Math.log(days) * 2));
    return `0px 0px ${glow}px rgba(255, 255, 255, 1)`;
  };

  return (
    <div className='mb-8 p-6 bg-purple-700 rounded-lg'>
      <h3 className="text-3xl md:text-6xl font-bold mb-4">ELECTION DAY</h3>
      <p className="text-4xl mb-2">11/05/2024</p>
      <div 
        className="text-[120px] mt-[-30px] mb-[-30px] font-bold" 
        style={{ textShadow: calculateGlow(daysUntilElection) }}
      >
        {daysUntilElection}
      </div>
      <div className="text-4xl">DAYS</div>
    </div>
  );
};
