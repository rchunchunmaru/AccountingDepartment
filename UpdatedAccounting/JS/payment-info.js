// payment-info.js — Clean Fixed Version
document.addEventListener("DOMContentLoaded", () => {
  const programSelect = document.getElementById("program");
  const tesdaSection = document.getElementById("tesda-section");
  const purposeSelect = document.getElementById("purpose");
  const amountGroup = document.getElementById("amount-group");
  const amountInput = document.getElementById("amount");
  const proceedBtn = document.getElementById("proceed-btn");
  const fileInput = document.getElementById("payment-receipt");

  // === Show/hide TESDA section ===
  programSelect.addEventListener("change", () => {
    if (programSelect.value === "TESDA PROGRAM") {
      tesdaSection.style.display = "block";
    } else {
      tesdaSection.style.display = "none";
      amountGroup.style.display = "none";
      amountInput.value = "";
      amountInput.removeAttribute("readonly");
    }
    validateForm();
  });

  // === Show/hide amount based on purpose ===
  purposeSelect.addEventListener("change", () => {
    if (purposeSelect.value === "Assessment Fee") {
      amountGroup.style.display = "block";
      amountInput.value = "₱ 1,500";
      amountInput.setAttribute("readonly", true);
    } else if (purposeSelect.value) {
      amountGroup.style.display = "block";
      amountInput.value = "";
      amountInput.removeAttribute("readonly");
    } else {
      amountGroup.style.display = "none";
      amountInput.value = "";
    }
    validateForm();
  });

  // === Validation ===
  const requiredFields = [
    "campus",
    "program",
    "tesda-program",
    "purpose",
    "applicant-id",
    "surname",
    "firstname",
    "email",
    "amount",
    "payment-method",
    "reference-no",
  ];

  function validateForm() {
    let allFilled = true;
    for (const id of requiredFields) {
      const field = document.getElementById(id);
      if (field && field.offsetParent !== null && !field.value.trim()) {
        allFilled = false;
      }
    }
    if (!fileInput.files.length) allFilled = false;
    proceedBtn.disabled = !allFilled;
  }

  document.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", validateForm);
    el.addEventListener("change", validateForm);
  });
  fileInput.addEventListener("change", validateForm);

  // === File Upload ===
  const dropArea = document.getElementById("drop-area");
  const fileNameDisplay = document.getElementById("file-name");
  const uploadContent = document.getElementById("upload-content");

  uploadContent.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      fileNameDisplay.textContent = `📄 ${file.name}`;
      dropArea.classList.add("uploaded");
    } else {
      fileNameDisplay.textContent = "";
      dropArea.classList.remove("uploaded");
    }
    validateForm();
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
  });
  dropArea.addEventListener("dragleave", () => dropArea.classList.remove("dragover"));
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      fileNameDisplay.textContent = `📄 ${e.dataTransfer.files[0].name}`;
      dropArea.classList.add("uploaded");
    }
    validateForm();
  });

  // === Confirmation Modal ===
  const confirmationModal = document.getElementById("confirmationModal");
  const cancelModalBtn = document.getElementById("cancelModalBtn");
  const closeModalBtn = document.getElementById("ADD_closeModalBtn");

  proceedBtn.addEventListener("click", () => {
    // Compile full name
    const fullName = [
      document.getElementById("surname")?.value.trim(),
      document.getElementById("firstname")?.value.trim(),
      document.getElementById("middlename")?.value.trim(),
      document.getElementById("suffix")?.value.trim(),
    ]
      .filter(Boolean)
      .join(" ");
    document.getElementById("applicantName").textContent = fullName || "-";

    // Display simple values
    const fields = {
      emailDisplay: "email",
      campusDisplay: "campus",
      programDisplay: "program",
      tesdaProgramDisplay: "tesda-program",
      purposeDisplay: "purpose",
      amountDisplay: "amount",
      paymentMethodDisplay: "payment-method",
      referenceNoDisplay: "reference-no",
    };
    Object.entries(fields).forEach(([displayId, inputId]) => {
      const input = document.getElementById(inputId);
      const display = document.getElementById(displayId);
      display.textContent = input ? input.value.trim() || "-" : "-";
    });

    // Uploaded file name
    const receiptDisplay = document.getElementById("receiptDisplay");
    receiptDisplay.textContent = fileInput.files.length
      ? fileInput.files[0].name
      : "No file uploaded";

    confirmationModal.style.display = "block";
  });

  [cancelModalBtn, closeModalBtn].forEach((btn) =>
    btn.addEventListener("click", () => (confirmationModal.style.display = "none"))
  );

  window.addEventListener("click", (e) => {
    if (e.target === confirmationModal) confirmationModal.style.display = "none";
  });
});

// === Caution Modal & Notification ===
document.addEventListener("DOMContentLoaded", () => {
  const confirmationModal = document.getElementById("confirmationModal");
  const cautionModal = document.getElementById("cautionModal");
  const successNotif = document.getElementById("successNotif");
  const finalConfirmBtn = document.getElementById("FINALconfirmModalBtn");
  const goBackBtn = document.getElementById("goBackBtn");
  const confirmSendBtn = document.getElementById("confirmSendBtn");

  // When "Confirm" is clicked inside the receipt modal
  finalConfirmBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none";
    cautionModal.style.display = "block";
  });

  // "Go Back" just closes caution and returns to the confirmation preview
  goBackBtn.addEventListener("click", () => {
    cautionModal.style.display = "none";
    confirmationModal.style.display = "block";
  });

  // "Yes, Submit" proceeds to success notification
  confirmSendBtn.addEventListener("click", () => {
    cautionModal.style.display = "none";
    successNotif.style.display = "block";

    // Auto-close the success notif after a few seconds
    setTimeout(() => {
      successNotif.style.display = "none";
    }, 2500);
  });

  // Click outside modal to close
  window.addEventListener("click", (e) => {
    if (e.target === cautionModal) cautionModal.style.display = "none";
    if (e.target === successNotif) successNotif.style.display = "none";
  });
});

