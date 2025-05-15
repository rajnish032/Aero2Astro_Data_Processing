"use client"
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';

const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
    shadowSize: [41, 41], 
    shadowAnchor: [12, 41] 
});

const { BaseLayer } = LayersControl;

const FlyToLocation = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13, {
                animate: true,
                duration: 2
            });
        }
    }, [position, map]);

    return null;
};

const MapView = () => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    
                },
                (error) => {
                    console.error("Error fetching geolocation: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div className="h-60 relative w-full bg-white p-2 shadow-md rounded">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="map-tile-layer"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                className="map-tile-layer"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          {position && <FlyToLocation position={position} />}
          {position && (
            <Marker position={position} icon={customIcon}>
              <Popup>
                You are here.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
}

export default MapView;
