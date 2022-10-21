import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, handleCityChange}) => {
  console.log("cities?",cities);
  
  
  return (
    <div className='menu-container'>
        <Button  variant={`${setCity==''? "outline-primary" : "primary"}`} onClick={() => handleCityChange("current")}>Current Location</Button>
        
        {cities.map((city, index)=>( //리액트에서 자바스크립트를 쓰고싶으면 {}를 쓴다. 
          // 수백개의 api를 가져와야할수있으므로 수작업을하기보단 배열함수를 써서 한꺼번에 출력해준다.
          <Button variant={`${setCity==city? "outline-primary" : "primary"}`} key={index} onClick={()=>handleCityChange(city)}>{city}</Button> 
        ))}
    </div>
  )
}

export default WeatherButton