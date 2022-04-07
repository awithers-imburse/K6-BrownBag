import http from 'k6/http';


export const options = {
  vus: 5,
  iterations: 10
};


export default function() {
    http.get('https://www.google.co.uk');
}


// docker run -v ${pwd}:/mnt loadimpact/k6 run "/mnt/A - Getting started/02 - with iterations.js"