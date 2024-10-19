const fs = require('fs');

// Function to decode the Y value based on its base
function decodeYValue(value, base) {
    return parseInt(value, base);
}

// Function to calculate the constant term (secret) of the polynomial
function findSecret(decodePoints) {
    const n = decodePoints.length;
    let secret = 0;

    for (let i = 0; i < n; i++) {
        let term = decodePoints[i].y;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (0 - decodePoints[j].x) / (decodePoints[i].x - decodePoints[j].x);
            }
        }

        secret += term;
    }

    return secret;
}

// Function to read the JSON file and decode points
function findSecretFromJson(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    const n = data.keys.n;
    const decodePoints = [];

    // Loop through keys 1 to n to collect points
    for (let i = 1; i <= n; i++) {
        // Check if the key exists in the data
        if (data[i]) {
            const base = parseInt(data[i].base);
            const value = data[i].value;
            const decodedValue = decodeYValue(value, base);
            decodePoints.push({ x: i, y: decodedValue });
        }
    }

    const secret = findSecret(decodePoints);
    console.log('The secret (constant term c) of the polynomial is:', secret);
}

// Call the function with the path to your JSON file
findSecretFromJson('test_case.json');
