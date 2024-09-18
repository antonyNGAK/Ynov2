import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importation de `useNavigate` pour la navigation
import MapComponent from '../component/map/MapComponent';
import NavBar from '../component/navbar';
import Footer from '../component/footer/Footer'; 
import './ResultPage.css'; 

function Result() {
  const [handicap, setHandicap] = useState(false);
  const [location, setLocation] = useState('');
  const [place, setPlace] = useState(''); 
  const [record, setRecord] = useState([]);
  const [mapData, setMapData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRequest();
  };

  async function handleRequest() {
    let url = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?';
    const params = {
      select: '*',
      limit: 15,
      offset: 0,
      lang: 'fr',
    };

    let conditions = [];

    // Conditions en fonction de l'entrée utilisateur
    if (location) {
      conditions.push(`inst_com_nom LIKE '%${location}%'`);
    }

    if (place) {
      conditions.push(`equip_type_name LIKE '%${place}%'`);
    }

    if (handicap) {
      conditions.push(`inst_acc_handi_bool = 'true'`);
    }

    if (conditions.length > 0) {
      params.where = conditions.join(' AND '); // Concaténation des conditions
    }

    const queryString = new URLSearchParams(params).toString();
    url += queryString;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecord(data.results);

      if (data.results.length > 0) {
        const firstResult = data.results[0];
        setMapData({
          city: firstResult.inst_com_nom,
          latitude: firstResult.inst_lat,
          longitude: firstResult.inst_long
        });
      } else {
        setMapData(null);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRowClick = (installation) => {
    navigate('/details', { state: { installation } });
  };

  return (
    <div className="result-page">
      {/* NavBar en haut */}
      <NavBar />

      {/* Contenu principal */}
      <div className="main-content">
        <h1>Recherche d'installations sportives</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <input
              type="text"
              id="ville"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Entrez une ville"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="equipement"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Type d'équipement (ex: tennis, football, etc.)"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={handicap}
                onChange={(e) => setHandicap(e.target.checked)}
              />
              Accessibilité handicap
            </label>
          </div>
          <button type="submit">Rechercher</button>
        </form>

        <h2>Résultats</h2>
        {record.length > 0 ? (
          <>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Code Postal</th>
                  <th>Ville</th>
                </tr>
              </thead>
              <tbody>
              {record.map((equipment, index) => (
                <tr key={index} onClick={() => handleRowClick(equipment)} style={{ cursor: 'pointer' }}>
                  <td>{equipment.inst_numero}</td>
                  <td>{equipment.inst_nom}</td>
                  <td>{equipment.inst_adresse}</td>
                  <td>{equipment.inst_cp}</td>
                  <td>{equipment.inst_com_nom}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Afficher la carte si les coordonnées sont valides */}
            {mapData && mapData.latitude && mapData.longitude && (
              <MapComponent 
                city={mapData.city}
                latitude={mapData.latitude}
                longitude={mapData.longitude}
              />
            )}
          </>
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Result;
