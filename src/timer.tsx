import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: Date;
    onComplete?: () => void;
}

export default function Timer({ targetDate, onComplete }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();


            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true
                });
                onComplete?.();
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
                isExpired: false
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    if (timeLeft.isExpired) {
        return <div>Время вышло! 🎉</div>;
    }

    return (
        <>
            <div className="container">
                <div className="wedding__timer-wrapper">
                    <h2 className='wedding__timer-title'>До свадьбы осталось:</h2>
                    <div className="wedding__timer-tablo tablo1">
                        <div className="wedding__timer-sub">
                            <span>Дней:</span>
                            <span>{timeLeft.days}</span>
                        </div>
                        <div className="wedding__timer-sub">
                            <span>Часов:</span>
                            <span>{timeLeft.hours}</span>
                        </div>
                        <div className="wedding__timer-sub">
                            <span>Минут:</span>
                            <span>{timeLeft.minutes}</span>
                        </div>
                        <div className="wedding__timer-sub">
                            <span>Секунд:</span>
                            <span>{timeLeft.seconds}</span>
                        </div>
                    </div>
                </div >
            </div></>
    );
};