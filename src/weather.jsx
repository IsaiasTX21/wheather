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
            <div  style={{ height:"100vh", backgroundRepeat:"no-repeat", backgroundSize:"cover",backgroundImage: `url(https://images.unsplash.com/photo-1583978618388-c9726a050ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDUzNzV8MHwxfHNlYXJjaHw0fHxyaW8lMjBkZSUyMGphbmVpcm9zfGVufDB8fHx8MTczODcxOTM2Nnww&ixlib=rb-4.0.3&q=80&w=1080)` }} >
            <div  style={{maxWidth:"400px"}}  className=' painel row  d-flex container  m-auto'>
                <div className='position-relative text-center'>
                    <input placeholder="New York, Rio de Janeiro , etc..." onChange={(e)=> setseach(e.target.value) } style={{ position:"relative" ,height: "37px",  width: "200px", display: "inline" }} className='form-control m-auto'></input>
                    <button onClick={city} style={{  Width: "300px", position:"relative", bottom:"2px"}} className='btn btn-primary'>search</button>
                        <br/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wheather
