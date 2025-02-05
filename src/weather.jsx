import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Wheather() {
const [search, setseach] = useState("")
const navigate = useNavigate()
function city(){
navigate(`/city/${search}`)
}


    return (
        <> 
            <div  style={{ height:"100vh", backgroundRepeat:"no-repeat", backgroundSize:"cover",backgroundImage: `url(mehadi-hasan-Gg7hnEGT9XE-unsplash.jpg)` }} >
            <div  style={{maxWidth:"400px"}}  className=' painel row  d-flex container  m-auto'>
                <div className='position-relative text-center'>
                    <input onChange={(e)=> setseach(e.target.value) } style={{ position:"relative" ,height: "37px",  width: "200px", display: "inline" }} className='form-control m-auto'></input>
                    <button onClick={city} style={{  Width: "300px", position:"relative", bottom:"2px"}} className='btn btn-primary'>search</button>
                        <br/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wheather
