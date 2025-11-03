import { filterTable } from "./filter-function.js";

// dashboard.js (clean rebuilt version)

document.addEventListener("DOMContentLoaded", () => {
  filterTable();
  // ----------------- SIDEBAR TOGGLE -----------------
  const dboardSidebar = document.querySelector(".dashboard-sidebar");
  const toggleButton = document.querySelector(".sidebar-toggle");

  if (toggleButton && dboardSidebar) {
    toggleButton.addEventListener("click", () => {
      dboardSidebar.classList.toggle("sidebar-open");
    });

    // Close sidebar when clicking outside (mobile)
    document.addEventListener("click", (e) => {
      if (
        !dboardSidebar.contains(e.target) &&
        !toggleButton.contains(e.target)
      ) {
        dboardSidebar.classList.remove("sidebar-open");
      }
    });
  }

  // ----------------- PROFILE IMAGE UPLOAD & MODAL -----------------
  const profileCircle = document.getElementById("profileCircle");
  const uploadInput = document.getElementById("uploadImg");
  const viewProfileBtn = document.getElementById("viewProfileBtn");
  const modal = document.getElementById("profileModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  let uploadedImg = "https://via.placeholder.com/300x300.png?text=Photo";

  if (profileCircle && uploadInput) {
    profileCircle.addEventListener("click", () => uploadInput.click());
  }

  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedImg = ev.target.result;
        if (profileCircle) {
          profileCircle.style.backgroundImage = `url(${uploadedImg})`;
          profileCircle.classList.remove("no-image");
          profileCircle.innerHTML = `<img src="${uploadedImg}" alt="Profile Picture">`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (viewProfileBtn && modal && modalImg) {
    viewProfileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      modalImg.src = uploadedImg;
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => (modal.style.display = "none"));
  }

  // Close profile modal when clicking outside
  window.addEventListener("click", (e) => {
    if (modal && e.target === modal) modal.style.display = "none";
  });

  // ----------------- TRANSACTION STATUS -----------------

  // Dummy request data
  const requestsData = {
    pending: [
      {
        text: "Sean Patrick Remejio request a G-cash Payment",
        date: "2025-10-06",
      },
      { text: "Jane Doe request a G-cash Payment", date: "2025-10-05" },
      { text: "Michael Cruz request a TOR", date: "2025-10-04" },
    ],
    completed: [
      { text: "Mark Santos tuition fee completed", date: "2025-10-03" },
      { text: "Liza Ramos certificate issued", date: "2025-10-02" },
    ],
    rejected: [{ text: "Ana Dela Cruz request rejected", date: "2025-10-01" }],
  };

  // Elements for main modal
  const statusModal = document.getElementById("statusModal");
  const statusTableBody = document.getElementById("statusTableBody");
  const statusTitle = document.getElementById("statusTitle");
  const closeStatusModal = document.getElementById("closeStatusModal");

  // Elements for secondary modal (eye icon)
  const requestModal = document.getElementById("requestModal");
  const closeRequestModal = document.getElementById("closeRequestModal");

  // Handle card clicks
  document.querySelectorAll(".status-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.id; // pendingCard, completedCard, rejectedCard
      let type = "pending";
      if (id === "completedCard") type = "completed";
      if (id === "rejectedCard") type = "rejected";

      // Update modal title
      statusTitle.textContent =
        type.charAt(0).toUpperCase() + type.slice(1) + " Requests";

      // Clear previous rows
      statusTableBody.innerHTML = "";

      // Insert new rows from dummy data
      requestsData[type].forEach((req, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${req.text}</td>
          <td>${req.date}</td>
          <td><i class="fa-solid fa-eye" data-index="${index}" data-type="${type}"></i></td>
        `;
        statusTableBody.appendChild(row);
      });

      // Update card number automatically
      card.querySelector("p").textContent = requestsData[type].length;

      // Show modal
      if (statusModal) statusModal.style.display = "flex";
    });
  });

  if (closeStatusModal && statusModal) {
    closeStatusModal.addEventListener(
      "click",
      () => (statusModal.style.display = "none")
    );
  }

  // Eye icon click → open secondary modal
  document.addEventListener("click", (e) => {
    if (e.target.matches(".fa-eye")) {
      if (requestModal) requestModal.style.display = "flex";
    }
  });

  if (closeRequestModal && requestModal) {
    closeRequestModal.addEventListener(
      "click",
      () => (requestModal.style.display = "none")
    );
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (statusModal && e.target === statusModal)
      statusModal.style.display = "none";
    if (requestModal && e.target === requestModal)
      requestModal.style.display = "none";
  });

  // Preload numbers into cards on page load
  const pendingCard = document.getElementById("pendingCard");
  const completedCard = document.getElementById("completedCard");
  const rejectedCard = document.getElementById("rejectedCard");

  if (pendingCard)
    pendingCard.querySelector("p").textContent = requestsData.pending.length;
  if (completedCard)
    completedCard.querySelector("p").textContent =
      requestsData.completed.length;
  if (rejectedCard)
    rejectedCard.querySelector("p").textContent = requestsData.rejected.length;
}); // end DOMContentLoaded

// Eye icon click → open details modal (only for pending requests)
// Eye icon click → open correct modal depending on request type
document.addEventListener("click", (e) => {
  if (e.target.matches(".fa-eye")) {
    const type = e.target.dataset.type; // "pending", "completed", or "rejected"

    // Always close the table modal first
    if (requestModal) requestModal.style.display = "none";

    if (type === "pending") {
      // ✅ Show editable transaction modal
      const transactionModal = document.getElementById(
        "transactionDetailsModal"
      );
      if (transactionModal) transactionModal.style.display = "flex";
    } else if (type === "completed" || type === "rejected") {
      // ✅ Show read-only receipt modal
      const receiptModal = document.getElementById("receiptModal");
      if (receiptModal) receiptModal.style.display = "flex";
    } else {
      console.warn("Unknown transaction type:", type);
    }
  }
});

// Handle close, cancel, and submit buttons
const transactionModal = document.getElementById("transactionDetailsModal");
const closeTransactionModal = document.getElementById("closeTransactionModal");
const cancelTransaction = document.getElementById("cancelTransaction");
const submitTransaction = document.getElementById("submitTransaction");

if (closeTransactionModal && transactionModal) {
  closeTransactionModal.addEventListener(
    "click",
    () => (transactionModal.style.display = "none")
  );
}

if (cancelTransaction) {
  cancelTransaction.addEventListener(
    "click",
    () => (transactionModal.style.display = "none")
  );
}

if (submitTransaction) {
  submitTransaction.addEventListener("click", () => {
    alert("Transaction Submitted Successfully!");
    transactionModal.style.display = "none";
  });
}

// REJECT REQUEST MODAL LOGIC
const rejectModal = document.getElementById("rejectModal");
const rejectTransaction = document.getElementById("rejectTransaction");
const closeRejectModal = document.getElementById("closeRejectModal");
const saveReject = document.getElementById("saveReject");

if (rejectTransaction && rejectModal) {
  rejectTransaction.addEventListener("click", () => {
    // Close the transaction details modal first
    const transactionModal = document.getElementById("transactionDetailsModal");
    if (transactionModal) transactionModal.style.display = "none";
    rejectModal.style.display = "flex";
  });
}

if (closeRejectModal && rejectModal) {
  closeRejectModal.addEventListener(
    "click",
    () => (rejectModal.style.display = "none")
  );
}

if (saveReject) {
  saveReject.addEventListener("click", () => {
    alert("Rejection saved successfully!");
    rejectModal.style.display = "none";
  });
}

// Close when clicking outside
// Allow closing by clicking outside the modal
// ----- CLOSE RECEIPT MODAL -----
const receiptModal = document.getElementById("receiptModal");
const closeReceiptModal = document.getElementById("closeReceiptModal");

if (closeReceiptModal && receiptModal) {
  closeReceiptModal.addEventListener("click", () => {
    receiptModal.style.display = "none";
  });
}

// Allow closing by clicking outside the modal
window.addEventListener("click", (e) => {
  if (receiptModal && e.target === receiptModal) {
    receiptModal.style.display = "none";
  }
});

flatpickr("#payment-date", {
  mode: "range", // allows range selection (like in your sample)
  dateFormat: "M j, Y",
  showMonths: 2, // shows two months side by side
  allowInput: true,
  wrap: false,
  altInput: true,
  altFormat: "M j, Y",
});

document.getElementById("filter-btn").addEventListener("click", function () {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const purposeValue = document.getElementById("purpose").value.toLowerCase();
  const yearValue = document.getElementById("year").value.toLowerCase();
  const rows = document.querySelectorAll("#table-body tr");

  rows.forEach((row) => {
    const id = row.cells[0].textContent.toLowerCase();
    const name = row.cells[1].textContent.toLowerCase();
    const purpose = row.cells[6].textContent.toLowerCase();
    const year = row.cells[3].textContent.toLowerCase();

    const matchesSearch =
      id.includes(searchValue) || name.includes(searchValue);
    const matchesPurpose = !purposeValue || purpose.includes(purposeValue);
    const matchesYear = !yearValue || year.includes(yearValue);

    if (matchesSearch && matchesPurpose && matchesYear) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

//-----------NEW ROW FORM  CREATION--------------
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".add-btn");
  const tableBody = document.getElementById("table-body");

  addBtn.addEventListener("click", () => {
    // Prevent multiple form rows at once
    const existingForm = tableBody.querySelector(".new-row-form");
    if (existingForm) {
      alert("Please save or cancel the current form before adding another.");
      return;
    }

    // Generate a random 5-digit Student ID
    const studentId = Math.floor(10000 + Math.random() * 90000);

    // Create the new editable row
    const newRow = document.createElement("tr");
    newRow.classList.add("new-row-form");

    newRow.innerHTML = `
      <td>${studentId}</td>
      <td><input type="text" placeholder="Full Name"></td>
      <td>
        <select class="select-course">
          <option value="">Select Program</option>
          <option>BSIT</option>
          <option>BSBA</option>
          <option>BSED</option>
          <option>BSN</option>
          <option>BSA</option>
        </select>
      </td>
      <td>
        <select>
          <option value="" class="select-year">Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
      </td>
      <td><input type="date"></td>
      <td><input type="date"></td>
      <td><input type="date"></td>
      <td>
        <select>
          <option value="">All Purposes</option>
          <option value="Tuition Fees">Tuition Fees</option>
          <option value="Tour">Tour</option>>
        </select>
      </td>
      <td>
        <select>
          <option>Prelim</option>
          <option>Midterm</option>
          <option>Pre-Final</option>
          <option>Final</option>
        </select>
      </td>
      <td><input type="file"></td>
      <td>
        <select>
          <option value="">Select MOP</option>
          <option>Walk-in</option>
          <option>GCASH</option>
          <option>Bank</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">Select Status</option>
          <option>Paid</option>
          <option>Unpaid</option>
        </select>
      </td>
      <td class="action-icons">
        <button class="save-btn"><i class="fa-solid fa-floppy-disk"></i> Save</button>
        <button class="cancel-btn"><i class="fa-solid fa-xmark"></i> Cancel</button>
      </td>
    `;

    tableBody.appendChild(newRow);

    /// Handle Save button
    const saveBtn = newRow.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      const name =
        newRow.querySelector("input[type='text']").value.trim() || "—";
      const program = newRow.querySelectorAll("select")[0].value || "—";
      const year = newRow.querySelectorAll("select")[1].value || "—";
      const fileInput = newRow.querySelector("input[type='file']");
      const file =
        fileInput.files.length > 0 ? fileInput.files[0].name : "No File";

      // Capture the editable parts before replacing
      const date = newRow.querySelectorAll("input[type='date']")[0].value;
      const dateFrom = newRow.querySelectorAll("input[type='date']")[0].value;
      const dateTo = newRow.querySelectorAll("input[type='date']")[2].value;
      const purpose = newRow.querySelectorAll("select")[2].value;
      const type = newRow.querySelectorAll("select")[3].value;
      const mop = newRow.querySelectorAll("select")[4].value;
      const status = newRow.querySelectorAll("select")[5].value;

      // Helper function to format year level with superscript
      function formatYear(year) {
        if (!year) return "—";
        const map = {
          "1st Year": "1<sup>st</sup> Year",
          "2nd Year": "2<sup>nd</sup> Year",
          "3rd Year": "3<sup>rd</sup> Year",
          "4th Year": "4<sup>th</sup> Year",
        };
        return map[year] || year;
      }

      newRow.classList.remove("new-row-form");

      // Replace non-editable columns with text
      newRow.innerHTML = `
        <td>${studentId}</td>
        <td>${name}</td>
        <td>${program}</td>
        <td>${formatYear(year)}</td>
        <td><input type="date" value="${date}"></td>
        <td><input type="date" value="${dateFrom}"></td>
        <td><input type="date" value="${dateTo}"></td>
        <td>${createSelect(
          ["All Purposes", "Tuition Fees", "Tour"],
          purpose
        )}</td>
        <td>${createSelect(
          ["Prelim", "Midterm", "Pre-Final", "Finals"],
          type
        )}</td>
        <td>${file}</td>
        <td>${createSelect(["Walk-in", "GCASH", "Bank"], mop)}</td>
        <td>${createSelect(["Paid", "Unpaid"], status)}</td>
        <td class="action-icons">
          <i class="fa-solid fa-eye"></i>
          <i class="fa-solid fa-pen edit-icon"></i>
          <i class="fa-solid fa-trash delete-icon"></i>
        </td>
      `;
    });

    // Handle Cancel button
    const cancelBtn = newRow.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", () => {
      newRow.remove();
    });
  });

  // Helper function to recreate selects and retain value
  function createSelect(options, selectedValue = "") {
    return `
      <select>
        ${options
          .map(
            (opt) =>
              `<option ${
                opt === selectedValue ? "selected" : ""
              }>${opt}</option>`
          )
          .join("")}
      </select>
    `;
  }

  document.addEventListener("click", (e) => {
    const row = e.target.closest("tr");

    // DELETE
    if (e.target.classList.contains("fa-trash")) {
      if (confirm("Are you sure you want to delete this record?")) row.remove();
    }

    // EDIT - open modal
    if (e.target.classList.contains("fa-pen")) {
      const cells = Array.from(row.children).slice(0, -1);
      const modal = document.getElementById("editModal");
      const inputs = modal.querySelectorAll("input, select");

      inputs.forEach((input, index) => {
        if (input.type === "file") return;
        input.value = cells[index].textContent.trim();
      });

      modal.style.display = "flex";

      const saveEditBtn = modal.querySelector("#saveEditBtn");
      const cancelEditBtn = modal.querySelector("#cancelEditBtn");

      saveEditBtn.onclick = () => {
        inputs.forEach((input, index) => {
          if (input.type === "file") {
            const fileName =
              input.files[0]?.name || cells[index].textContent.trim();
            cells[index].textContent = fileName;
          } else {
            cells[index].textContent = input.value || "—";
          }
        });
        modal.style.display = "none";
      };

      cancelEditBtn.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (ev) => {
        if (ev.target === modal) modal.style.display = "none";
      };
    }

    // PREVIEW
    if (e.target.classList.contains("fa-eye")) {
      const modal = document.getElementById("previewModal");
      const modalBody = modal.querySelector(".modal-body");

      const labels = [
        "Student ID",
        "Full Name",
        "Program",
        "Year",
        "Date",
        "Date From",
        "Date To",
        "Purpose",
        "Type",
        "File",
        "Mode of Payment",
        "Status",
      ];

      const cells = Array.from(row.children);
      modalBody.innerHTML = cells
        .slice(0, -1) // Exclude the action icons column
        .map(
          (td, i) =>
            `<p><strong>${labels[i] || `Field ${i + 1}`}:</strong> ${
              td.textContent.trim() || "—"
            }</p>`
        )
        .join("");

      modal.style.display = "flex";

      const close = modal.querySelector(".closePreviewModal");
      close.addEventListener("click", () => (modal.style.display = "none"));
      window.addEventListener("click", (ev) => {
        if (ev.target === modal) modal.style.display = "none";
      });
    }
  });
});
