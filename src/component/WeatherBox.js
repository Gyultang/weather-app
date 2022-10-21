import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?",weather)
  
  return (
    <div className='weather-box'>
        <div>{weather && weather.name}</div> 
        {/* weather?.name이랑 같다 */}
        <h2>{weather && `${weather.main.temp>0?Math.floor(weather.main.temp):weather.main.temp}`}°C</h2>
        <h3>{weather && weather.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox


