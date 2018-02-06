const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

const showPosition = (position) => {

    const lat = position.coords.latitute;
    const long = position.coords.longitude;

    const positionUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long;

    const getLocationInfo = new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            success: (data) => resolve(data)
        })
    }).then((data) => {

        const city = data.results[0].address_components[2].long_name;
        const country = data.results[0].address_components[5].long_name;
        const currentLocation = `${city}, ${country}`;

        console.log(currentLocation);
    });
};

getLocation();

// For fetch() see: https://jsfiddle.net/bseqsz94/