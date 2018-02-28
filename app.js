// const latlng = document.getElementById("location");

const getCurrentLatLng = () => {

    if (!navigator.geolocation) {
        document.getElementById('latitude').innerHTML = "<p>Geolocation is not supported by your browser</p>";
    }

    const success = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById('latitude').innerHTML = `Latitude: ${lat}°`
        document.getElementById('longitude').innerHTML = `Longitude: ${lng}°`;

        getLocationText(lat, lng);
    }

    const error = () => {
        document.getElementById('latitude').innerHTML = '<p>Unable to retrieve your location</p>';
    }

    document.getElementById('latitude').innerHTML = '<p>Locating...</p>';

    navigator.geolocation.getCurrentPosition(success, error);
}

const getLocationText = (lat, lng) => {
    const latlng = new google.maps.LatLng(lat, lng);

    new google.maps.Geocoder().geocode({'latLng' : latlng}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {

          const city = results[1].address_components[2].long_name;
          const country = results[1].address_components[5].long_name;

          document.getElementById('city').innerHTML = `City: ${city}`;
          document.getElementById('country').innerHTML = `Country: ${country}`;
        }
    });
}

const getLocationLatLng = () => {
    const address = 'St Andrews, uk';

    new google.maps.Geocoder().geocode({address: address}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location);
        }
    });


};

//getCurrentLatLng();

getLocationLatLng();

// https://jsfiddle.net/orf71jvL/25/
// https://jsfiddle.net/moj3bbrs/12/ - use this one!