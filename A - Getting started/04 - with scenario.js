import http from 'k6/http';

// docker run -v ${pwd}:/mnt loadimpact/k6 run "/mnt/A - Getting started/04 - with scenario.js"


export const options = {
  
  scenarios: {

    brownBagDemo: {
      executor: 'per-vu-iterations',
      iterations: 10,
      vus: 5,
      maxDuration: '10s',
    },

    brownBagDemoFinale: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '5s', target: 10 },
        { duration: '3s', target: 0 },
      ],
      gracefulRampDown: '0s',
    }
  }
};

/******************************************************************************* 
 * shared-iterations     - iteration count fixed, VUs may not be utilised evenly
 * 
 * per-vu-iterations     - each VU executes fixed number of iterations
 * 
 * constant-vus          - fixed VU count over designated time period
 * 
 * ramping-vus           - define stages to ramp up and/or down
 * 
 * (...and more)
 *******************************************************************************/


export default function() {
    http.get('https://www.google.co.uk');
}

