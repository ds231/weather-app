const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};

const showPosition = (position) => {

    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    console.log(lat, long);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            const city = data.results[0].address_components[2].short_name;
            const country = data.results[0].address_components[5].long_name;

            document.getElementById('location').innerHTML = `Location: ${city}, ${country}`;
            console.log(`Location: ${city}, ${country}`);
        })
        .catch((e) => {
            console.log('Error:', e);
            getLocation();
        });
};

const getWeather = (lat, long) => {

    const apiKey = 'b8dd631acbadd85a95decbd1abeee667';
    const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}?exclude=minutely,hourly,alerts,flags&units=uk2`;
    // const options = {
    //     headers: {
    //         "Accept-Encoding": "gzip"
    //     },
    //     dataType: "jsonp",
    //     url: url
    // };

    // $.ajax({
    //         headers: {
    //             "Accept-Encoding": "gzip"
    //         },
    //         dataType: "jsonp",
    //         url: url,
    //         success: function(data, status, xhr) {
    //             console.log(data);
    //         }
    //     });

    // fetch(url, options)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         console.log(data);
    //     });

    //     var request = new Request('https://davidwalsh.name/some-url', {
//     headers: new Headers({
//         'Content-Type': 'text/plain'
//     })
// });

// fetch(request).then(function() { /* handle response */ });

    const request = new Request(url, {
        headers : new Headers({
            'Accept-Encoding': 'gzip'
        }),
        dataType: 'jsonp'
    });

    fetch(request)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log('Error:', e);
        });



};

$(document).ready(function() {

    getLocation();
    getWeather(56.337719199999995, -2.7939183);

});

// For fetch() see: https://jsfiddle.net/bseqsz94/
// For CORS errors see: https://darksky.net/dev/docs/faq