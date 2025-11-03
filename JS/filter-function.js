export function filterTable() {
  const searchInput = document.getElementById("search");
  const tableBody = document.getElementById("table-body");
  const purposeSelect = document.getElementById("purpose");
  const yearSelect = document.getElementById("year");
  const filterBtn = document.getElementById("filter-btn");

  // ✅ Central function to apply all filters
  function applyFilters() {
    const search = searchInput.value.toLowerCase().trim();
    const selectedPurpose = purposeSelect.value.toLowerCase();
    const selectedYear = yearSelect.value.toLowerCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, index) => {
      // Skip header row if it exists inside tbody
      if (index === 0 && row.classList.contains("table-labels")) return;

      const studentId = row.children[0]?.textContent.toLowerCase() || "";
      const studentName = row.children[1]?.textContent.toLowerCase() || "";
      const year = row.children[3]?.textContent.toLowerCase() || "";
      const purpose = row.children[7]?.textContent.toLowerCase() || "";

      // Check for matches
      const matchesSearch =
        studentId.includes(search) || studentName.includes(search);
      const matchesPurpose =
        !selectedPurpose || purpose.includes(selectedPurpose);
      const matchesYear = !selectedYear || year.includes(selectedYear);

      // Show or hide row
      if (matchesSearch && matchesPurpose && matchesYear) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // ✅ Attach all events
  searchInput.addEventListener("input", applyFilters);
  purposeSelect.addEventListener("change", applyFilters);
  yearSelect.addEventListener("change", applyFilters);
  filterBtn.addEventListener("click", applyFilters);
}
