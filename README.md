# airplane-api

This API is used to create a microservice API to help us understand and track how a particular person’s flight path may be queried. (Part of volume finance assessment).

## API Endpoint

### "POST /calculate"

This endpoint accepts a JSON payload consisting of a list of flights and returns the first and last airports in the flight path as a JSON object. If a cycle (a chain of airports forming a loop) is detected in the flight paths, it outputs a JSON object with an error message.

- **URL**: `/calculate`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: A JSON array of flights, where each flight is an array with two elements: the source airport code and the destination airport code.

### Success request example

Input JSON

```json
{
  "flights": [
    ["ATL", "EWR"],
    ["SFO", "MCO"],
    ["MCO", "NYC"],
    ["EWR", "SFO"]
  ]
}
```

Output JSON:

```json
["ATL", "NYC"]
```

### Failed request example

Input JSON

```json
{
  "flights": [
    ["ATL", "EWR"],
    ["SFO", "ATL"],
    ["ATL", "SFO"],
    ["SFO", "NYC"],
    ["EWR", "SFO"]
  ]
}
```

Output JSON

```json
{
  "error": "Cycle detected in flight paths and hence could not be determined."
}
```

## Testing the endpoint

- _Install node.js_
- _Intall express.js using command 'npm install express'_
- _use command "npm start" to run_
- _test code in postman_
- _Set the request URL to http://localhost:8080/calculate_
- _Set the request method to POST. In the body section, choose raw input and set the format to JSON.Paste the input JSON and click Send_
