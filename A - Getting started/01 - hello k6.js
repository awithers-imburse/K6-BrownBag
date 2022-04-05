import http from 'k6/http';

// docker run -v ${pwd}:/mnt loadimpact/k6 run "/mnt/A - Getting started/01 - hello k6.js"


export default function() {
    http.get('https://www.google.co.uk');
}


