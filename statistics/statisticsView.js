function renderStatisticsPage() {
    // Skjul andre sider
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('statisticsFullPage').style.display = 'block';

    drawStatisticsChart();
}

