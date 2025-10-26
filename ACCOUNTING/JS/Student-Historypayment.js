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

// Search functionality for transaction table
document.getElementById("searchInput").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("#transactionBody tr");
  
  rows.forEach(row => {
    let text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});

// ----------------- Receipt Modal Logic -----------------
const receiptModal = document.getElementById("receiptModal");
const closeBtn = document.getElementById("btnClose");

document.querySelectorAll("#transactionBody .fa-eye").forEach(icon => {
  icon.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");

    // Extract data from the row
    const id = cells[0].textContent;
    const date = cells[1].textContent;
    const paymentFor = cells[2].textContent;
    const method = cells[3].textContent;
    const status = cells[4].textContent;
    const ref = cells[5].textContent;

    // Fill receipt (new design IDs)
    document.getElementById("rcpName").textContent = "Sean Patric"; // replace with dynamic if needed
    document.getElementById("rcpStudentNum").textContent = "01001";
    document.getElementById("rcpLevel").textContent = "College - Bachelor of Science and Technology / 4th Year";
    document.getElementById("rcpMethod").textContent = method;
    document.getElementById("rcpPurpose").textContent = paymentFor;

    document.getElementById("rcpDesc").textContent = paymentFor;
    document.getElementById("rcpAmount").textContent = ref;
    document.getElementById("rcpPaid").textContent = ref;
    document.getElementById("rcpBalance").textContent = status === "Paid" ? "0" : ref;

    document.getElementById("rcpTrans").textContent = id;
    document.getElementById("rcpDate").textContent = date;
    document.getElementById("rcpTotal").textContent = ref;
    document.getElementById("rcpPaid2").textContent = ref;
    document.getElementById("rcpBal2").textContent = status === "Paid" ? "0" : ref;

    // Show modal
    receiptModal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  receiptModal.style.display = "none";
});



