import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    // Change the value of countDownEndDate to the day you want to end the count down
    const countDownEndDate = new Date('November 1, 2023 09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = countDownEndDate - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
      } else {
        const days = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24)))
          .toString()
          .padStart(2, '0');
        const hours = String(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
          .toString()
          .padStart(2, '0');
        const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)))
          .toString()
          .padStart(2, '0');
        const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000))
          .toString()
          .padStart(2, '0');

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-content">
      <div className="time days">
        <span className="number">{countdown.days}</span>
        <span className="text">days</span>
      </div>
      <div className="time hours">
        <span className="number">{countdown.hours}</span>
        <span className="text">hours</span>
      </div>
      <div className="time minutes">
        <span className="number">{countdown.minutes}</span>
        <span className="text">minutes</span>
      </div>
      <div className="time seconds">
        <span className="number">{countdown.seconds}</span>
        <span className="text">seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
