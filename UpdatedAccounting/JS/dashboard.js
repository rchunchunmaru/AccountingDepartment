//-----------------BUTTONS------------------
document.querySelectorAll('.submenu-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.preventDefault(); // prevent link navigation
    const parentLi = this.parentElement;


    // Toggle the clicked one
    parentLi.classList.toggle('open');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dboardSidebar = document.querySelector('.dashboard-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');

  toggleButton.addEventListener('click', () => {
    dboardSidebar.classList.toggle('sidebar-open');
  })});

// Close sidebar when clicking outside (for mobile)
document.addEventListener('click', (e) => {
  const dboardSidebar = document.querySelector('.dashboard-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');
  if (!dboardSidebar.contains(e.target) && !toggleButton.contains(e.target)) {
    dboardSidebar.classList.remove('sidebar-open');
  } });


// ----------------Profile Image Upload and Modal Logic----------------
  
const profileCircle = document.getElementById("profileCircle");
const uploadInput = document.getElementById("uploadImg");
const viewProfileBtn = document.getElementById("viewProfileBtn");
const modal = document.getElementById("profileModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

let uploadedImg = "https://via.placeholder.com/300x300.png?text=Photo";

// SINGLE upload handler - no duplicates
profileCircle.onclick = () => uploadInput.click();

uploadInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedImg = ev.target.result;
      
      // Update both background image AND img element for consistency
      profileCircle.style.backgroundImage = `url(${uploadedImg})`;
      profileCircle.classList.remove('no-image');
      
      // Also add img element so it works with both CSS approaches
      profileCircle.innerHTML = `<img src="${uploadedImg}" alt="Profile Picture">`;
    };
    reader.readAsDataURL(file);
  }
};

// Your modal functionality - KEPT AS IS
viewProfileBtn.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  modalImg.src = uploadedImg;
};

closeModal.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Registrar submenu caret toggle for dynamically loaded sidebar
function initRegistrarCaretToggle() {
  document.querySelectorAll('.submenu-caret-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const parentLi = this.closest('.list.has-submenu');
      if (parentLi) {
        // Remove active from all .list
        document.querySelectorAll('.dashboard-sidebar .list').forEach(li => li.classList.remove('active'));
        parentLi.classList.add('active');
        parentLi.classList.toggle('open');
      }
    });
  });
// ...existing code...

// Set active state on page load based on URL
function setSidebarActiveByUrl() {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.dashboard-sidebar nav ul li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.indexOf(current) !== -1) {
      const parentLi = link.closest('li.list');
      if (parentLi) {
        document.querySelectorAll('.dashboard-sidebar .list').forEach(li => li.classList.remove('active'));
        parentLi.classList.add('active');
      }
    }
  });
}
window.setSidebarActiveByUrl = setSidebarActiveByUrl;
}

// Make it available globally for include.js
window.initRegistrarCaretToggle = initRegistrarCaretToggle;


//-----------------SUBMENU TOGGLE (for dynamically loaded sidebar)------------------
function initSidebarSubmenus() {
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parentLi = this.parentElement;
      parentLi.classList.toggle('open');
    });
  });
}

//-----------------ACTIVE LINK HANDLER (for dynamically loaded sidebar)------------------
function initSidebarActiveLinks() {
  const allLinks = document.querySelectorAll('.dashboard-sidebar nav ul li a, .breadcrumb-link, .list');
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Remove active from all
      document.querySelectorAll('.dashboard-sidebar nav ul li a, .breadcrumb a, .list')
        .forEach(a => a.classList.remove('active'));
      // Add active to clicked
      this.classList.add('active');
    });
  });
}

/*
// Make them available globally for include.js
window.initSidebarSubmenus = initSidebarSubmenus;
window.initSidebarActiveLinks = initSidebarActiveLinks;

document.addEventListener('DOMContentLoaded', () => {
  const dboardSidebar = document.querySelector('.dashboard-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');

  toggleButton.addEventListener('click', () => {
    dboardSidebar.classList.toggle('sidebar-open');
  })});*/

// Close sidebar when clicking outside (for mobile)
function initSidebarToggle() {
  const dboardSidebar = document.querySelector('.dashboard-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');

  if (toggleButton && dboardSidebar) {
    toggleButton.addEventListener('click', () => {
      dboardSidebar.classList.toggle('sidebar-open');
    });
  }
}
// Expose globally for include.js
window.initSidebarToggle = initSidebarToggle;


// ----------------Profile Image Upload and Modal Logic----------------
function initProfileUpload() {
  const profileCircle = document.getElementById("profileCircle");
  const uploadInput = document.getElementById("uploadImg");
  const viewProfileBtn = document.getElementById("viewProfileBtn");
  const modal = document.getElementById("profileModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  if (!profileCircle || !uploadInput) return; // safety check

  let uploadedImg = "https://via.placeholder.com/300x300.png?text=Photo";

  // SINGLE upload handler - no duplicates
  profileCircle.onclick = () => uploadInput.click();

  uploadInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedImg = ev.target.result;

        profileCircle.style.backgroundImage = `url(${uploadedImg})`;
        profileCircle.classList.remove("no-image");
        profileCircle.innerHTML = `<img src="${uploadedImg}" alt="Profile Picture">`;
      };
      reader.readAsDataURL(file);
    }
  };

  // Modal logic
  viewProfileBtn.onclick = (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    modalImg.src = uploadedImg;
  };

  closeModal.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}

