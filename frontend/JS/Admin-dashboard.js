// dashboard.js (clean rebuilt version)

document.addEventListener('DOMContentLoaded', () => {

  // ----------------- SIDEBAR TOGGLE -----------------
  const dboardSidebar = document.querySelector('.dashboard-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');

  if (toggleButton && dboardSidebar) {
    toggleButton.addEventListener('click', () => {
      dboardSidebar.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!dboardSidebar.contains(e.target) && !toggleButton.contains(e.target)) {
        dboardSidebar.classList.remove('sidebar-open');
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
    profileCircle.addEventListener('click', () => uploadInput.click());
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedImg = ev.target.result;
        if (profileCircle) {
          profileCircle.style.backgroundImage = `url(${uploadedImg})`;
          profileCircle.classList.remove('no-image');
          profileCircle.innerHTML = `<img src="${uploadedImg}" alt="Profile Picture">`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (viewProfileBtn && modal && modalImg) {
    viewProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      modalImg.src = uploadedImg;
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => modal.style.display = "none");
  }

  // Close profile modal when clicking outside
  window.addEventListener('click', (e) => {
    if (modal && e.target === modal) modal.style.display = "none";
  });

  // ----------------- TRANSACTION STATUS -----------------

  // Dummy request data
  const requestsData = {
    pending: [
      { text: "Sean Patrick Remejio request a G-cash Payment", date: "2025-10-06" },
      { text: "Jane Doe request a G-cash Payment", date: "2025-10-05" },
      { text: "Michael Cruz request a TOR", date: "2025-10-04" }
    ],
    completed: [
      { text: "Mark Santos tuition fee completed", date: "2025-10-03" },
      { text: "Liza Ramos certificate issued", date: "2025-10-02" }
    ],
    rejected: [
      { text: "Ana Dela Cruz request rejected", date: "2025-10-01" }
    ]
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
  document.querySelectorAll('.status-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.id; // pendingCard, completedCard, rejectedCard
      let type = "pending";
      if (id === "completedCard") type = "completed";
      if (id === "rejectedCard") type = "rejected";

      // Update modal title
      statusTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1) + " Requests";

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
    closeStatusModal.addEventListener('click', () => statusModal.style.display = "none");
  }

  // Eye icon click → open secondary modal
  document.addEventListener('click', (e) => {
    if (e.target.matches('.fa-eye')) {
      if (requestModal) requestModal.style.display = "flex";
    }
  });

  if (closeRequestModal && requestModal) {
    closeRequestModal.addEventListener('click', () => requestModal.style.display = "none");
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (statusModal && e.target === statusModal) statusModal.style.display = "none";
    if (requestModal && e.target === requestModal) requestModal.style.display = "none";
  });

  // Preload numbers into cards on page load
  const pendingCard = document.getElementById("pendingCard");
  const completedCard = document.getElementById("completedCard");
  const rejectedCard = document.getElementById("rejectedCard");

  if (pendingCard) pendingCard.querySelector("p").textContent = requestsData.pending.length;
  if (completedCard) completedCard.querySelector("p").textContent = requestsData.completed.length;
  if (rejectedCard) rejectedCard.querySelector("p").textContent = requestsData.rejected.length;

}); // end DOMContentLoaded

// Eye icon click → open details modal (only for pending requests)
// Eye icon click → open correct modal depending on request type
document.addEventListener('click', (e) => {
  if (e.target.matches('.fa-eye')) {
    const type = e.target.dataset.type; // "pending", "completed", or "rejected"

    // Always close the table modal first
    if (requestModal) requestModal.style.display = "none";

    if (type === "pending") {
      // ✅ Show editable transaction modal
      const transactionModal = document.getElementById("transactionDetailsModal");
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
  closeTransactionModal.addEventListener('click', () => transactionModal.style.display = "none");
}

if (cancelTransaction) {
  cancelTransaction.addEventListener('click', () => transactionModal.style.display = "none");
}

if (submitTransaction) {
  submitTransaction.addEventListener('click', () => {
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
  rejectTransaction.addEventListener('click', () => {
    // Close the transaction details modal first
    const transactionModal = document.getElementById("transactionDetailsModal");
    if (transactionModal) transactionModal.style.display = "none";
    rejectModal.style.display = "flex";
  });
}

if (closeRejectModal && rejectModal) {
  closeRejectModal.addEventListener('click', () => rejectModal.style.display = "none");
}

if (saveReject) {
  saveReject.addEventListener('click', () => {
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
  closeReceiptModal.addEventListener('click', () => {
    receiptModal.style.display = "none";
  });
}

// Allow closing by clicking outside the modal
window.addEventListener('click', (e) => {
  if (receiptModal && e.target === receiptModal) {
    receiptModal.style.display = "none";
  }
});

