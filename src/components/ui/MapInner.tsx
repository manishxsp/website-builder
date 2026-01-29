'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapProps {
    latitude: number;
    longitude: number;
    popupText?: string;
    height?: string;
    className?: string;
}

const MapInner = ({ latitude, longitude, popupText, height = '400px', className }: MapProps) => {
    return (
        <div style={{ height, width: '100%' }} className={className}>
            <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', zIndex: 10 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={icon}>
                    {popupText && <Popup>{popupText}</Popup>}
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapInner;