// ✅ Expose globally
window.initProfileUpload = initProfileUpload;

// Unified active class handler for sidebar and submenu links
function initSidebarActiveLinks() {
  // Sidebar and submenu links
  const sidebarLinks = document.querySelectorAll('.dashboard-sidebar nav ul > li.list > a');
  const submenuLinks = document.querySelectorAll('.dashboard-sidebar .sub-menu a');
  const allListItems = document.querySelectorAll('.dashboard-sidebar nav ul > li.list');

  // Sidebar main links
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Remove active from all main .list items
      allListItems.forEach(li => li.classList.remove('active'));
      // Add active to parent <li> of clicked link
      const parentLi = this.closest('li.list');
      if (parentLi) parentLi.classList.add('active');
    });
  });

  // Submenu links
  submenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Remove active from all submenu links
      submenuLinks.forEach(a => a.classList.remove('active'));
      // Add active to clicked
      this.classList.add('active');
      // Also open the parent .list.has-submenu
      const parentLi = this.closest('.list.has-submenu');
      if (parentLi) {
        document.querySelectorAll('.dashboard-sidebar .list.has-submenu').forEach(li => li.classList.remove('open'));
        parentLi.classList.add('open');
      }
    });
  });
}

// Make it available globally for include.js
window.initSidebarActiveLinks = initSidebarActiveLinks;
// Notifications Logic 
const notifBtn = document.getElementById("myreq-notificationBtn");
const notifModal = document.getElementById("myreq-notificationModal");
const notifContent = document.getElementById("myreq-notificationContent");
const toggleIcon = document.getElementById("myreq-toggleModalState").querySelector("i");
let isMaximized = false;

// Open modal
notifBtn.onclick = () => {
  notifModal.style.display = "block";
  document.body.style.overflow = "hidden";
  notifContent.classList.remove("maximized");
  isMaximized = false;
  toggleIcon.className = "fas fa-expand";
};

// Toggle expand/compress
document.getElementById("myreq-toggleModalState").onclick = () => {
  if (!isMaximized) {
    notifContent.classList.add("maximized");
    toggleIcon.className = "fas fa-compress";
    isMaximized = true;
  } else {
    notifContent.classList.remove("maximized");
    toggleIcon.className = "fas fa-expand";
    isMaximized = false;
  }
};

// Detail modal
document.querySelectorAll(".myreq-viewBtn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.getElementById("myreq-detailTitle").textContent = this.dataset.title;
    document.getElementById("myreq-detailMessage").textContent = this.dataset.message;
    document.getElementById("myreq-detailModal").style.display = "block";
  });
});
document.getElementById("myreq-closeDetail").onclick = () => {
document.getElementById("myreq-detailModal").style.display = "none";
};

// Close when clicking outside
window.onclick = (event) => {
  if (event.target == notifModal) {
    notifModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (event.target == document.getElementById("myreq-detailModal")) {
    document.getElementById("myreq-detailModal").style.display = "none";
  }
};


// === Example data (can be replaced with data from backend) ===
const reqstatsRequest = {
  requestId: "REQ-00123",
  dateRequested: "01/24/2025",
  pickupMethod: "In-Campus Pickup",
  purpose: "Scholarship Application",
  docType: "Transcript of Records",
  status: "processing"
};

// === Populate table ===
function openReqstatsModal(clickedStatus) {
  const details = document.getElementById("reqstats-statusDetails");
  if (!details) return;

  // use the stored status (you can later filter based on clickedStatus if needed)
  const storedStatus = reqstatsRequest.status;

  details.innerHTML = `
    <tr>
      <td>
        <span class="reqstats-request-id">${reqstatsRequest.requestId}</span><br/>
        <hr class="reqstats-divider">
        <span class="reqstats-date-requested">Date: <span class="date-value">${reqstatsRequest.dateRequested}</span></span>
      </td>
      <td>
        <b>Pickup Method:</b> ${reqstatsRequest.pickupMethod}<br>
        <b>Purpose:</b> ${reqstatsRequest.purpose}<br>
        <b>Document Type:</b> ${reqstatsRequest.docType}
      </td>
      <td>
        <span class="reqstats-status-badge reqstats-status-${storedStatus}">
          ${storedStatus}
        </span>
      </td>
      <td>
        <button class="reqstats-remarks-btn" onclick="openReqstatsRemarksModal()">Remarks</button>
      </td>
    </tr>
  `;
}

// === Open/close remarks modal ===
function openReqstatsRemarksModal() {
  document.getElementById("reqstats-remarksModal").style.display = "block";
  document.body.style.overflow = "hidden"; 
}

function closeReqstatsRemarksModal() {
  document.getElementById("reqstats-remarksModal").style.display = "none";
  document.body.style.overflow = "auto"; // restore scroll
}

// === Optional: run once on page load to populate the table ===
document.addEventListener("DOMContentLoaded", () => {
  openReqstatsModal();
});