// ========== DASHBOARD CONTROLLER ==========
class DashboardController {
  constructor() {
    this.initElements();
    this.initData();
    this.bindEvents();
    this.render();
  }

  // Initialize DOM elements
  initElements() {
    this.elements = {
      tableBody: document.querySelector(".transaction-table tbody"),
      purposeFilter: document.getElementById("purposeFilter"),
      yearFilter: document.getElementById("yearFilter"),
      searchInput: document.getElementById("searchInput"),
      applyFilterBtn: document.getElementById("applyFilter"),
      addBtn: document.querySelector(".add-btn"),
      sidebarToggle: document.querySelector(".sidebar-toggle"),
      sidebar: document.querySelector(".dashboard-sidebar"),
      modal: document.getElementById("fileModal"),
      modalClose: document.getElementById("closeModal"),
      modalImg: document.getElementById("modalImg"),
      advancedFilterModal: document.getElementById("advancedFilterModal"),
      advancedFilterBtn: document.getElementById("advanceFilter"),
      closeFilterModal: document.getElementById("closeFilterModal"),
      applyAdvancedFilters: document.getElementById("applyAdvancedFilters"),
      filterYear: document.getElementById("filterYear"),
      filterMonth: document.getElementById("filterMonth"),
      filterProgram: document.getElementById("filterProgram"),
      filterYearLevel: document.getElementById("filterYearLevel"),
      filterPurpose: document.getElementById("filterPurpose"),
      filterStatus: document.getElementById("filterStatus"),
      exportModal: document.getElementById("exportModal"),
      exportBtn: document.getElementById("exportBtn"),
      closeExportModal: document.getElementById("closeExportModal"),
      exportDataBtn: document.getElementById("exportDataBtn"),
      sortModal: document.getElementById("sortModal"),
      sortBtn: document.getElementById("sortBtn"),
      closeSortModal: document.getElementById("closeSortModal"),
      viewDetailsModal: document.getElementById("viewDetailsModal"),
      closeViewModal: document.getElementById("closeViewModal"),
      editModal: document.getElementById("editModal"),
      closeEditModal: document.getElementById("closeEditModal"),
      cancelEdit: document.getElementById("cancelEdit"),
      proceedEdit: document.getElementById("proceedEdit"),
      deleteModal: document.getElementById("deleteModal"),
      closeDeleteModal: document.getElementById("closeDeleteModal"),
      cancelDelete: document.getElementById("cancelDelete"),
      proceedDelete: document.getElementById("proceedDelete"),
      remarksModal: document.getElementById("remarksModal"),
      closeRemarksModal: document.getElementById("closeRemarksModal"),
      saveRemarks: document.getElementById("saveRemarks"),
      remarksSection: document.getElementById("remarksSection"),
      remarksText: document.getElementById("remarksText"),
      remarksFilter: document.getElementById("remarksFilter"),
      remarksFilterModal: document.getElementById("remarksFilterModal"),
      closeRemarksFilter: document.getElementById("closeRemarksFilter"),
    };

    this.currentEditIndex = null;
    this.currentDeleteIndex = null;
    this.currentRemarksIndex = null;
  }

  // Initialize data
  initData() {
    this.data = {
      tuitionTransactions: [
        {
          id: "12359",
          name: "Sean Patrick",
          program: "BSIT",
          year: "4th Year",
          date: "",
          duration: "",
          purpose: "Tuition Fees",
          type: "Scholar",
          file: "student_12359.pdf",
          mop: "GCASH",
          status: "Paid",
        },
        {
          id: "12360",
          name: "Anna Dela Cruz",
          program: "BSBA",
          year: "3rd Year",
          date: "",
          duration: "",
          purpose: "Tuition Fees",
          type: "Regular",
          file: "student_12360.pdf",
          mop: "Bank",
          status: "Unpaid",
        },
        {
          id: "12361",
          name: "Mark Johnson",
          program: "BSCS",
          year: "2nd Year",
          date: "",
          duration: "",
          purpose: "Tuition Fees",
          type: "Regular",
          file: "student_12361.pdf",
          mop: "Walk-in",
          status: "Paid",
        },
      ],
      tourTransactions: [
        {
          id: "1123",
          program: "Baguio Tour",
          details: "Educational Tour 2024",
          duration: "2024-12-15",
          participants: "All Years",
          amount: "10600",
          down: "2500",
          penalty: "100",
        },
        {
          id: "1124",
          program: "Ilocos Tour",
          details: "Educational Tour 2025",
          duration: "2025-03-20",
          participants: "3rd Year",
          amount: "8500",
          down: "2000",
          penalty: "0",
        },
      ],
    };

    this.currentFilter = {
      purpose: "Tuition Fees",
      year: "",
      search: "",
    };

    this.advancedFilters = {
      year: "",
      month: "",
      program: "",
      yearLevel: "",
      purpose: "",
      status: "",
    };

    this.currentSort = null;
  }

