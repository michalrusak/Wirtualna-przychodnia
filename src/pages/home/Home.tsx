import { useEffect } from "react";
import "./Home.scss";

const Home = () => {
  useEffect(() => {
    document.title = "Strona główna | Wirtulna przychodnia";
  });

  return (
    <div className="home">
      <section className="home__welcome">
        <h1 className="home__title">Witamy w naszej przychodni!</h1>
        <p className="home__paragraph">
          Cieszymy się, że odwiedziłeś naszą przychodnię. Jesteśmy gotowi do
          świadczenia kompleksowej opieki zdrowotnej dla Ciebie i Twojej
          rodziny. Nasza misja to zapewnić najwyższą jakość opieki medycznej,
          dbając o Twoje zdrowie.
        </p>
      </section>
      <section className="home__advantage">
        <h3 className="home__advantage-title">Doświadczona Kadra Lekarska</h3>
        <p className="home__description">
          Nasza przychodnia to zespół doświadczonych i wykwalifikowanych
          lekarzy, pielęgniarek i specjalistów, którzy zawsze są gotowi, by
          służyć Ci pomocą.
        </p>
      </section>
      <section className="home__advantage">
        <p className="home__description">
          Oferujemy szeroki zakres usług medycznych, począwszy od wizyt
          rodzinnych, przez diagnostykę, aż po opiekę specjalistyczną.
        </p>
        <h3 className="home__advantage-title">Kompleksowa Opieka</h3>
      </section>
      <section className="home__advantage">
        <h3 className="home__advantage-title">Nowoczesna Diagnostyka</h3>
        <p className="home__description">
          Nasza przychodnia jest wyposażona w najnowocześniejszy sprzęt
          diagnostyczny, co pozwala na szybką i dokładną diagnozę.
        </p>
      </section>
    </div>
  );
};

export default Home;
