import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup, Marker, useMap } from 'react-leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const MapData = ({country, caseType='cases'}) => {
    
    const casesTypeColors = {
        cases: {
          hex: "blue",
          rgb: "rgb(204, 16, 52)",
          half_op: "rgba(204, 16, 52, 0.5)",
          multiplier: 350,
        },
        recovered: {
          hex: "green",
          rgb: "rgb(125, 215, 29)",
          half_op: "rgba(125, 215, 29, 0.5)",
          multiplier: 300,
        },
        active: {
            hex: "orange",
            rgb: "rgb(125, 215, 29)",
            half_op: "rgba(125, 215, 29, 0.5)",
            multiplier: 400,
        },
        deaths: {
          hex: "red",
          rgb: "rgb(251, 68, 67)",
          half_op: "rgba(251, 68, 67, 0.5)",
          multiplier: 2000,
        },
    };
    console.log(caseType, casesTypeColors[caseType].multiplier, casesTypeColors[caseType].hex);
    
  return (
      <Marker position={[country.countryInfo.lat, country.countryInfo.long]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{color: casesTypeColors[caseType].hex,
            fillColor: casesTypeColors[caseType].hex}}
            radius={ 
                Math.sqrt(country[caseType] / 10 ) * casesTypeColors[caseType].multiplier
            }
            fillOpacity={0.1}
        />
        <Popup>
            <div className='container-fluid' style={{width:'200px'}}>
                <div className='row'>
                    <div className='col-12 pt-2 pb-2'>
                        <img src={country.countryInfo.flag} alt=""  style={{width:'100%'}}/>
                    </div>
                    <div className='col-12'>
                        <h4>{country.country}</h4>
                    </div>
                    <div className='col-12'>
                        <strong>Total Cases:</strong> <span> {country.cases}</span>
                    </div>
                    <div className='col-12'>
                    <strong>Total Deaths:</strong> <span> {country.deaths}</span>
                    </div>
                    <div className='col-12'>
                    <strong>Total Recovered:</strong> <span> {country.recovered}</span>
                    </div>
                    <div className='col-12'>
                    <strong>Active Cases:</strong> <span> {country.active}</span>
                    </div>
                </div>
                
            </div>
        </Popup>

      </Marker > 
  )
}

export default MapData