import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import MapData from './MapData';


const ChangeMapView = ({center, zoom}) => {
    const map = useMap();
    map.setView([center.lat, center.long], zoom)
    return null
}

const Map = ({zoom, center, countries, caseType}) => {
    console.log(center);
    console.log(zoom);
    console.log(caseType);
  return (
    <MapContainer style={{height:'100%'}} zoom={zoom} center={[center.lat, center.long]}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
                  countries.map((country, index) => {
                    return <MapData country={country} key={index} caseType={caseType} />                 
            
                  })
          }
          <ChangeMapView center={center} zoom={zoom} />
    </MapContainer>
  )
}

export default Map