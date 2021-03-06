
// CSV:
// docker run -v ${pwd}:/mnt loadimpact/k6 run --out csv=/mnt/test_result.csv "/mnt/A - Getting started/03 - with scenarios.js"

// JSON:
// docker run -v ${pwd}:/mnt loadimpact/k6 run --out json=/mnt/test_result.json "/mnt/A - Getting started/03 - with scenarios.js"



// Handle manually:
export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...');
  
    // Send the results to some remote server or trigger a hook
    const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
    if (resp.status != 200) {
      console.error('Could not send summary, got status ' + resp.status);
    }
  
    return {
      'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
      '../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
      'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
      // And any other JS transformation of the data you can think of,
      // you can write your own JS helpers to transform the summary data however you like!
    };
  }