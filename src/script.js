const locButton = document.querySelector('#loc').addEventListener('click', getLocation)
const searchCity = 
document.querySelector('#search').addEventListener('submit',(e)=>{
    e.preventDefault();
    consultWeatherAPI();
    
})


async function consultWeatherAPI(){
    const cityName = document.querySelector('#search-input').value
    
    if(cityName !== ''){
        
        const apiKey = 'd12b5fe3a462b838f87c0005340dd54c'
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

        const result = await fetch(apiUrl);
        const json = await result.json()

        if(json.cod === 200){
            showAlert('');
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                description: json.weather[0].description,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                humidity: json.main.humidity,
                wind: json.wind.speed                
            })                
        }else{
            showAlert('Não foi possível encontrar cidade')
        }
    }
}



function getLocation(){
    navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
                                       
            const apiKey = 'd12b5fe3a462b838f87c0005340dd54c'
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    
            const result = await fetch(apiUrl);
            const json = await result.json();

            if(json.cod === 200){
                showAlert('');
                showInfo({
                    city: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    tempIcon: json.weather[0].icon,
                    description: json.weather[0].description,
                    tempMax: json.main.temp_max,
                    tempMin: json.main.temp_min,
                    humidity: json.main.humidity,
                    wind: json.wind.speed                        
                })                
                } else{
                showAlert('Não foi possível encontrar cidade')
            }               
            
    })
}



function showInfo(json){
    document.querySelector('#weather').classList.add('show')
    
    document.querySelector('#cityLocation').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp-value').innerHTML = `${json.temp}<sup>°C</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-max').innerHTML = `${json.tempMax}°C`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin}°C`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.wind}Km/h`;
}

function showAlert(msg){
    document.querySelector('#alert').innerHTML= msg;
    document.querySelector('#weather').classList.remove('show')
}


