import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountdownProps {
  date: {
    title: string;
    date: Date;
  };
}

export const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft());

  function getTimeLeft() {
    const difference = +date.date - +new Date();
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    };
    return timeLeft;
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Card className="countdown w-[350px] text-center border-2 bg-purple text-white w-full">
      <CardHeader className="mt-6 mb-2 p-0">
        <CardTitle className="text-xl"><u>{date.title}</u></CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{date.date.toLocaleDateString()}</p>
        <div className="flex flex-col items-center justify-between mt-2">
          <div className="text-center">
            <p className="text-8xl font-bold">{timeLeft.days}</p>
            <p className="text-3xl">DAYS</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};