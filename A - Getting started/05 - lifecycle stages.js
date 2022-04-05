

export function setup() {
  // One-time setup code. The full K6 API is available to us here...
  // const someResult = http.get('https://localhost:5000/login');

  return { authHeader: "Bearer " + "<mock-bearer-token>" };
}


export default function(data) {
  // ... test code goes here ...
}


export function teardown(data) {
  // One-time teardown code
  console.log("teardown says: " + JSON.stringify(data));
}

