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