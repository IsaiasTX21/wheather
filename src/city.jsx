import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundwhether from "./cloud-4217442_1920.jpg";
import umidities from "./water_13136955.png"

function City() {
    const [countries, setCountries] = useState();
    const [imageUrl, setImageUrl] = useState(backgroundwhether);
    const [loader, setLoader] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const { cities } = useParams();

    // Função para buscar dados do clima
    async function weather() {
        setLoader(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=be00bdbb8614d81ed01492b2dee1184e&units=metric`);
        const data = await response.json();

        if (response.ok) {
            setCountries(data);
        } else {
            setCountries(null); // erro ou cidade não encontrada 
        }

        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }

    // Função para buscar imagem no Unsplash
    async function fetchImage() {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${cities}&client_id=8I0zAPLYTXryJZpUPB1imQz0BeT1blruWMqgdhuUPIE`);
        const objects = await response.json();
        const imageObj = objects.results[1]; // pega a segunda imagem

        if (imageObj?.urls?.regular) {
            setTimeout(() => {
                setImageUrl(imageObj.urls.regular);
            }, 1000);

            const img = new Image();
            img.src = imageObj.urls.regular;
            img.onload = () => {
                setImgLoaded(true);
            };
        } else {
            setImgLoaded(false);
        }
    }

    useEffect(() => {
        weather();
        fetchImage();
    }, [cities]);

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/city/${search}`);
        }
    };

    const background = imgLoaded ? imageUrl : backgroundwhether;
    const icon = countries?.weather ? countries.weather[0].icon : "";

    if (loader) {
        return (
            <div style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${imageUrl})` }} className='vh-100 d-flex justify-content-center align-items-center'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            id="back"
            style={{
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(${background})`
            }}
        >
            <div className='painel row d-flex container m-auto'>
                <div className='position-relative text-center'>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ height: "37px", width: "200px", display: "inline" }}
                        className='form-control m-auto mt-3'
                        placeholder="Search city..."
                    />
                    <button
                        onClick={handleSearch}
                        className='btn btn-primary mb-1'
                    >
                        Search
                    </button>

                    {countries === null && (
                        <div className="alert alert-danger text-center mt-4">
                            Cidade não encontrada. Tente novamente.
                        </div>
                    )}

                    {countries && (
                        <>
                            <div className='display-6 mt-4'>
                                <img id="icon" src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" />
                                {countries.main ? ` ${countries.main.temp}ºC` : "Waiting"}
                            </div>

                            <div className='display-6'>
                                <img
                                    id='icon2'
                                    src={umidities}
                                    alt="Humidity"
                                />
                                {countries.main ? ` ${countries.main.humidity}%` : "Waiting"}
                            </div>

                            <div className='display-6  mt-4'>
                                <img
                                   id='icon3'
                                    src="https://img.icons8.com/?size=100&id=pLiaaoa41R9n&format=png&color=000000"
                                    alt="Wind Speed"
                                />
                                {countries.wind ? ` ${(countries.wind.speed * 3.6).toFixed(2)} Km/h` : "Waiting"}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default City;