  // Bind event listeners
  bindEvents() {
    // Filter events
    this.elements.purposeFilter?.addEventListener("change", () => {
      this.currentFilter.purpose = this.elements.purposeFilter.value;
      this.render();
    });

    this.elements.yearFilter?.addEventListener("change", () => {
      this.currentFilter.year = this.elements.yearFilter.value;
      this.render();
    });

    this.elements.applyFilterBtn?.addEventListener("click", () => {
      this.currentFilter.search = this.elements.searchInput.value
        .trim()
        .toLowerCase();
      this.render();
    });

    // Search on Enter key
    this.elements.searchInput?.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.currentFilter.search = this.elements.searchInput.value
          .trim()
          .toLowerCase();
        this.render();
      }
    });

    // Add transaction
    this.elements.addBtn?.addEventListener("click", () =>
      this.addTransaction()
    );

    // Sidebar toggle
    this.elements.sidebarToggle?.addEventListener("click", () => {
      this.elements.sidebar.classList.toggle("sidebar-open");
    });

    // Submenu toggle
    document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = toggle.closest(".has-submenu");
        parent.classList.toggle("open");
      });
    });

    // Modal close
    this.elements.modalClose?.addEventListener("click", () =>
      this.closeModal()
    );
    this.elements.modal?.addEventListener("click", (e) => {
      if (e.target === this.elements.modal) {
        this.closeModal();
      }
    });

    // Advanced filter modal
    this.elements.advancedFilterBtn?.addEventListener("click", () =>
      this.openAdvancedFilter()
    );
    this.elements.closeFilterModal?.addEventListener("click", () =>
      this.closeAdvancedFilter()
    );
    this.elements.advancedFilterModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.advancedFilterModal) {
        this.closeAdvancedFilter();
      }
    });
    this.elements.applyAdvancedFilters?.addEventListener("click", () =>
      this.applyAdvancedFilters()
    );

    // Export modal
    this.elements.exportBtn?.addEventListener("click", () =>
      this.openExportModal()
    );
    this.elements.closeExportModal?.addEventListener("click", () =>
      this.closeExportModal()
    );
    this.elements.exportModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.exportModal) {
        this.closeExportModal();
      }
    });
    this.elements.exportDataBtn?.addEventListener("click", () =>
      this.exportData()
    );

    // Sort modal
    this.elements.sortBtn?.addEventListener("click", () =>
      this.openSortModal()
    );
    this.elements.closeSortModal?.addEventListener("click", () =>
      this.closeSortModal()
    );
    this.elements.sortModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.sortModal) {
        this.closeSortModal();
      }
    });

    // Sort option buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("sort-option") ||
        e.target.closest(".sort-option")
      ) {
        const btn = e.target.classList.contains("sort-option")
          ? e.target
          : e.target.closest(".sort-option");
        const sortType = btn.dataset.sort;
        this.applySorting(sortType);
        this.closeSortModal();
      }
    });

    // View details modal
    this.elements.closeViewModal?.addEventListener("click", () =>
      this.closeViewDetails()
    );
    this.elements.viewDetailsModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.viewDetailsModal) {
        this.closeViewDetails();
      }
    });

    // Edit modal
    this.elements.closeEditModal?.addEventListener("click", () =>
      this.closeEditModal()
    );
    this.elements.cancelEdit?.addEventListener("click", () =>
      this.closeEditModal()
    );
    this.elements.proceedEdit?.addEventListener("click", () =>
      this.confirmEdit()
    );
    this.elements.editModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.editModal) {
        this.closeEditModal();
      }
    });

    // Delete modal
    this.elements.closeDeleteModal?.addEventListener("click", () =>
      this.closeDeleteModal()
    );
    this.elements.cancelDelete?.addEventListener("click", () =>
      this.closeDeleteModal()
    );
    this.elements.proceedDelete?.addEventListener("click", () =>
      this.confirmDelete()
    );
    this.elements.deleteModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.deleteModal) {
        this.closeDeleteModal();
      }
    });

    // Remarks modal
    this.elements.closeRemarksModal?.addEventListener("click", () =>
      this.closeRemarksModal()
    );
    this.elements.saveRemarks?.addEventListener("click", () =>
      this.saveRemarksData()
    );
    this.elements.remarksModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.remarksModal) {
        this.closeRemarksModal();
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        if (
          !this.elements.sidebar.contains(e.target) &&
          !this.elements.sidebarToggle.contains(e.target) &&
          this.elements.sidebar.classList.contains("sidebar-open")
        ) {
          this.elements.sidebar.classList.remove("sidebar-open");
        }
      }
    });

    // Remarks Filter
    this.elements.remarksFilter?.addEventListener("click", () =>
      this.openRemarksFilterModal()
    );
    document
      .getElementById("closeRemarksFilterModal")
      ?.addEventListener("click", () => this.closeRemarksFilterModal());
    this.elements.remarksFilterModal?.addEventListener("click", (e) => {
      if (e.target === this.elements.remarksFilterModal) {
        this.closeRemarksFilterModal();
      }
    });
  }

  // Render the appropriate table
  render() {
    if (this.currentFilter.purpose === "Tuition Fees") {
      this.renderTuitionTable();
    } else if (this.currentFilter.purpose === "Educational Tour") {
      this.renderTourTable();
    }
  }

  // Filter tuition transactions
  getFilteredTuitionData() {
    let filtered = [...this.data.tuitionTransactions];

    // Apply basic year filter
    if (this.currentFilter.year) {
      const yearNum = this.currentFilter.year;
      filtered = filtered.filter((t) => t.year.startsWith(yearNum));
    }

    // Apply search filter
    if (this.currentFilter.search) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(this.currentFilter.search) ||
          t.id.toLowerCase().includes(this.currentFilter.search)
      );
    }

    // Apply advanced filters
    if (this.advancedFilters.program) {
      filtered = filtered.filter(
        (t) => t.program === this.advancedFilters.program
      );
    }

    if (this.advancedFilters.yearLevel) {
      const yearNum = this.advancedFilters.yearLevel;
      filtered = filtered.filter((t) => t.year.startsWith(yearNum));
    }

    if (this.advancedFilters.status) {
      filtered = filtered.filter(
        (t) => t.status === this.advancedFilters.status
      );
    }

    // Apply sorting
    if (this.currentSort) {
      filtered = this.sortData(filtered);
    }

    return filtered;
  }

  // Sort data based on current sort type
  sortData(data) {
    const sorted = [...data];

    switch (this.currentSort) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "id-asc":
        return sorted.sort((a, b) => a.id.localeCompare(b.id));
      case "id-desc":
        return sorted.sort((a, b) => b.id.localeCompare(a.id));
      case "date-asc":
        return sorted.sort(
          (a, b) => new Date(a.date || 0) - new Date(b.date || 0)
        );
      case "date-desc":
        return sorted.sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );
      default:
        return sorted;
    }
  }

  // Render Tuition Fees table
  renderTuitionTable() {
    const data = this.getFilteredTuitionData();

    const headerHtml = `
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

    const rowsHtml = data
      .map(
        (tr, index) => `
      <tr data-index="${index}">
        <td><input type="text" value="${
          tr.id
        }" placeholder="ID" data-field="id"></td>
        <td><input type="text" value="${
          tr.name
        }" placeholder="Name" data-field="name"></td>
        <td><input type="text" value="${
          tr.program
        }" placeholder="Program" data-field="program"></td>
        <td><input type="text" value="${
          tr.year
        }" placeholder="Year" data-field="year"></td>
        <td>
          <div class="date-input-wrapper">
            <input type="text" value="${
              tr.date
            }" data-field="date" placeholder="yy/mm/dd">
            <i class="fa-solid fa-calendar calendar-icon"></i>
          </div>
        </td>
        <td>
          <div class="date-input-wrapper">
            <input type="text" value="${
              tr.duration
            }" data-field="duration" placeholder="yy/mm/dd">
            <i class="fa-solid fa-calendar-days calendar-icon"></i>
          </div>
        </td>
        <td>${tr.purpose}</td>
        <td>
          <select data-field="type">
            <option ${tr.type === "Scholar" ? "selected" : ""}>Scholar</option>
            <option ${tr.type === "Regular" ? "selected" : ""}>Regular</option>
          </select>
        </td>
        <td><a href="#" class="view-file" data-file="${
          tr.file
        }">View File</a></td>
        <td>
          <select data-field="mop">
            <option ${tr.mop === "Walk-in" ? "selected" : ""}>Walk-in</option>
            <option ${tr.mop === "GCASH" ? "selected" : ""}>GCASH</option>
            <option ${tr.mop === "Bank" ? "selected" : ""}>Bank</option>
          </select>
        </td>
        <td>
          <select data-field="status">
            <option ${tr.status === "Paid" ? "selected" : ""}>Paid</option>
            <option ${tr.status === "Unpaid" ? "selected" : ""}>Unpaid</option>
          </select>
        </td>
        <td class="action-icons">
          <i class="fa-solid fa-eye view-details" data-index="${index}" title="View"></i>
          <i class="fa-solid fa-edit edit-row" data-index="${index}" title="Edit"></i>
          <i class="fa-solid fa-trash-can delete-row" data-index="${index}" title="Delete"></i>
          <i class="fa-solid fa-clipboard remarks-row" data-index="${index}" title="Remarks"></i>
        </td>
      </tr>
    `
      )
      .join("");

    this.elements.tableBody.innerHTML = headerHtml + rowsHtml;
    this.bindTableEvents();
  }

  // Render Educational Tour table
  renderTourTable() {
    const data = this.data.tourTransactions;

    const headerHtml = `
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

    const rowsHtml = data
      .map(
        (tr, index) => `
      <tr data-index="${index}">
        <td><input type="text" value="${tr.id}" placeholder="ID" data-field="id"></td>
        <td><input type="text" value="${tr.program}" placeholder="Program" data-field="program"></td>
        <td><input type="text" value="${tr.details}" placeholder="Details" data-field="details"></td>
        <td>
          <div class="date-input-wrapper">
            <input type="text" value="${tr.duration}" data-field="duration" placeholder="yy/mm/dd">
            <i class="fa-solid fa-calendar calendar-icon"></i>
          </div>
        </td>
        <td><input type="text" value="${tr.participants}" placeholder="Participants" data-field="participants"></td>
        <td><input type="number" value="${tr.amount}" placeholder="Amount" data-field="amount"></td>
        <td><input type="number" value="${tr.down}" placeholder="Down" data-field="down"></td>
        <td><input type="number" value="${tr.penalty}" placeholder="Penalty" data-field="penalty"></td>
        <td class="action-icons">
          <i class="fa-solid fa-eye view-details" data-index="${index}" title="View"></i>
          <i class="fa-solid fa-edit edit-row" data-index="${index}" title="Edit"></i>
          <i class="fa-solid fa-trash-can delete-row" data-index="${index}" title="Delete"></i>
          <i class="fa-solid fa-clipboard remarks-row" data-index="${index}" title="Remarks"></i>
        </td>
      </tr>
    `
      )
      .join("");

    this.elements.tableBody.innerHTML = headerHtml + rowsHtml;
    this.bindTableEvents();
  }

  // Bind table-specific events
  bindTableEvents() {
    // Update data on input change
    this.elements.tableBody
      .querySelectorAll("input:not(.flatpickr-input), select")
      .forEach((input) => {
        input.addEventListener("change", (e) => this.updateData(e));
      });

    // View details buttons
    this.elements.tableBody.querySelectorAll(".view-details").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        this.viewTransactionDetails(index);
      });
    });

    // Edit buttons
    this.elements.tableBody.querySelectorAll(".edit-row").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        this.openEditModal(index);
      });
    });

    // Delete buttons
    this.elements.tableBody.querySelectorAll(".delete-row").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        this.openDeleteModal(index);
      });
    });

    // Remarks buttons
    this.elements.tableBody.querySelectorAll(".remarks-row").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        this.openRemarksModal(index);
      });
    });

    // View file
    this.elements.tableBody.querySelectorAll(".view-file").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const file = e.target.dataset.file;
        this.showFileModal(file);
      });
    });

    // Initialize Flatpickr for date inputs
    this.initializeDatePickers();
  }

  // Initialize Flatpickr date pickers
  initializeDatePickers() {
    // Standard date picker for "Date" column
    const dateInputs = this.elements.tableBody.querySelectorAll(
      'input[data-field="date"]'
    );
    dateInputs.forEach((input) => {
      flatpickr(input, {
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "M j, Y",
        animate: true,
        theme: "light",
        onChange: (selectedDates, dateStr, instance) => {
          const event = new Event("change", { bubbles: true });
          input.dispatchEvent(event);
        },
      });
    });

    // Range date picker for "Duration" column
    const durationInputs = this.elements.tableBody.querySelectorAll(
      'input[data-field="duration"]'
    );
    durationInputs.forEach((input) => {
      flatpickr(input, {
        mode: "range",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "M j, Y",
        animate: true,
        theme: "light",
        showMonths: 2,
        locale: {
          weekdays: {
            shorthand: ["S", "M", "T", "W", "T", "F", "S"],
            longhand: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          },
        },
        onChange: (selectedDates, dateStr, instance) => {
          const event = new Event("change", { bubbles: true });
          input.dispatchEvent(event);
        },
      });
    });
  }

  // Update transaction data
  updateData(event) {
    const input = event.target;
    const row = input.closest("tr");
    const index = parseInt(row.dataset.index);
    const field = input.dataset.field;
    const value = input.value;

    if (this.currentFilter.purpose === "Tuition Fees") {
      const filtered = this.getFilteredTuitionData();
      const originalIndex = this.data.tuitionTransactions.indexOf(
        filtered[index]
      );
      if (originalIndex !== -1) {
        this.data.tuitionTransactions[originalIndex][field] = value;
      }
    } else if (this.currentFilter.purpose === "Educational Tour") {
      if (this.data.tourTransactions[index]) {
        this.data.tourTransactions[index][field] = value;
      }
    }
  }

  // Add new transaction
  addTransaction() {
    if (this.currentFilter.purpose === "Tuition Fees") {
      this.data.tuitionTransactions.push({
        id: "",
        name: "",
        program: "",
        year: "",
        date: "",
        duration: "",
        purpose: "Tuition Fees",
        type: "Regular",
        file: "",
        mop: "Walk-in",
        status: "Unpaid",
      });
    } else if (this.currentFilter.purpose === "Educational Tour") {
      this.data.tourTransactions.push({
        id: "",
        program: "",
        details: "",
        duration: "",
        participants: "",
        amount: "",
        down: "",
        penalty: "",
      });
    }
    this.render();
  }

  // View transaction details
  viewTransactionDetails(index) {
    const filtered = this.getFilteredTuitionData();
    const transaction = filtered[index];

    if (!transaction) return;

    // Populate modal with transaction data
    document.getElementById("viewFullName").textContent = transaction.name;
    document.getElementById("viewStudentId").textContent = transaction.id;
    document.getElementById("viewYearLevel").textContent = transaction.year;
    document.getElementById("viewProgram").textContent = transaction.program;
    document.getElementById("viewStatus").textContent = transaction.status;
    document.getElementById(
      "viewStatus"
    ).className = `status-badge ${transaction.status.toLowerCase()}`;
    document.getElementById("viewPayment").textContent = transaction.status;
    document.getElementById(
      "viewPayment"
    ).className = `status-badge ${transaction.status.toLowerCase()}`;
    document.getElementById("viewDate").textContent = transaction.date || "N/A";
    document.getElementById("viewTransactionNo").textContent = `T${
      transaction.id
    }${Date.now()}`.slice(0, 10);
    document.getElementById("viewReceiptDate").textContent =
      new Date().toLocaleDateString();
    document.getElementById("viewPaymentMethod").textContent = transaction.mop;
    document.getElementById("viewPurpose").textContent = transaction.purpose;
    document.getElementById("viewType").textContent = transaction.type;

    this.elements.viewDetailsModal.classList.add("show");
  }

  // Close view details modal
  closeViewDetails() {
    this.elements.viewDetailsModal.classList.remove("show");
  }

  // Open edit modal
  openEditModal(index) {
    this.currentEditIndex = index;
    this.elements.editModal.classList.add("show");
  }

  // Close edit modal
  closeEditModal() {
    this.elements.editModal.classList.remove("show");
    this.currentEditIndex = null;
  }

  // Confirm edit
  confirmEdit() {
    if (this.currentEditIndex !== null) {
      // In a real application, you would apply the edits here
      alert("Changes saved successfully!");
      this.closeEditModal();
    }
  }

  // Open delete modal
  openDeleteModal(index) {
    this.currentDeleteIndex = index;
    this.elements.deleteModal.classList.add("show");
  }

  // Close delete modal
  closeDeleteModal() {
    this.elements.deleteModal.classList.remove("show");
    this.currentDeleteIndex = null;
  }

  // Confirm delete
  confirmDelete() {
    if (this.currentDeleteIndex !== null) {
      if (this.currentFilter.purpose === "Tuition Fees") {
        const filtered = this.getFilteredTuitionData();
        const originalIndex = this.data.tuitionTransactions.indexOf(
          filtered[this.currentDeleteIndex]
        );
        if (originalIndex !== -1) {
          this.data.tuitionTransactions.splice(originalIndex, 1);
        }
      } else if (this.currentFilter.purpose === "Educational Tour") {
        this.data.tourTransactions.splice(this.currentDeleteIndex, 1);
      }
      this.render();
      this.closeDeleteModal();
    }
  }

  // Open remarks modal
  openRemarksModal(index) {
    this.currentRemarksIndex = index;
    this.elements.remarksSection.value = "";
    this.elements.remarksText.value = "";
    this.elements.remarksModal.classList.add("show");
  }

  // Close remarks modal
  closeRemarksModal() {
    this.elements.remarksModal.classList.remove("show");
    this.currentRemarksIndex = null;
  }

  // Save remarks
  saveRemarksData() {
    if (this.currentRemarksIndex !== null) {
      const section = this.elements.remarksSection.value;
      const remarks = this.elements.remarksText.value;

      if (remarks.trim()) {
        // In a real application, you would save this to the transaction record
        alert(
          `Remarks saved successfully!\nSection: ${
            section || "General Requirements"
          }\nNote: ${remarks}`
        );
        this.closeRemarksModal();
      } else {
        alert("Please add a note or remark before saving.");
      }
    }
  }

  // Delete transaction (kept for compatibility)
  deleteTransaction(index) {
    this.openDeleteModal(index);
  }

  // Show file modal
  showFileModal(filename) {
    this.elements.modalImg.src = `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(
      filename
    )}`;
    this.elements.modal.classList.add("show");
  }

  // Close modal
  closeModal() {
    this.elements.modal.classList.remove("show");
  }

  // Open advanced filter modal
  openAdvancedFilter() {
    this.elements.advancedFilterModal.classList.add("show");
  }

  // Close advanced filter modal
  closeAdvancedFilter() {
    this.elements.advancedFilterModal.classList.remove("show");
  }

  // Apply advanced filters
  applyAdvancedFilters() {
    this.advancedFilters.year = this.elements.filterYear.value;
    this.advancedFilters.month = this.elements.filterMonth.value;
    this.advancedFilters.program = this.elements.filterProgram.value;
    this.advancedFilters.yearLevel = this.elements.filterYearLevel.value;
    this.advancedFilters.purpose = this.elements.filterPurpose.value;
    this.advancedFilters.status = this.elements.filterStatus.value;

    this.render();
    this.closeAdvancedFilter();
  }

  // Open export modal
  openExportModal() {
    this.elements.exportModal.classList.add("show");
  }

  // Close export modal
  closeExportModal() {
    this.elements.exportModal.classList.remove("show");
  }

  // Export data
  exportData() {
    const selectedType = document.querySelector(
      'input[name="exportType"]:checked'
    ).value;

    switch (selectedType) {
      case "pdf":
        alert("Exporting to PDF... (This would generate a PDF file)");
        break;
      case "excel":
        alert("Exporting to Excel... (This would generate an Excel file)");
        break;
      case "print":
        window.print();
        break;
    }

    this.closeExportModal();
  }

  // Open sort modal
  openSortModal() {
    this.elements.sortModal.classList.add("show");
  }

  // Close sort modal
  closeSortModal() {
    this.elements.sortModal.classList.remove("show");
  }

  // Apply sorting
  applySorting(sortType) {
    this.currentSort = sortType;
    this.render();
  }

  // Open Remarks Filter modal
  openRemarksFilterModal() {
    this.elements.remarksFilterModal.classList.add("show");
  }

  // Close Remarks Filter modal
  closeRemarksFilterModal() {
    this.elements.remarksFilterModal.classList.remove("show");
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new DashboardController();
});
