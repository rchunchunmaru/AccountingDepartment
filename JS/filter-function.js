export function filterTable() {
  const searchInput = document.getElementById("search");
  const tableBody = document.getElementById("table-body");

  // This function filters table rows based on the search input
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase().trim();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, index) => {
      // Skip the header row (if you have one inside tbody)
      if (index === 0 && row.classList.contains("table-labels")) return;

      // Get the student ID and name cells (adjust if your table changes)
      const studentId = row.children[0]?.textContent.toLowerCase() || "";
      const studentName = row.children[1]?.textContent.toLowerCase() || "";

      // Check if either matches the search text
      if (studentId.includes(filter) || studentName.includes(filter)) {
        row.style.display = ""; // show
      } else {
        row.style.display = "none"; // hide
      }
    });
  });
}
