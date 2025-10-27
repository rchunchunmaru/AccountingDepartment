document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.bar');
    const chartArea = document.querySelector('.chart_area');
    const yAxis = document.getElementById('y_axis');
    const chartContainer = document.querySelector('.admission_graph_chart');

    const topPadding = 65;
    const maxPixelHeight = chartArea.clientHeight - topPadding;

    const values = Array.from(bars).map(bar => parseFloat(bar.dataset.value) || 0);
    const maxValue = Math.max(...values);

    // 1. Draw bars and add numbers on top
    bars.forEach(bar => {
        const value = parseFloat(bar.dataset.value) || 0;
        const barHeight = (value / maxValue) * maxPixelHeight;
        bar.style.height = barHeight + 'px';

        const valueDiv = bar.parentElement.querySelector('.y_value');
        valueDiv.textContent = value;
        valueDiv.style.position = 'absolute';
        valueDiv.style.bottom = barHeight + 5 + 'px';
        valueDiv.style.left = '50%';
        valueDiv.style.transform = 'translateX(-50%)';
        valueDiv.style.zIndex = 1;

        // Ensure each bar container does not shrink, so scroll works
        bar.parentElement.style.flex = '0 0 auto';
    });

    // 2. Create Y-axis labels
    yAxis.innerHTML = '';
    const step = 1; // adjust as needed
    for (let i = 0; i <= maxValue; i += step) {
        const label = document.createElement('div');
        label.classList.add('y_label');
        label.textContent = i;

        const bottomPercent = (i / maxValue) * 100;
        label.style.bottom = bottomPercent + '%';
        yAxis.appendChild(label);

        // create horizontal grid line inside chart container, absolute
        const line = document.createElement('div');
        line.classList.add('grid_line');
        line.style.position = 'absolute';
        line.style.left = '0';
        line.style.width = chartArea.scrollWidth + 'px';
        line.style.height = '1px';
        line.style.backgroundColor = '#eee';
        line.style.bottom = bottomPercent + '%';
        chartContainer.appendChild(line);
    }

    // Optional: start scroll at left
    chartArea.scrollLeft = 0;
});


document.addEventListener('DOMContentLoaded', () => {
    const chartArea = document.querySelector('.chart_area');

    // Auto scroll to the right continuously
    let scrollAmount = 0;
    const scrollSpeed = .3; // pixels per frame, adjust to speed up/down

    function autoScroll() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= chartArea.scrollWidth - chartArea.clientWidth) {
            scrollAmount = 0; // reset to start
        }
        chartArea.scrollLeft = scrollAmount;
        requestAnimationFrame(autoScroll); // smooth animation
    }

    autoScroll();
});
