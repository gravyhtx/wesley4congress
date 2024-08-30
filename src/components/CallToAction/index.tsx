import React from 'react';
import { config } from '../../config';

interface ActionCardProps {
  title: string;
  description: string;
  link: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, link }) => (
  <div className='hover:bg-purple-700 bg-purple-600 rounded-lg p-4 hover:shadow-purple'>
    <a href={link} target="_blank">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </a>
  </div>
);

export const CallToAction: React.FC = () => {
  const actions = [
    {
      title: 'Check Your Status',
      description: "Ensure you're registered and ready to vote. It only takes a minute!",
      link: config.links.checkStatus,
    },
    {
      title: 'Register Online',
      description: 'Quick and easy online registration process. Make sure your voice is heard!',
      link: config.links.registerOnline,
    },
    {
      title: 'Update Your Registration',
      description: 'Keep your Texas voter registration info up to date to avoid any issues on election day.',
      link: config.links.updateRegistration,
    },
    {
      title: 'Donate Now',
      description: 'Support the campaign and ensure every voice is heard. Your contribution matters!',
      link: config.links.donate,
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {actions.map((action, index) => (
        <ActionCard
          key={index}
          title={action.title}
          description={action.description}
          link={action.link}
        />
      ))}
    </div>
  );
};