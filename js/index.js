
const APP_ID = '816fe009dcdc34b2dc92cf44c33ea6d9'
const DEFAULT_VALUE = '--'

const searhInput = document.querySelector('#search-input')
const cityOptions = document.querySelectorAll('.city-option')
const container = document.querySelector('.container')
const nightBackground = document.querySelector('.night-mode')
const darkModeBtn = document.querySelector('.dark-mode-btn')

const cityName = document.querySelector('.city-name')
const weatherState = document.querySelector('.wheather-state')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')

const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')

darkModeBtn.addEventListener('click', () => {
    container.classList.toggle('night-mode')
    const icons = document.querySelectorAll('.dark-mode-btn .btn-icon')
    icons.forEach(icon => {
        icon.classList.toggle('hide')

    })
})

const whetherNow = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric&lang=vi`)
        .then( async response => {
            const data = await response.json() 
            cityName.innerHTML = data.name || DEFAULT_VALUE
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE
            humidity.innerHTML =data.main.humidity || DEFAULT_VALUE
            windSpeed.innerHTML = data.wind.speed || DEFAULT_VALUE
        })
}

searhInput.addEventListener('change', (e) => {
    whetherNow(e.target.value)
    e.target.value = ''
    searhInput.blur()
})

cityOptions.forEach(option => {
    const city = option.innerText
    option.addEventListener('click', () => {
        const activeCity = document.querySelector('.active')
        if (activeCity) activeCity.classList.remove('active')
        option.classList.add('active')
        whetherNow(city)
    })
})


(whetherNow('ha noi'))()
