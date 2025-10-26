// =================== FILTER LOGIC ===================
(function () {
  const selects = document.querySelectorAll(".custom-select");

  function closeAll(except) {
    selects.forEach((cs) => {
      if (cs !== except) {
        cs.classList.remove("open");
        const trigger = cs.querySelector(".select-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  selects.forEach((cs) => {
    const trigger = cs.querySelector(".select-trigger");
    const valueEl = cs.querySelector(".select-value");
    const hidden = cs.querySelector('input[type="hidden"]');
    const options = Array.from(cs.querySelectorAll(".select-option"));

    options.forEach((opt) => opt.setAttribute("aria-selected", "false"));

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = cs.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) closeAll(cs);
    });

    options.forEach((opt) => {
      opt.tabIndex = 0;
      opt.addEventListener("click", () => {
        options.forEach((o) => o.setAttribute("aria-selected", "false"));
        opt.setAttribute("aria-selected", "true");
        const text = opt.textContent.trim();
        const val = opt.dataset.value || text;
        valueEl.textContent = text;
        if (hidden) hidden.value = val;
        cs.classList.add("has-value");
        cs.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });
  }); 

  document.addEventListener("click", () => closeAll());
})();


// =================== SEARCH INPUT ===================
document.getElementById("searchInput").addEventListener("keyup", function () {
  const searchValue = this.value.trim().toLowerCase();
  const rows = document.querySelectorAll("#Admission_table1 tbody tr");

  rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
    if (rowText.includes(searchValue)) {
      row.style.display = "";   // show
    } else {
      row.style.display = "none"; // hide
    }
  });
});


// =================== FILTER BUTTON ===================
document.querySelector(".masterlist-filter-btn").addEventListener("click", function () {
  const course = document.querySelector('input[name="course"]').value;
  const yearlvl = document.querySelector('input[name="year_level"]').value;

  if (!course && !yearlvl) { 
    alert("Please select at least one filter option before applying the filter."); 
    return; 
  }

  const rows = document.querySelectorAll(".masterlist-table tbody tr");

  rows.forEach((row) => {
    const rowCourse = row.cells[2].innerText.trim().toLowerCase();
    const rowYearlvl = row.cells[3].innerText.trim().toLowerCase();

    let show = true;
    if (course && rowCourse !== course.toLowerCase()) show = false;
    if (yearlvl && rowYearlvl !== yearlvl.toLowerCase()) show = false;

    row.style.display = show ? "" : "none";
  });
});

// =================== EXPORT MODAL ===================
document.getElementById("downloadmasterlistBtn").onclick = function () {
  document.getElementById("downloadmasterlistModal").style.display = "flex";
  document.body.style.overflow = "hidden";
};

function closeExportModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "auto";
}

function downloadmasterlist() {
  let format = document.querySelector('input[name="downloadFormat"]:checked');
  if (!format) {
    alert("Please select a format.");
    return;
  }

  if (format.value === "Print") {
    closeExportModal("downloadmasterlistModal");
    window.print();
    return;
  }

  if (format.value === "PDF") {
    closeExportModal("downloadmasterlistModal");

    let table = document.getElementById("masterlistTable").cloneNode(true);
    let container = document.getElementById("pdfTableContainer");
    container.innerHTML = "";
    container.appendChild(table);

    let now = new Date();
    document.getElementById("reportDate").innerText = "Exported On: " + now.toLocaleString();

    let wrapper = document.getElementById("pdfWrapper");
    wrapper.style.display = "block";

    const opt = {
      margin: 0.5,
      filename: "document_masterlist_report.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, backgroundColor: "#ffffff" },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(wrapper).save().then(() => {
      wrapper.style.display = "none";
    });
    return;
  }

  if (format.value === "Excel") {
    closeExportModal("downloadmasterlistModal");
    let table = document.getElementById("masterlistTable");
    let wb = XLSX.utils.table_to_book(table, { sheet: "masterlist" });
    XLSX.writeFile(wb, "masterlist.xlsx");
  }
}

// =================== SORT MODAL ===================
document.getElementById("SortmasterlistBtn").addEventListener("click", function () {
  document.getElementById("SortmasterlistModal").style.display = "block";
  document.body.style.overflow = "hidden";
});

function closeSortModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "auto";
}

document.querySelectorAll(".sort-options li").forEach((option) => {
  option.addEventListener("click", function () {
    const sortType = this.getAttribute("data-value");
    sortTable(sortType);
    closeSortModal("SortmasterlistModal");
  });
});

function sortTable(sortType) {
  const table = document.querySelector(".masterlist-table tbody");
  const rows = Array.from(table.rows);

  let compare;
  switch (sortType) {
    case "nameAsc":
      compare = (a, b) => a.cells[1].innerText.localeCompare(b.cells[1].innerText);
      break;
    case "nameDesc":
      compare = (a, b) => b.cells[1].innerText.localeCompare(a.cells[1].innerText);
      break;
    case "Student_ID":
      compare = (a, b) =>
        a.cells[0].innerText.localeCompare(b.cells[0].innerText, undefined, { numeric: true });
      break;
    case "Status":
      compare = (a, b) => {
        const statusOrder = { "Regular": 1, "Irregular": 2 }; 
        const statusA = statusOrder[a.cells[4].innerText.trim()] || 99;
        const statusB = statusOrder[b.cells[4].innerText.trim()] || 99;
        return statusA - statusB;
      };
      break;
    case "Section":
    compare = (a, b) => a.cells[5].innerText.localeCompare(b.cells[5].innerText);
    break;
  }

  rows.sort(compare);
  rows.forEach((row) => table.appendChild(row));
}

// =================== FILTER OPTIONS===================
document.getElementById("filterArrow").addEventListener("click", function (event) {
  event.stopPropagation(); // prevent parent clicks
  document.getElementById("FiltermasterlistModal").style.display = "block";
  document.body.style.overflow = "hidden";
});

// Close filter modal
function closeFilterModal() {
  document.getElementById("FiltermasterlistModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// Apply filters
function applyFilters() {
  const sectionValue = document.getElementById("sectionFilter").value.toLowerCase();
  const statusValue = document.getElementById("statusFilter").value.toLowerCase();

  const rows = document.querySelectorAll("#Admission_table1 tbody tr");

  rows.forEach(row => {
    const rowSection = row.cells[5].innerText.trim().toLowerCase(); // Section column
    const rowStatus = row.cells[4].innerText.trim().toLowerCase();  // Status column

    let show = true;

    if (sectionValue && rowSection !== sectionValue) {
      show = false;
    }

    if (statusValue && rowStatus !== statusValue) {
      show = false;
    }

    row.style.display = show ? "" : "none";
  });

  closeFilterModal(); // close modal after applying
}