import { useEffect, useState, type ChangeEvent } from 'react'
import './App.scss'
import Timer from './timer.tsx'
import RingSrc from './assets/welcome/ring.png';
import HandSrc from './assets/welcome/hand.png';
import RingsSrc from './assets/plan/wedding_rings.svg'
import PhotoSrc from './assets/plan/wedding_photo.svg'
import PartySrc from './assets/plan/wedding_party.svg'
import { sendToBot } from './api.ts';
import { WeddingAnniversary } from './afterTimer.tsx';





function App() {
  const [alco, setAlco] = useState({ wine: false, vodka: false, cognac: false, whiskey: false, whish: '', music: '' })
  const onClickSendMessage = () => {
    const dat = new Date(Date.now())
    const message = JSON.stringify(alco)
    sendToBot(`${dat}, --------${message}--------`)
    setAlco({ ...alco, wine: false, vodka: false, cognac: false, whiskey: false, whish: '', music: '' })
  }

  useEffect(() => {
    const dat = new Date(Date.now())
    const message = JSON.stringify('Тук-тук. Кто-то зашел на ваш сайт')
    sendToBot(`${dat}, --------${message}--------`)
  }, [])

  const [isNavAnimationEnd, setIsNavAnimationEnd] = useState(false)
  const [isWelcomeAnimationEnd, setIsWelcomeAnimationEnd] = useState(false)
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const [isExpired, setIsExpired] = useState(false)
  const onNavAnimationEndSetIsNavAnimationEnd = () => {
    setTimeout(() => {
      setIsNavAnimationEnd(true)
    }, 1000)
  }
  const onWelcomeAnimationEndSetIsWelcomeAnimationEnd = () => {
    setTimeout(() => {
      setIsWelcomeAnimationEnd(true)
    }, 1000)
  }


  const liItemClassList = isNavAnimationEnd
    ? 'header__item '
    : 'header__item pointer-events-none'

  const navigation = isMobile
    ? <nav>
      <ul className='header__list-mobile container'>
        <li className="header__item-mobile"><a href="#plan">Мероприятия</a></li>
        <li className="header__item-mobile"><a href="#whishes">Пожелания</a></li>
        <li className="header__item-mobile"><a href="">Фотогалерея</a></li>
      </ul>
    </nav>

    : <nav>
      <ul className='header__list container'>
        <li className={liItemClassList} onAnimationEnd={onNavAnimationEndSetIsNavAnimationEnd}><a href="#plan">Мероприятия</a></li>
        <li className={liItemClassList} onAnimationEnd={onNavAnimationEndSetIsNavAnimationEnd}><a href="#whishes">Пожелания</a></li>
        <li className={liItemClassList} onAnimationEnd={onNavAnimationEndSetIsNavAnimationEnd}><a href="">Фотогалерея</a></li>
      </ul>
    </nav>



  const content = isExpired
    ? <h1>Это случилось!</h1>
    : <>
      {isWelcomeAnimationEnd && <header className='header__container'>
        {navigation}
      </header>}

      {!isWelcomeAnimationEnd && (
        <section className='hero__section section'>
          <div className="container hero__container">
            <h1 className="hero__title" onAnimationEnd={onWelcomeAnimationEndSetIsWelcomeAnimationEnd}>Дорогие Родители, Братья, Сестры, Тёти, Дяди, Друзья! Судьба свела наши сердца…
              Теперь мы хотим, чтобы вы стали свидетелями того,
              как две истории становятся одной..общей <span className='heart'>&#129505;</span></h1>
          </div>
        </section>
      )}



    </>

  const currentCounter = isExpired
    ? < WeddingAnniversary weddingDate={new Date('2025-09-06T12:30:00')} />
    : <Timer targetDate={new Date('2025-09-06T12:30:00')} onComplete={(() => setIsExpired(true))} />


  return (
    <>
      <div className="pad">
        <img src={HandSrc} alt="" className='Hand' height={100} />
        <img src={RingSrc} alt="" className='Ring' height={100} />
      </div>
      <div className='top-wrapper container'>{content}</div>
      {isWelcomeAnimationEnd && <section className='welcome__section'>
        <div className="welcome__container container">
          <h2>Добро пожаловать на наш свадебный сайт!</h2>
          <p>Здесь начинается история одного большого праздника, в центре которого — наша любовь и счастье. Именно здесь мы хотим поделиться своей радостью с вами, дорогими друзьями и близкими людьми, пригласив вас стать частью нашего особенного события.

            Мы постарались создать уютное пространство, где каждый сможет почувствовать себя желанным гостем. Здесь вы найдете всю необходимую информацию о предстоящей свадьбе, включая программу мероприятия, рекомендации по дресс-коду и даже полезные советы для гостей.

            Будьте готовы окунуться в атмосферу романтики, искренности и настоящего семейного тепла. Пусть наши сердца будут открыты друг другу, а улыбки останутся светлыми воспоминаниями навсегда.

            Радостно ждем встречи с каждым из вас в самый важный день нашей жизни!</p>
        </div>
      </section>}

      <div className="main-wrapper">
        {isWelcomeAnimationEnd && currentCounter}
        {isWelcomeAnimationEnd && <section className='plan__section'>
          <div className="container">
            <div className="plan__container">
              <h2 className='plan__title' id='plan'>План мероприятия:</h2>
              <div className="plan-block">
                <div className="event-wrapper">
                  <div className="time"><span >12:30 - 13:00</span>
                    <a href="https://yandex.ru/profile/1085877303?lang=ru" target='_blank'>Локация <span>&#128205;</span></a>
                  </div>
                  <img src={RingsSrc} alt="" height={40} />
                  <div className="description">
                    <h3 className="event">Роспись</h3>
                    <p>Самая официальная часть</p>
                  </div>
                </div>
                <div className="event-wrapper">
                  <div className="time"><span >13:00 - 14:30</span>
                    <a href="https://yandex.ru/profile/1085877303?lang=ru" target='_blank'>Локация <span>&#128205;</span></a>
                  </div>
                  <img src={PhotoSrc} alt="" height={40} />
                  <div className="description">
                    <h3 className="event">Фотосессия</h3>
                    <p>Сфоткаешь?</p>
                  </div>
                </div>
                <div className="event-wrapper">
                  <div className="time"><span >15:30 - ... &#128512;</span>
                    <a href="https://yandex.ru/profile/1085877303?lang=ru" target='_blank'>Локация <span>&#128205;</span></a>
                  </div>
                  <img src={PartySrc} alt="" height={40} />
                  <div className="description">
                    <h3 className="event">Туса-Джуса</h3>
                    <p>Небольшой фуршет и начало веселья</p>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </section >}
        {
          isWelcomeAnimationEnd && <section className='whishes__section' id='whishes'>
            <div className="container">
              <div className="whishes__container">
                <h2>Взаимные пожелания</h2>
                <div className="we-wrapper">
                  <h3>Мы - вам</h3>
                  <form>
                    <h4>Чего-бы вы хотели накатить ? <br /><span>Один человек отправляет одно пожелание</span> </h4>
                    <div className="checkbox">
                      <input type="checkbox" id='wine' value='wine' onChange={((event: ChangeEvent<HTMLInputElement>) => setAlco({ ...alco, wine: event.target.checked }))} checked={alco.wine} />
                      <label htmlFor="wine">Винчика</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" id='vodka' value='vodka' onChange={((event: ChangeEvent<HTMLInputElement>) => setAlco({ ...alco, vodka: event.target.checked }))} checked={alco.vodka} />
                      <label htmlFor="vodka">Водочки</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" id='cognac' value='cognac' onChange={((event: ChangeEvent<HTMLInputElement>) => setAlco({ ...alco, cognac: event.target.checked }))} checked={alco.cognac} />
                      <label htmlFor="cognac">Коньячку</label>
                    </div>
                    <div className="checkbox">
                      <input type="checkbox" id='whiskey' value='whiskey' onChange={((event: ChangeEvent<HTMLInputElement>) => setAlco({ ...alco, whiskey: event.target.checked }))} checked={alco.whiskey} />
                      <label htmlFor="whiskey">Вискарика</label>
                    </div>
                    <textarea id='most' placeholder='Доп. пожелания по алкоголю' className='wide-input' autoComplete='off' onChange={((event: ChangeEvent<HTMLTextAreaElement>) => setAlco({ ...alco, whish: event.target.value }))} value={alco.whish} />
                    <h4>Что вам поставить послушать?   <br /><span>Когда муз.аппаратура будет под нашим контролем </span> </h4>
                    <textarea id='most' placeholder='Любимые песни &#9198; &#9199; &#9197;' className='wide-input' autoComplete='off' onChange={((event: ChangeEvent<HTMLTextAreaElement>) => setAlco({ ...alco, music: event.target.value }))} value={alco.music} />
                    <button type='button' onClick={onClickSendMessage}>Отправить пожелание </button>
                  </form>
                </div>
                <div className="you-wrapper">
                  <h3>Вы - нам <br />
                    <span>Немного душных правил 😆</span></h3>
                  <ul>
                    <li><span>🚬</span> <span className="rule">Курение в шатре</span> <span>❌</span></li>
                    <li><span>🏊‍♂️</span> <span className="rule">Купание пьяным</span> <span>❌</span> </li>
                    <li><span>&#x1F935;</span> <span className="rule">Сдержанный наряд</span> <span>✅</span></li>
                    <li><span>&#127870;</span> <span className="rule">Хорошее настроение </span><span>✅</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        }
      </div>

      {isWelcomeAnimationEnd && <section className='report__section'>
        <div className="report__container container">
          <h2>Фотогалерея</h2>
          <div className="report-wrapper">
            <p>В этом разделе будет ссылка на фотографии с нашими счастливыми лицами, но после свадьбы &#128523;</p>
            <button type='button' disabled>Временно неактивная ссылка  &#8599; </button>
          </div>


        </div>
      </section>}





    </>




  )
}




export default App







