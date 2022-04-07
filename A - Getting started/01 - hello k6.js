import http from 'k6/http';


export default function() {
    http.get('https://www.google.co.uk');
}


// docker run -v ${pwd}:/mnt loadimpact/k6 run "/mnt/A - Getting started/01 - hello k6.js"


