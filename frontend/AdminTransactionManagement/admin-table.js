document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector(".transaction-table tbody");
  const purposeFilter = document.querySelector(".filter-controls select:nth-of-type(1)");
  const addBtn = document.querySelector(".add-btn");

  // ------------------ DATASETS ------------------

  // Tuition Fees (full student transaction info)
  const tuitionTransactions = [
    {
      id: "12359",
      name: "Sean Patrick",
      program: "BSIT",
      year: "4th Year",
      purpose: "Tuition Fees",
      type: "Scholar",
      mop: "GCASH",
      status: "Paid"
    },
    {
      id: "12360",
      name: "Anna Dela Cruz",
      program: "BSBA",
      year: "3rd Year",
      purpose: "Tuition Fees",
      type: "Regular",
      mop: "Bank",
      status: "Unpaid"
    }
  ];

  // Educational Tour (different layout)
  const tourTransactions = [
    {
      id: "1123",
      program: "Baguio Tour",
      details: "Educational Tour 2024",
      duration: "",
      participants: "All Year",
      amount: "10,600Php",
      down: "2,500Php",
      penalty: "100Php"
    },
    {
      id: "1124",
      program: "Ilocos Tour",
      details: "Educational Tour 2025",
      duration: "",
      participants: "3rd Year",
      amount: "8,500Php",
      down: "2,000Php",
      penalty: "0Php"
    }
  ];

  // ------------------ RENDER FUNCTIONS ------------------

  // Tuition Fees table renderer (editable)
  function renderTuitionTable(data) {
    let headerHtml = `
      <tr class="table-labels">
        <td>Student ID</td>
        <td>Student Name</td>
        <td>Program</td>
        <td>Yr Level</td>
        <td>Date</td>
        <td>Duration</td>
        <td>Purpose</td>
        <td>Type</td>
        <td>FILE</td>
        <td>MOP</td>
        <td>Status</td>
        <td>Action</td>
      </tr>
    `;

    let rowsHtml = data.map(tr => `
      <tr>
        <td><input type="text" value="${tr.id || ""}" placeholder="ID"></td>
        <td><input type="text" value="${tr.name || ""}" placeholder="Name"></td>
        <td><input type="text" value="${tr.program || ""}" placeholder="Program"></td>
        <td><input type="text" value="${tr.year || ""}" placeholder="Year"></td>
        <td><input type="date"></td>
        <td><input type="date"></td>
        <td>${tr.purpose}</td>
        <td>
          <select>
            <option ${tr.type === "Scholar" ? "selected" : ""}>Scholar</option>
            <option ${tr.type === "Regular" ? "selected" : ""}>Regular</option>
          </select>
        </td>
        <td><a href="#">Upload File</a></td>
        <td>
          <select>
            <option ${tr.mop === "Walk-in" ? "selected" : ""}>Walk-in</option>
            <option ${tr.mop === "GCASH" ? "selected" : ""}>GCASH</option>
            <option ${tr.mop === "Bank" ? "selected" : ""}>Bank</option>
          </select>
        </td>
        <td>
          <select>
            <option ${tr.status === "Paid" ? "selected" : ""}>Paid</option>
            <option ${tr.status === "Unpaid" ? "selected" : ""}>Unpaid</option>
          </select>
        </td>
        <td class="action-icons">
          <i class="fa-solid fa-trash"></i>
        </td>
      </tr>
    `).join("");

    tableBody.innerHTML = headerHtml + rowsHtml;
  }

  // Educational Tour table renderer (editable)
  function renderTourTable(data) {
    let headerHtml = `
      <tr class="table-labels">
        <td>Program ID</td>
        <td>Program</td>
        <td>Details</td>
        <td>Duration</td>
        <td>Participants</td>
        <td>Amount</td>
        <td>Down Payment</td>
        <td>Penalty</td>
        <td>Action</td>
      </tr>
    `;

    let rowsHtml = data.map(tr => `
      <tr>
        <td><input type="text" value="${tr.id || ""}" placeholder="ID"></td>
        <td><input type="text" value="${tr.program || ""}" placeholder="Program"></td>
        <td><input type="text" value="${tr.details || ""}" placeholder="Details"></td>
        <td><input type="date" value="${tr.duration || ""}"></td>
        <td><input type="text" value="${tr.participants || ""}" placeholder="Participants"></td>
        <td><input type="number" value="${tr.amount.replace("Php","") || ""}" placeholder="Amount"></td>
        <td><input type="number" value="${tr.down.replace("Php","") || ""}" placeholder="Down"></td>
        <td><input type="number" value="${tr.penalty.replace("Php","") || ""}" placeholder="Penalty"></td>
        <td class="action-icons">
          <i class="fa-solid fa-trash"></i>
        </td>
      </tr>
    `).join("");

    tableBody.innerHTML = headerHtml + rowsHtml;
  }

  // ------------------ ADD TRANSACTION ------------------

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const currentFilter = purposeFilter.value;

      if (currentFilter === "Tuition Fees") {
        tuitionTransactions.push({
          id: "",
          name: "",
          program: "",
          year: "",
          purpose: "Tuition Fees",
          type: "",
          mop: "",
          status: ""
        });
        renderTuitionTable(tuitionTransactions);

      } else if (currentFilter === "Educational Tour") {
        tourTransactions.push({
          id: "",
          program: "",
          details: "",
          duration: "",
          participants: "",
          amount: "",
          down: "",
          penalty: ""
        });
        renderTourTable(tourTransactions);
      }
    });
  }

  // ------------------ DEFAULT & FILTER ------------------

  renderTuitionTable(tuitionTransactions);

  if (purposeFilter) {
    purposeFilter.addEventListener("change", () => {
      if (purposeFilter.value === "Tuition Fees") {
        renderTuitionTable(tuitionTransactions);
      } else if (purposeFilter.value === "Educational Tour") {
        renderTourTable(tourTransactions);
      }
    });
  }
});
