import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {
  UilTemperature,
  UilTear,
  UilWind,
 UilSearch,
} from "@iconscout/react-unicons";
import { LocationOn } from '@mui/icons-material';



function App() {
  useEffect(() => {
    console.log("I have been mounted")
    if(navigator.geolocation){
      console.log('Geolocation is supported.')
    }else{
      console.log("Geolocation is not supported.")
    }
  }, [])
  const[data,setData] = useState({q: "berlin"})
  const[cityname, setCity] = useState('')
  const[position, setPosition] = useState('')

  


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=214f1ceb18253e2e5f55ec476e728fc1&units=imperial`

 
  const searchLocation = (event) =>{
    if(event.key === 'Enter' || cityname !== ""){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setCity('')
    }
  
  }
  const getCurrentLocation = (position) =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => { 
        let lon = position.coords.longitude; 
        let lat = position.coords.latitude; 
        console.log('latitude is: ' + lon);
        console.log('longitude is: '+ lat);
        const geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=214f1ceb18253e2e5f55ec476e728fc1&units=imperial`;
        axios.get(geolocationUrl).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setPosition('')
      })
    }
  }



  return (
    <div className="App">
    
      <div className='search flex justify-center shadow-xl outline-none mt-10'>
        <input 
        value={cityname} 
        onChange={event => setCity(event.target.value)} 
        placeholder = 'search city.....' 
        type='text'
        className='capitalize placeholder:lowercase mr-2'/>
        <LocationOn 
        size={25}
        onChange = {event => setPosition(event.target.value)}
        className= "cursor-pointer transition ease-out hover:scale-125"
        onClick = {getCurrentLocation}
        />
      <UilSearch
          size={25}
          onChange={event => setCity(event.target.value)} 
          className=" cursor-pointer transition ease-out hover:scale-125"
          onClick = {searchLocation}
        />
      </div>
      
      <div className="container flex flex-col items-center justify-center ml-11">
        <div className= "top">
          <div className = "location">
            <p className='text-3xl uppercase my-6'>{data.name}</p>
          </div>
          <div className='temp text-5xl ml-10'>
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className = "description font-semibold ml-11">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom flex items-center justify-center ml-11">
            <div className="feels m-2">
            <UilTemperature size={18} className="mr-1" />

              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p className='font-semibold'>Feels Like</p>
            </div>
            <div className="humidity m-2">
            <UilTear size={18} className="mr-1" />
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p className='font-semibold'>Humidity</p>
            </div>
            <div className="wind m-2">
            <UilWind size={18} className="mr-1" />
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p className='font-semibold'>Wind Speed</p>
            </div>
          </div>
        }

    </div>
</div>
  );
}

export default App;
