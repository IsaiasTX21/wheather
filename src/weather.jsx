import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Weather() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const goToCity = () => {
    if (search.trim()) navigate(`/city/${search.trim()}`);
  };

  return (
    <div
      className="photoback"
      style={{ height: '100vh' }}
    >
      <div className="painel">
        <input
          type="text"
          placeholder="New York, Rio de Janeiro..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goToCity()}
          className="form-control m-auto "
        />
        <button onClick={goToCity} className="btn btn-primary mt-3">
          Search
        </button>
      </div>
    </div>
  );
}

export default Weather;
