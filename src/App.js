import logo from './logo.svg';
import {useEffect} from "react";
import {useState} from "react";
import WeatherBox from './component/WeatherBox';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";



// 1. 앱이 실행되자마자(useEffect)유저는 현재 위치의 날씨를 볼 수 있다. (지역, 온도, 날씨 상태)
// 2. 유저는 다른 도시의 버튼을 볼 수 있다. (현재 도시, 4개 도시)
// 3. 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.
// 4. 유저는 데이터가 로딩될때 로딩 스피너를 볼 수 있다.
// 5. 현재위치버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.

function App() {
  //App이 필요한 모든것 (함수 등)을 가지고 있고 단지 보내주기만 한다.
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities=['paris', 'new york', 'tokyo', 'seoul']

  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat,lon); //getWeatherByCurrentLocation함수호출시 lat,lon을 가져감
    });
  };

  const getWeatherByCurrentLocation = async(lat,lon) =>{
    
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cbad99bc36092e26ae2673b0fe90061b&units=metric`;
    let response = await fetch(url);
    setLoading(true); //url을 fetch할때 로딩창이 뜨도록 (true일때는 보이고 false일때는 안보임)
    let data = await response.json();  
    setWeather(data);
    setLoading(false);
    console.log("현재날씨는?", data);
  }

  const  getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cbad99bc36092e26ae2673b0fe90061b&units=metric`
    let response = await fetch(url);
    setLoading(true);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  // const handleCityChange = (city)=>{
  //   if(city==="current"){
  //     setCity(null);
  //   }else{
  //     setCity(city);
  //   }
  // }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity('');
    } else {
      setCity(city);
    }
  };


  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city])
  

  
  return (
    <div>
      {loading?(
      <div className='container'>
      <ClipLoader
        color="#2962ff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
      />
      </div>):(<div className='container'>
      <WeatherBox weather={weather}></WeatherBox>
      <WeatherButton cities={cities} setCity={city} handleCityChange={handleCityChange}></WeatherButton>
      </div>)
      }
        
    </div>
  );
}

export default App;
