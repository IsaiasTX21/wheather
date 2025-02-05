import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wheather from './weather';
import City from './city';
function App() {


  return (
    <>
<BrowserRouter>
<Routes>
<Route path='' element={<Wheather/>} ></Route>
<Route path='/city/:cities' element={<City/>} ></Route>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
