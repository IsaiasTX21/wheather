import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import world from '../src/assets/worlds.png';
import umidities from '../src/assets/rain.png';

function City() {
  const { cities } = useParams();
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState();
  const [imgReady, setImgReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=be00bdbb8614d81ed01492b2dee1184e&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
      
    } catch {
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  
  const fetchImage = async () => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${cities}&client_id=8I0zAPLYTXryJZpUPB1imQz0BeT1blruWMqgdhuUPIE`
      );
      const { results } = await res.json();
      const best = results[0];
=======
    async function fetchImage() {
        const response = await fetch(` https://api.unsplash.com/search/photos?query=${cities}s&client_id=8I0zAPLYTXryJZpUPB1imQz0BeT1blruWMqgdhuUPIE`)
        const objects = await response.json()
        setImageUrl(objects.results[1])
        console.log(objects)
>>>>>>> 83f0d26bf6fa0b077f62d0891f2199d33a443c65

      if (best?.urls?.regular) {
        const preload = new Image();
        preload.src = best.urls.regular;
        preload.onload = () => {
          setBackground(best.urls.regular);
          setImgReady(true);
        };
      } else {
        setBackground(world);
        setImgReady(false);
      }
    } catch {
      setBackground(world);
      setImgReady(false);
    }
  };


  useEffect(() => {
    setLoading(true);
    fetchWeather();
    fetchImage();

  }, [cities]);


  const handleSearch = () => {
    if (search.trim()) navigate(`/city/${search.trim()}`);
  };

  const iconCode = weatherData?.weather?.[0]?.icon;


  return (
    <div
      className="photoback d-flex justify-content-center align-items-center position-relative"
      style={{
        height: '100vh',
        backgroundImage: `url(${imgReady ? background : world})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {loading && (
       <div style={{ height: "100vh", position: "relative", backgroundColor: "black" }}>
        <Spin style={{ position: "absolute", left: "50%", top: "50%" }} size="large" />
      </div>
      )}

      {!loading && (
        <div className="painel">
      

          <div style={{display: 'flex' }}>

            <input
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="form-control m-auto"
            placeholder="Search city..."
          />
          <button onClick={handleSearch} className="btn btn-primary ">
            Search
          </button>
          </div>

    
          {weatherData === null && (
            <div className="alert alert-danger text-center mt-2">
              Cidade não encontrada. Tente novamente.
            </div>
          )}


          {weatherData && (
            <>
              <div>
                <img
                  id="icon"
                  src={`http://openweathermap.org/img/wn/${iconCode}.png`}
                  alt="Weather icon"
                />
                <span style={{ position: 'relative', left: '30px', fontSize: '24px' }}>
                  {weatherData.main?.temp.toFixed(1)}ºC
                </span>
              </div>

              <div>
                <img id="icon2" src={umidities} alt="Humidity" />
                <span style={{ position: 'relative', left: '50px', fontSize: '20px' }}>
                  {weatherData.main?.humidity}%
                </span>
              </div>

              <div className="mt-4 me-4">
                <img
                  id="icon3"
                  src="https://img.icons8.com/?size=100&id=pLiaaoa41R9n&format=png&color=000000"
                  alt="Wind speed"
                />
                <span style={{ position: 'relative', left: '50px', fontSize: '20px' }}>
                  {(weatherData.wind?.speed * 3.6).toFixed(2)} km/h
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default City;
