import { useState, useEffect } from 'react';

interface WeddingAnniversaryProps {
    weddingDate: Date;
}

export function WeddingAnniversary({ weddingDate }: WeddingAnniversaryProps) {
    const [timePassed, setTimePassed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - weddingDate.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimePassed({
                    years: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            // Расчет лет с учетом високосных
            const startDate = new Date(weddingDate);
            let years = now.getFullYear() - startDate.getFullYear();

            // Проверяем, было ли уже день рождения в этом году
            const monthDiff = now.getMonth() - startDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
                years--;
            }

            // Для оставшихся дней создаем новую дату с учетом прошедших лет
            const lastAnniversary = new Date(
                startDate.getFullYear() + years,
                startDate.getMonth(),
                startDate.getDate()
            );

            const daysSinceAnniversary = Math.floor((now.getTime() - lastAnniversary.getTime()) / (1000 * 60 * 60 * 24));

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimePassed({
                years,
                days: daysSinceAnniversary,
                hours,
                minutes,
                seconds
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [weddingDate]);

    return (
        <div className="container">
            <div className="wedding__timer-wrapper">
                <h2 className='wedding__timer-title'>Мы женаты уже:</h2>
                <div className="wedding__timer-tablo done">
                    <div className="wedding__timer-sub">
                        <span>Лет:</span>
                        <span>{timePassed.years}</span>
                    </div>
                    <div className="wedding__timer-sub">
                        <span>Дней:</span>
                        <span>{timePassed.days}</span>
                    </div>
                    <div className="wedding__timer-sub">
                        <span>Часов:</span>
                        <span>{timePassed.hours}</span>
                    </div>
                    <div className="wedding__timer-sub">
                        <span>Минут:</span>
                        <span>{timePassed.minutes}</span>
                    </div>
                    <div className="wedding__timer-sub">
                        <span>Секунд:</span>
                        <span>{timePassed.seconds}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};