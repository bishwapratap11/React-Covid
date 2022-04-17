import './App.css';
import Card from './Components/Card';
import axios from 'axios';
import {useState, useEffect} from 'react'

import Map from './Components/Map';
function App() {
  const [countries, setCountries] = useState([])
  const [caseType, setCaseType] = useState('cases')
  const [zoom, setZoom] = useState(3)
  const [selectedCountry, setSelectedCountry] = useState([])
  const [mapCenter, setMapCenter] = useState({lat:28.3973623, long:84.12576})
  const handleCountry = async (e) => {
    const value = e.target.value;
    const url = value === 'all' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${value}`;
    const res = await axios.get(url)
    if (value === 'all') {
      setSelectedCountry(res.data)  
      setZoom(3)
    }
    else{
      setSelectedCountry(res.data)
      setMapCenter({
        lat:res.data.countryInfo.lat,
        long:res.data.countryInfo.long
      })
      setZoom(7)
    }
  }

  useEffect(()=> {
    const getall = async () => {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries')
        setCountries(response.data)
        
    }
    getall();

  }, [])

  useEffect(()=> {
    const fetch = async () => {
      const res = await axios.get('https://disease.sh/v3/covid-19/all')
      setSelectedCountry(res.data)
        
    }
    fetch();

  }, [])
  return (
    <div className="container">
      <div className='row pt-4 pb-4'>
          <div className='col-7'>
            <h4>Covid Tracker</h4>
          </div>
          <div className='col-5'>
            <select name="Countryfilter" id="Countryfilter" className='form-select' onChange={handleCountry}>
              <option value='all'>Worldwide</option>
                {
                  countries.map((country, index) => {
                    return <option value={country.countryInfo.iso2} key={index}>{country.country}</option>
                  })
                }
            </select>
          </div>
      </div>
       <div className='row '>
          <Card title="Total Case" number={selectedCountry.cases} color='#C7F5EB'  cases='cases' setCaseType={setCaseType}/>
          <Card title="Recovered" number={selectedCountry.recovered} color='#FFE5F4'  cases='recovered' setCaseType={setCaseType} />
          <Card title="Active Case" number={selectedCountry.active} color='#C7F5EB'  cases='active' setCaseType={setCaseType} />
          <Card title="Total Death" number={selectedCountry.deaths} color='#C7F5EB'  cases='deaths' setCaseType={setCaseType} />
       </div>

       <div className='row pt-2'>

         <div className='col-md-12' style={{height:'500px'}}>
                <Map zoom={zoom} center={mapCenter} countries={countries} caseType={caseType}/>
         </div>
         {/* <div className='col-md-5'>
           <div className='row position-relative all-country-row' style={{height:'500px', overflowY:'auto'}}>
                <div className='col-12 pt-2 pb-2 position-sticky top-0 bg-warning'>
                    All Country
                </div>
                
                  
                  {
                  countries.map((country, index) => {
                    return <div className='col-12 d-flex justify-content-between bg-light pt-2 pb-2 mb-1'>
                        <span className=''>{index+1}. {country.country}</span>
                        <span className='text-secondary'>{country.cases}</span>
                      </div>
                  })
                }
           </div>
         </div> */}
       </div>
    </div>
  );
}

export default App;
