import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css";

import providers from './providers'

const MapWorld = () =>{
    const [center, setCenter] = useState({lat: 13.084622, lng: 80.248357});
    const zoomLevel = 9;
    const mapRef = useRef();

    return (
    <>
        <div className="leaflet-container"> 
            <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
                <TileLayer url = {providers.maptiler.url}></TileLayer>
            </MapContainer>

        </div>
    </>
    )
}

export default MapWorld;