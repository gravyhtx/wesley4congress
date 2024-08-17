'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
import { CustomMarquee } from '@/components/CustomMarquee';
import { Countdown } from '@/components/Countdown';
import { config } from '@/config';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleWords, setTitleWords] = useState<ReactNode[]>([]);
  const [showSubheader, setShowSubheader] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [logoState, setLogoState] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [showMelissa, setShowMelissa] = useState(false);
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const [wesleyState, setWesleyState] = useState(0);

  const delay = 400
  
  useEffect(() => {
    const words = [<>YOUR&nbsp;</>,<>VOTER&nbsp;</>,<>RIGHTS&nbsp;</>,<>ARE&nbsp;</>,<>UNDER&nbsp;</>,<>ATTACK!</>];
  
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setTitleWords(prevWords => [...prevWords, words[currentIndex]]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setShowSubheader(true);
        setShowGif(true);
        setShowButton(false);
        setShowMarquee(true);
        setTimeout(() => setShowButton(true), 1000);
      }, 500);
    }
  }, [currentIndex, delay]);  

  const handleKickWesleyOut = () => {
    setLogoState(1);
    setWesleyState(1);
    setTimeout(() => setLogoState(2), 500);
    setTimeout(() => {
      setLogoState(3);
      setShowGif(false);
      setShowMarquee(false);
      setShowMelissa(true);
      setTimeout(() => setShowRestOfPage(true), 1000);
    }, 1000);
  };

  const wesleyImage = wesleyState === 0 ? '/billionaires4wesley.gif' : '/bye-bye-wesley.png';

  const logoSpring = useSpring({
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0%)' },
    delay: 2500,
  });

  const melissaSpring = useSpring({
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: showMelissa ? 'translateY(0%)' : 'translateY(100%)', opacity: showMelissa ? 1 : 0 },
    config: { tension: 280, friction: 60 },
  });

  const titleWordMap = titleWords.map((word, index) => (
    <span key={index} className="inline-block animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
      {word}
    </span>
  ))

  const buttonColor = showMelissa ? "bg-purple-700 hover:bg-purple-500 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black animate-pulse"

  const wesleyButton = typeof window !== 'undefined' && window.innerWidth > 768 ? "CLICK TO KICK WESLEY OUT OF CONGRESS!" : "TAP TO KICK WESLEY OUT OF CONGRESS!"

  const redblue = 
    <div className="">
      <p style={{textAlign: "center"}}>NOT A <span className="white-stroke" style={{color: "#ff0000", fontWeight: "900"}}>RED</span> OR A <span className="white-stroke" style={{color: "#0000ff", fontWeight: "900"}}>BLUE</span> PROBLEM BUT A <span className="white-stroke" style={{color: "#4f0088", fontWeight: "900"}}>PURPLE</span> SOLUTION</p>
    </div>

  const subheader = [
    <h2 key={0} className="md:text-4xl mb-0 animate-slide-in z-99 animate__animated animate__jello relative z-50">
      Billionaire-backed Republicans are trying to strip away your voting rights! Don&apos;t let billionaires silence your voice!
    </h2>,
    <h2 key={1} className="animate__animated animate__flipInY md:text-6xl text-xl mb-0 animate-slide-in z-index-99">
      <i>{`"We have more in common than what divides us!"`}</i>
    </h2>
  ]

  function timeToElection() {
    const difference = +new Date("2024-11-05T19:00:00") - +new Date();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  return (
    <main className="min-h-screen text-white overflow-hidden">
      <animated.div style={logoSpring} className="w-full flex justify-center p-4 absolute">
        <a href={config.links.melissaForCongress} target="_blank">
          <Image
            src={`/what-a-hunt-${logoState}.png`}
            alt="Wesley Hunt Logo"
            width={120}
            height={50}
            className={logoState === 3 ? 'hidden' : ''}
          />
          {logoState === 3 && (
            <Image
              className='animate__animated animate__swing'
              src="/melissa-logo.png"
              alt="Melissa for Congress Logo"
              width={120}
              height={50}
            />
          )}
        </a>
      </animated.div>

      <div className="container mx-auto px-5 py-20">
        <h1 className="text-5xl md:text-8xl font-bold text-center md:text-center py-2 md:py-6 pb-3 z-50 relative">
          {showMelissa ?
          <div className="animate__animated animate__rollIn">VOTE MELISSA FOR CONGRESS!</div>
          : <div className="">{titleWordMap}</div>}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 text-center">
          {showSubheader && (
              showMelissa ? subheader[1] : subheader[0]
          )}

          {showGif && (
            <div className="relative mt-[-2rem] md:mt-[-4rem] w-full md:h-[350px] h-[200px] animate__animated animate__tada">
              <Image
                src={wesleyImage}
                alt="Billionaires for Wesley"
                layout="fill"
                objectFit="contain"
                className="animate-fade-in"
              />
            </div>
          )}

          {showMelissa && (
            <animated.div style={melissaSpring} className="melissa mt-[-1rem] md:mt-[-2rem]">
              <Image
                src="/melissa-wins.png"
                alt="Melissa Wins"
                width={500}
                height={300}
                className="animate-glow"
              />
            </animated.div>
          )}
        </div>

        {showButton && (
          <button
            onClick={handleKickWesleyOut}
            className={"w-full text-2xl md:text-6xl mt-0 " + buttonColor + " font-bold py-4 px-4 rounded"}
          >
            {showMelissa ? redblue : wesleyButton}
          </button>
        )}

        {showButton && showMarquee && (
          <div className="mt-8 relative z-50">
            <div className="bg-purple md:text-xl border-2 m-0 text-center p-2 font-bold mb-2"><i>WESLEY HUNT IS BROUGHT TO YOU BY:</i></div>
            <CustomMarquee items={config.funders} />
          </div>
        )}

        {showRestOfPage && (
          <>
            <div className='mt-[4rem] text-center md:text-4xl text-xl italic'>
              <p className='leading-8 md:leading-[3rem]'>
              Elon Musk set up a website on behalf of Republicans to <b>TRICK</b> voters into thinking they were registering. We set up
              this website to <b>HELP</b> voters like you check your registration status and register to vote online. Don&apos;t let the
              Billionaire-Backed Republican Bullies silence your voice.
              <br/><br/>
              <b>Vote <span className='white-stroke text-blue md:text-5xl text-2xl' style={{color: "#0000ff", fontWeight: "900"}}>BLUE</span> all
              the way down the ballot...</b>
              </p>
              <p className='mt-6 md:text-5xl text-2xl'><b>
                <a href={config.links.melissaForCongress} target="_blank">
                  VOTE <u className='md:text-6xl text-3xl'>MELISSA MCDONOUGH</u> FOR CONGRESS!
                </a>
              </b></p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href={config.links.checkStatus} target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center text-3xl">
                Check Voter Status
              </a>
              <a href={config.links.registerOnline} target="_blank" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center text-3xl">
                Register to Vote
              </a>
            </div>

            <div className="mt-16 text-center">
              <div className='mb-8 p-6 bg-purple-700 rounded-lg'>
                <h3 className="text-3xl md:text-6xl font-bold mb-4">ELECTION DAY</h3>
                <p className="text-4xl mb-2">11/05/2024</p>
                <div className="text-[120px] mt-[-30px] mb-[-30px] font-bold">{timeToElection()}</div>
                <div className="text-4xl">DAYS</div>
              </div>
              <br/>
              <h2 className="text-5xl md:text-8xl text-center font-bold mb-10 underline">IMPORTANT DATES</h2>
              <br/>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(config.importantDates).map(([key, value]) => (
                  <Countdown key={key} date={value} />
                ))}
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className='hover:bg-purple-700 bg-purple-600 rounded-lg p-4'>
                <a href={config.links.checkStatus} target="_blank">
                  <h3 className="text-2xl font-bold mb-2">Check Your Status</h3>
                  <p className="text-lg">Ensure you&apos;re registered and ready to vote. It only takes a minute!</p>
                </a>
              </div>
              <div className='hover:bg-purple-700 bg-purple-600 rounded-lg p-4'>
                <a href={config.links.registerOnline} target="_blank">
                  <h3 className="text-2xl font-bold mb-2">Register Online</h3>
                  <p className="text-lg">Quick and easy online registration process. Make your voice heard!</p>
                </a>
              </div>
              <div className='hover:bg-purple-700 bg-purple-600 rounded-lg p-4'>
                <a href={config.links.updateRegistration} target="_blank">
                  <h3 className="text-2xl font-bold mb-2">Update Your Registration</h3>
                  <p className="text-lg">Keep your registration information up to date to avoid any issues on election day.</p>
                </a>
              </div>
              <div className='hover:bg-purple-700 bg-purple-600 rounded-lg p-4'>
                <a href={config.links.donate} target="_blank">
                  <h3 className="text-2xl font-bold mb-2">Donate Now</h3>
                  <p className="text-lg">Support the campaign and ensure every voice is heard. Your contribution matters!</p>
                </a>
              </div>
            </div>

          </>
        )}
      </div>

      {showMelissa && (<footer className="bg-purple-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          {config.footer.map((item, index) => (
            <p key={index} className="text-sm mb-2">{item}</p>
          ))}
        </div>
      </footer>)}
    </main>
  );
}
