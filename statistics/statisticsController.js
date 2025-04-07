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
        type: 'bar',
        data: {
            labels: weekLabels,
            datasets: [
                {
                    label: 'Dager i bakken',
                    data: daysData,
                    backgroundColor: '#2196F3'
                },
                {
                    label: 'Timer i bakken',
                    data: hoursData,
                    backgroundColor: '#FFC107'
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