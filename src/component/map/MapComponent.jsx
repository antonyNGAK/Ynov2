import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'

// Icône par défaut pour les marqueurs Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ latitude = 46.603354, longitude = 1.888334, city = 'France', zoomLevel = 6 }) => {
  const mapRef = useRef();

  useEffect(() => {
    //  on recentre et on zoome sur la carte
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      mapInstance.setView([latitude, longitude], zoomLevel); 
    }
  }, [latitude, longitude, zoomLevel]);

  return (
    <MapContainer
      center={[46.603354, 1.888334]} // Coordonnées par défaut (France)
      zoom={6} // Niveau de zoom initial
      style={{ height: '500px', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance; // On stocke l'instance de la carte pour pouvoir la manipuler
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {/* Affichage du marqueur seulement si les coordonnées sont fournies */}
      {latitude && longitude && (
        <Marker position={[latitude, longitude]}>
          <Popup>{city}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
