let statisticsChart; // holder på det aktive diagrammet

function drawStatisticsChart() {
    const stats = model.data.users[0].statistics;
    const ctx = document.getElementById('statisticsFullChart').getContext('2d');

    // Slett eksisterende chart om det finnes
    if (statisticsChart) {
        statisticsChart.destroy();
    }

    const weekLabels = stats.map((s, i) => `Uke ${s.week || i + 1}`);
    const daysData = stats.map(s => s.daysInSlope);
    const hoursData = stats.map(s => s.hoursInSlope);

    statisticsChart = new Chart(ctx, {
        type: 'line', // <-- Endret her
        data: {
            labels: weekLabels,
            datasets: [
                {
                    label: 'Dager i bakken',
                    data: daysData,
                    borderColor: '#2196F3',
                    fill: false
                },
                {
                    label: 'Timer i bakken',
                    data: hoursData,
                    borderColor: '#FFC107',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}