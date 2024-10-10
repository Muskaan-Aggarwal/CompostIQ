var ctx = document.getElementById('compostQualityChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
        datasets: [{
            label: 'Compost Quality',
            data: [85, 90, 95, 97],
            borderColor: 'rgb(75, 192, 192)',
            fill: false
        }]
    },
    options: {}
});
