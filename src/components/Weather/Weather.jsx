import { useState } from "react";
import styles from './Weather.module.css';

export default function Weather(){
    const[zipCode,setZipCode] = useState('');
    const[weekData,setWeekData] = useState([]);
    const[weatherIcon,setWeatherIcon] = useState('');
    const[show,setShow] = useState(false);
    const[date,setDate] = useState('');
    const[text,setText] = useState('');

    const KEY = "0d03b6d879384011a6e61150251004";

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const zipCodeVal = Number(zipCode);
            const currentWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${zipCodeVal}&days=7`);
        
            if(!currentWeather.ok){
                setShow(false);
                alert("Invalid Zip code");
                return;
            }
            const data = await currentWeather.json();
            // console.log('forcastdat :',data.forecast.forecastday[0].day.condition.icon);
            setWeekData(data.forecast.forecastday);
            // console.log('data',data);
            // console.log('weekdata',weekData);
            setWeatherIcon(weekData[0].day.condition.icon);
            setDate(weekData[0].date);
            setText(weekData[0].day.condition.text);
            // console.log(weatherIcon);
            // setData(weekData);
            setShow(true);
        } catch (err) {
            console.error(err.message);
        }
    }


    return <div>
        
        <h2>Weather Api</h2 >
    
         <div id="currentWeather">
            <form id="formId" onSubmit={handleSubmit} className={styles.form}>
                <input type="text" name="zipCode" onChange={(e)=>{
                                        setZipCode(e.target.value);
                                        setShow(false); }} placeholder="Enter zipcode" required/>
                <input type="submit" value="getData" className={styles.button}/>
                {show && 
                <div className={styles.data}>
                    <div>{date}</div>
                    <img src={weatherIcon} alt={weatherIcon}/>
                    <div>{text}</div>
                </div>}
            </form>
        </div>
    
    </div>
}