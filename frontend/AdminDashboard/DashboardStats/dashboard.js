// dashboard.js (clean rebuilt version)

document.addEventListener('DOMContentLoaded', () => {

  // ----------------- SUBMENU TOGGLE -----------------
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parentLi = this.parentElement;
      if (parentLi) parentLi.classList.toggle('open');
    });
  });

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
