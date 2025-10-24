function updatePieChartFromIds() {
  const pie = document.getElementById("pieChart");
  if (!pie) return;

  const college = parseFloat(document.getElementById("college-perc")?.textContent || "0") || 0;
  const shs = parseFloat(document.getElementById("shs-perc")?.textContent || "0") || 0;
  const junior = parseFloat(document.getElementById("junior-perc")?.textContent || "0") || 0;

  const total = college + shs + junior;
  if (total === 0) return;

  const collegeEnd = (college / total) * 100;
  const shsEnd = collegeEnd + (shs / total) * 100;
  const juniorEnd = 100; // always ends at 100%

  const gradient = `conic-gradient(
    #003467 0% ${collegeEnd}%,
    #f1c40f ${collegeEnd}% ${shsEnd}%,
    #70d32f ${shsEnd}% ${juniorEnd}%
  )`;

  pie.style.background = gradient;
}

document.addEventListener("DOMContentLoaded", updatePieChartFromIds);
