function renderStatisticsPage() {
    // Skjul andre sider
    document.getElementById('contentContainer').style.display = 'none';
    const statisticsPage = document.getElementById('statisticsFullPage');
    if (statisticsPage) {
        statisticsPage.style.display = 'block';  // Vis statistikksiden
    }

    drawStatisticsChart();
}

