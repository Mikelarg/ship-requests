import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import RoutineMachine from "./RoutineMachine";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import "leaflet/dist/leaflet.css";
import '../styles/Map.css'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [55.72578142274601, 37.6768037893193];

export default function Map() {
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={"flex grow"}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                className='map-tiles'
            />
            <RoutineMachine />
        </MapContainer>
    );
};