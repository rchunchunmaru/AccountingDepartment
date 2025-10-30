// Get elements
const remarksPanel = document.getElementById('remarksPanel');
const remarksBackdrop = document.getElementById('remarksBackdrop');
const showRemarksBtn = document.getElementById('showRemarks');
const closeRemarksBtn = document.getElementById('closeRemarks');

// Show remarks modal
showRemarksBtn.addEventListener('click', function() {
    remarksPanel.classList.add('ADD_show');
    remarksBackdrop.classList.add('ADD_show');
});

// Hide remarks modal
function hideRemarks() {
    remarksPanel.classList.remove('ADD_show');
    remarksBackdrop.classList.remove('ADD_show');
}

closeRemarksBtn.addEventListener('click', hideRemarks);

// Hide remarks when clicking on backdrop
remarksBackdrop.addEventListener('click', hideRemarks);

// Prevent modal from closing when clicking inside the panel
remarksPanel.addEventListener('click', function(event) {
    event.stopPropagation();
});
