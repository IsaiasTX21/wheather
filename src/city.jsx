import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function City() {
    const [countries, setcontries] = useState("")
    const [ImageUrl, setImageUrl] = useState("")
    const navigate = useNavigate()
    const { cities } = useParams()
    const [search, setseach] = useState("")

    async function weather() {
        const country = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=be00bdbb8614d81ed01492b2dee1184e&units=metric`)
            .then((data) => data.json())
            .then((data) => setcontries(data))
    }

    async function fetchImage() {
        const response = await fetch(` https://api.unsplash.com/search/photos?query=${cities}s&client_id=8I0zAPLYTXryJZpUPB1imQz0BeT1blruWMqgdhuUPIE`)
        const objects = await response.json()
        setImageUrl(objects.results[5])
        console.log(objects)

    }
    const background = ImageUrl ? ImageUrl.urls.regular : "https://images.unsplash.com/photo-1583978618388-c9726a050ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDUzNzV8MHwxfHNlYXJjaHw0fHxyaW8lMjBkZSUyMGphbmVpcm9zfGVufDB8fHx8MTczODcxOTM2Nnww&ixlib=rb-4.0.3&q=80&w=1080"
    const icon = countries.weather ? countries.weather[0].icon : ""

    useEffect(() => {
        weather()
        fetchImage()
    }, [cities])


    function city() {
        navigate(`/city/${search}`)
    }

    return (

        <>
            <div id='back' style={{ height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${background})` }} >
                <div className=' painel row  d-flex container  m-auto'>
                    <div className='position-relative text-center'>
                        <input onChange={(e) => setseach(e.target.value)} style={{ position: "relative", height: "37px", width: "200px", display: "inline" }} className='form-control m-auto mt-5'></input>
                        <button onClick={city} style={{ Width: "300px", position: "relative", bottom: "2px" }} className='btn btn-primary'>search</button>

                        <br />

                        <p className='display-6'> <img id="icon" src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" /> {countries.main ? countries.main.temp : "Waiting"}ºC</p>
                        <p className='display-6'> <img id='icon2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE2UlEQVR4nO2czW8bRRiHB0qrig8JqESBQzyDKhDhyB/AEcS1FDhQIjyrSlxB0EtFBIITohTimTRwQEiccgAJ7YYIDqUCFD7M+oAru/XyJQGVaVGTGe/EhUiLJrVD1BInduyddybzSO8pm2jmfXZm7N2fgpDH4/F4PB6Px+PxDJnKmcYDca3xZlxPqnE9aXWqGteS4/G5c+O+4SOiWq3uievJVKXWWKnUk+x/q6Z/1nirXC7v9iKG3PxKrfHZho2/phqfeglDZPXO33Lzk66EE8Mcw47e83tuOxvXP9+fPXu/6fFbj76TB2h+piuuJW+YHr/1VGrJmYEF1Bs/mB6/9cT1RA4uIBGmx289gza/0ikEnCBSTxdDdRhBxWUBdH75AA1TuVrzywcQRFwVMDmZXR9E6ekgUpkuGqVfHZrNdiFouCqARur5bvPX1XMIGps1+MQHH/YsBJDiJ+37aJSqqwXQMG0/M9eG9TzLOQFZdt36refaSk/raxAUXBNQDNXhjZvfXQnqKQQFlwQc+Ti7MYjU75sJ0NfoaxEEXDqEaaRe3ELzr1SoXkAQcEXAxKlsL43Uha0K0Nfq3zE9bmcEFLew94M8C1wRQEM1N4CAOdPjduYQpqFq9isgCNWfpsftjIAgSkX/AtIl0+N2R0Co4r4FRKpsetzOCKChemmALeiY6XG7cwjPL94ehOqvPgRcnPjo0q2mx+2MAA2daz0aROnK5s1PV2jYegRBwCUBaxJ6r4SLYJrvogDNs+HibZ0zoXzl01EqglB9p/d8ENvOegiXWa+65eH3exbyeAFWA30FBNBTDS4LoDakGkYtYLNCOz3V4KoAakuqwUUBRZtSDc4JyCxLNbh2CBdtSzW4JOCIjakGlwRQG1MNrgiYsDXV4MohXLQ11eCKAGprqsEhAU0rUw2uCAhsTTW4cggHtqYaXBFAbU01OCNg3tJUgysCrE01uHIIW5tqcE2AdamGgZnNdmEujm5XAObiqP5bpqdjFYVS607C5MJ2m0+6xeTC2EzrLtPzsgIytXQvYfLnoTWfd1YCE78WmAD3/4NApSr0XTqK5pO1lSB+wyVVQEAAlap4aDK7gXD59ciaz9ckxOOz2R6jk4WYqsBcHBt583l3O5KvIcOASlWsbj1cqPwEiL/H3r5EjEwWYqoCMzGVV/PJf/UOMgG0VEXhvWwvZnLRgIDWeKl5M8oZcKkKwsVBA83PdBW4fDK3iUJNVWAmSqYEYC4ZyhGQqYpcPnryDQQw+U0uk4ScqiBcnDclgDDxB8oJsKkKwsSyQQHLKCfApiowE5fNnQGijXICbKoCM3nB3BkgmignwKYqMBffmtuC5ALKCbCpCsLljDEBXE6jnACbqsBMPmFMQEk8hnICbKpi/+vnb8Jcyp3wKIJCTVWY+DaMmeTIACBTF
                        eRduR8zKXJrPhdtk2/GQKYqMBeTOa6Al41MEjIPzmS7CZefj/7ul19AeCUJkrunlvYRLn8cnQDxyz1c3mF6nqAZmxbjulEjEPATxFgK3JXAxKmhbTtMfqkPetP
                        zsgq9T2MuX93OwzrMRZsw+Yrf87eBTi8QJk/282UNcyn153xIISzrWf3GPC0f189v9Fs0/SRTr45ONTtv1qYJl4f0tabH6/F4PB6Px+PxeDwoJ/4FX+/E2waV3fUAAAAASUVORK5CYII=" alt="dew-point"></img> {countries.main ? countries.main.humidity : "Waiting"}%</p>
                        <p className='display-6'> <img src="https://img.icons8.com/?size=100&id=pLiaaoa41R9n&format=png&color=000000"></img>  {countries.main ? Number(countries.wind.speed * 3, 6).toFixed(2) : "Waiting"}Km/h</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default City
