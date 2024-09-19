import React from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour la redirection
import NavBar from '../component/navbar';
import Footer from '../component/footer/Footer';
import './HomePage.css'; 

function HomePage() {
  const navigate = useNavigate();

  // Fonction de routage vers la page de recherche(result)
  const handleNavigate = (filter) => {
    navigate('/result', { state: { filter } });
  };

  return (
    <div className="homepage">
      <NavBar />
      {/* Section principale avec les différents blocs */}
      <div className="main-content">
        <section className="hero-section">
          <h1>Bienvenue sur notre APP de Localisation</h1>
          <p>
            MyLocationApp vous permet de trouver facilement des installations sportives 
            accessibles près de chez vous. Découvrez les infrastructures disponibles dans votre ville !
          </p>
        </section>

        <section className="features-section">
          <div className="feature-block" onClick={() => handleNavigate('localisation')}> {/* Bouton de click */}
            <h3>Localisation Précise</h3>
            <p>
              Trouvez des installations sportives proches de chez vous grâce à la géolocalisation.
            </p>
          </div>

          <div className="feature-block" onClick={() => handleNavigate('handicap')}>
            <h3>Accessibilité Handicap</h3>
            <p>
              Filtrez les infrastructures accessibles aux personnes en situation de handicap.
            </p>
          </div>

          <div className="feature-block" onClick={() => handleNavigate('equipement')}>
            <h3>Types d'Équipements</h3>
            <p>
              Explorez différents équipements sportifs, du football au tennis en passant par la pétanque, disponibles dans votre région.
            </p>
          </div>
        </section>

        <section className="how-it-works">
          <h2>Comment ça fonctionne ?</h2>
          <p>
            1. Entrez votre ville ou votre localisation.<br />
            2. Choisissez le type d'équipement que vous recherchez.<br />
            3. Consultez la carte et les résultats pour trouver les installations sportives à proximité.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
