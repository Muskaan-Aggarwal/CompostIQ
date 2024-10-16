// Chart.js configuration
var ctx = document.getElementById('compostQualityChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],  // X-axis labels (days)
        datasets: [{
            label: 'Compost Quality',
            data: [85, 90, 95, 97],  // Sample compost quality data
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Compost Quality Over Time'
            }
        }
    }
});

// Form submission logic
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting the traditional way

    // Get the values from the input fields
    let moistureValue = document.getElementById('moisture').value;
    let temperatureValue = document.getElementById('temperature').value;
    let phValue = document.getElementById('ph').value;

    // Make the fetch request to the Flask server
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'moisture': moistureValue,
            'temperature': temperatureValue,
            'ph': phValue
        })
    })
    .then(response => response.text())  // Convert response to text
    .then(data => {
        document.getElementById('result').innerText = data;  // Display the prediction result
    })
    .catch(error => console.error('Error:', error));  // Log any errors
});

