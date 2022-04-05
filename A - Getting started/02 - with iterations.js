import http from 'k6/http';

// docker run -v ${pwd}:/mnt loadimpact/k6 run "/mnt/A - Getting started/02 - with iterations.js"


export const options = {
  iterations: 10
};


export default function() {
    http.get('https://www.google.co.uk');
}
