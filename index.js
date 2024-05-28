const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;
    const { firstAirport, lastAirport, hasCycle } = calculateFirstAndLastAirports(flights);
    if (hasCycle) {
        res.json({ error: "Cycle detected in flight paths and hence could not be determined." });
    } else {
        res.json([firstAirport, lastAirport]);
    }
});

function calculateFirstAndLastAirports(flights) {
    if (flights.length === 0) return { firstAirport: null, lastAirport: null, hasCycle: false };

    // Hashtable to count occurrences of each airport
    const airportCount = new Map();
    const flightMap = new Map();
    const reverseMap = new Map(); // Variable to track cycles

    // Populate the flightMap and airportCount
    flights.forEach(([source, destination]) => {
        flightMap.set(source, destination);
        reverseMap.set(destination, source);

        airportCount.set(source, (airportCount.get(source) || 0) + 1);
        airportCount.set(destination, (airportCount.get(destination) || 0) + 1);
    });

    // Find the starting airport
    let start = null;
    for (const [airport, count] of airportCount) {
        if (count === 1 && flightMap.has(airport) && !reverseMap.has(airport)) {
            start = airport;
            break;
        }
    }

    // If no unique start is found, the input might not represent a valid path
    if (!start) {
        return { firstAirport: null, lastAirport: null, hasCycle: true };
    }

    // Construct the flight path
    const path = [];
    const visited = new Set();
    let current = start;

    while (current) {
        if (visited.has(current)) {
            return { firstAirport: null, lastAirport: null, hasCycle: true };
        }
        visited.add(current);
        path.push(current);
        current = flightMap.get(current);
    }

    return { firstAirport: path[0], lastAirport: path[path.length - 1], hasCycle: false };
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
