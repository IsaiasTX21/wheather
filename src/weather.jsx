import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import worldImage from '../src/assets/worlds.png'; 

function Weather() {
  const [search, setSearch] = useState('');
  const [load, setload] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const newimg = new Image();
  newimg.src = worldImage;

  if (newimg) {
  setTimeout(()=> setload(true),1000); 
  } else {
   return   setload(false);
  }
}, []);

  const goToCity = () => {
    if (search.trim()) navigate(`/city/${search.trim()}`);
  };


   return(
<>
{load ? <div
        className="photoback position-relative"
        style={{
          backgroundColor: "black",
          height: '100vh',
          backgroundImage: `url(${worldImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
    <div className="painel">
          <input
            type="text"
            placeholder="New York, Rio de Janeiro..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToCity()}
            className="form-control m-auto"
         />
          <button onClick={goToCity} className="btn btn-primary mt-3">
            Search
          </button>
        </div>
         </div> : <div style={{ height: "100vh", position: "relative", backgroundColor: "black" }}>
        <Spin style={{ position: "absolute", left: "50%", top: "50%" }} size="large" />
      </div> }</>
   )


}

export default Weather;
