const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const url2 = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const key = '&key=AIzaSyDHcVGI8CyLBANatV-Y3ESj2Zk8i3Ac6lQ';

const getLatLng = (address) => {
    fetch(url + address + key)
    .then((resp) => resp.json())
  .then((data) => {
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;

    document.getElementById('latitude').innerHTML = `Latitude: ${lat}`;
    document.getElementById('longitude').innerHTML = `Longitude: ${lng}`;

    getCity(`${lat}, ${lng}`);
  });
}

const getCity = (latlng) => {
    fetch(url2 + latlng + key)
    .then((resp) => resp.json())
    .then((data) => {

        let city = undefined;
        let country = undefined

        data.results.forEach((result) => {
            if (!city && result.types[0] === 'locality') {
                result.address_components.forEach((component) => {
                    if (component.types[0] === 'locality') {
                        city = component.long_name;
                        city = (city === 'Saint Andrews') ? 'St Andrews' : city;
                    }
                })
                country = result.formatted_address.split(', ');
                country = country[country.length-1];
            }
        });

        city = (!city) ? 'Sorry, couldn\'t find that location' : city;
        country = (!country) ? 'Sorry, couldn\'t find that location' : country;

        document.getElementById('city').innerHTML = `City: ${city}`;
        document.getElementById('country').innerHTML = `Country: ${country}`;

        getWeather(latlng);

    });
}

const getWeather = (latlng) => {

    const api_key = 'b8dd631acbadd85a95decbd1abeee667';
    // const lat = '56.339775';
    // const lng = '-2.796721';
    // const weather_url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + api_key + '/' + lat + ',' + lng; // + '?exclude=minutely,hourly,alerts,flags&units=uk2';
    const weather_url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + api_key + '/' + latlng + '?exclude=minutely,alerts,flags&units=uk2';

    fetch(weather_url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            current = data.currently;
            current = {
                day: moment().format('ddd'),
                temperature: Math.round(current.temperature),
                icon: current.icon,
                summary: current.summary,
                windBearing: current.windBearing,
                windSpeed: Math.round(current.windSpeed),
                rainProbability: Math.round(current.precipProbability * 100)
            };
            console.log(current);

            let count = 0;
            daily = data.daily.data.slice(0, 4);
            daily = daily.map((day) => {
                count++;
                return {
                    day: moment().add(count, 'days').format('ddd'),
                    temperature: Math.round((day.temperatureHigh + day.temperatureLow) / 2),
                    icon: day.icon,
                    summary: day.summary,
                    windBearing: day.windBearing,
                    windSpeed: Math.round(day.windSpeed),
                    rainProbability: Math.round(day.precipProbability * 100)
                };
            });
            daily.unshift(current);
            console.log(daily);
        });
};

// getWeather();

document.getElementById('text-search').onclick = () => {
    let address = document.getElementById('search-input').value;
    address = address.split(' ').join('+');
    if (address.length > 0) {
        getLatLng(address)
    } else {
        alert('Please enter an address');
    }
};

document.getElementById('current-search').onclick = () => {
    if (!navigator.geolocation) {
        document.getElementById('latitude').innerHTML = "<p>Geolocation is not supported by your browser</p>";
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);

            document.getElementById('latitude').innerHTML = `Latitude: ${lat}`;
            document.getElementById('longitude').innerHTML = `Longitude: ${lng}`;

            getCity(`${lat}, ${lng}`);
        });
    }
};