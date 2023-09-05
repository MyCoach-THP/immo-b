import React, { useState, useRef, useEffect } from "react";
import { Marker, MapContainer, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css";

import providers from './providers'

const MapWorld = () =>{
    const [center, setCenter] = useState({lat: 0, lng: 0});
    const zoomLevel = 16;
    const mapRef = useRef();

    const getCoordinates = async (city, country) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city},${country}`);
        const data = await response.json();
        setCenter({lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon)});
    }

    useEffect(()=>{
        getCoordinates("paris", "france");
    },[])

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView([center.lat, center.lng], zoomLevel);
        }
    }, [center]);

    return (
    <>
        <div className="leaflet-container"> 
            <MapContainer center={center} zoom={zoomLevel} ref={mapRef}>
                <TileLayer url = {providers.maptiler.url}></TileLayer>
                <Marker position = {[center.lat, center.lng]} />
            </MapContainer>
        </div>
    </>
    )
}

export default MapWorld;
