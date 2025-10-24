document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Admission_registration_form");
  const openModalBtn = document.getElementById("admission-btn");
  const finalSubmitBtn = document.getElementById("FINALconfirmModalBtn");
  const modal = document.getElementById("confirmationModal");
  

  // When user clicks "Submit" button → run validations and open modal
  openModalBtn.addEventListener("click", function () {

      if (!form.checkValidity()) {
    form.reportValidity(); 
    return; 
  }
    // Run validation checks first
    if (!runErrorChecks()) return;
    if (!runErrorChecks_Mobilenum()) return;
    if (!runErrorChecks_Email()) return;
    if (!runErrorChecks_Zip()) return;

    // Copy all form data to modal preview fields
    document.getElementById("surnameDisplay").value = document.getElementById("mqcqc_surname").value;
    document.getElementById("firstnameDisplay").value = document.getElementById("mqcqc_first_name").value;
    document.getElementById("middlenameDisplay").value = document.getElementById("mqcqc_middle_name").value;
    document.getElementById("suffixDisplay").value = document.getElementById("mqcqc_suffix").value;
    document.getElementById("sexDisplay").value = document.getElementById("mqcqc_sex").value;
    document.getElementById("nationalityDisplay").value = document.getElementById("mqcqc_nationality").value;
    document.getElementById("dobDisplay").value = document.getElementById("mqcqc_date_of_birth").value;

    document.getElementById("houseNoDisplay").value = document.getElementById("mqcqc_house_no").value;
    document.getElementById("streetDisplay").value = document.getElementById("mqcqc_street").value;
    document.getElementById("barangayDisplay").value = document.getElementById("mqcqc_barangay").value;
    document.getElementById("cityDisplay").value = document.getElementById("mqcqc_city").value;
    document.getElementById("regionDisplay").value = document.getElementById("mqcqc_region").value;
    document.getElementById("provinceDisplay").value = document.getElementById("mqcqc_province").value;
    document.getElementById("zipCodeDisplay").value = document.getElementById("mqcqc_zipcode").value;

    document.getElementById("emailDisplay").value = document.getElementById("mqcqc_email_address").value;
    document.getElementById("mobileNoDisplay").value = document.getElementById("mqcqc_mobile_no").value;
    document.getElementById("parentGuardianDisplay").value = document.getElementById("mqcqc_parent_guardian").value;
    document.getElementById("emergencyContactNoDisplay").value = document.getElementById("mqcqc_emergency_contact_no").value;

    document.getElementById("applyingForDisplay").value = document.getElementById("mqcqc_applying_for").value;
    document.getElementById("campusDisplay").value = document.getElementById("mqcqc_campus").value;
    document.getElementById("academicYearDisplay").value = document.getElementById("mqcqc_academic_year").value;
    document.getElementById("academicTermDisplay").value = document.getElementById("mqcqc_academic_term").value;
    document.getElementById("academicProgramDisplay").value = document.getElementById("mqcqc_academic_program").value;
    document.getElementById("studentBackgroundDisplay").value = document.getElementById("mqcqc_student_background").value;
    document.getElementById("student_typeDisplay").value = document.getElementById("mqcqc_student_type").value;

    document.getElementById("schoolTypeDisplay").value = document.getElementById("mqcqc_school_type").value;
    document.getElementById("schoolNameDisplay").value = document.getElementById("mqcqc_name_of_school").value;
    document.getElementById("programStrandDisplay").value = document.getElementById("mqcqc_program_strand").value;
    document.getElementById("dateOfGraduationDisplay").value = document.getElementById("mqcqc_date_of_graduation").value;
    document.getElementById("schoolYearDisplay").value = document.getElementById("mqcqc_school_year").value;
    document.getElementById("yearLevelDisplay").value = document.getElementById("mqcqc_year_level").value;
    document.getElementById("termDisplay").value = document.getElementById("mqcqc_term").value;
    document.getElementById("lrnDisplay").value = document.getElementById("mqcqc_lrn").value;

     const subjectSelects = document.querySelectorAll('select[name="mqcqc_subjects_list[]"]');
const subjectsDisplay = document.getElementById("subjectsDisplay");

// Clear existing subjects display
subjectsDisplay.innerHTML = "";

// Get the selected "Applying For" value
const applyingForValue = document.getElementById("mqcqc_applying_for").value;

// Helper function to detect Basic/Elem/High
function checkIsBasicOrElemOrHigh(value) {
  const val = value.trim().toLowerCase();
  return (
    val.includes("nursery") ||
    val.includes("kinder") ||
    val.includes("preparatory") ||
    val.match(/grade\s*1\b/) ||
    val.match(/grade\s*2\b/) ||
    val.match(/grade\s*3\b/) ||
    val.match(/grade\s*4\b/) ||
    val.match(/grade\s*5\b/) ||
    val.match(/grade\s*6\b/) ||
    val.includes("junior high")
  );
}

// If basic/elementary/high school → show only "N/A"
if (checkIsBasicOrElemOrHigh(applyingForValue)) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = "N/A";
  row.appendChild(cell);
  subjectsDisplay.appendChild(row);
} else {
  // Otherwise, list all selected subjects
  subjectSelects.forEach((select, index) => {
    const selectedText = select.options[select.selectedIndex]?.text || "N/A";
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = `${index + 1}. ${selectedText}`;
    row.appendChild(cell);
    subjectsDisplay.appendChild(row);
  });
}

    


    // Files display logic
    const filesMap = {
      formalPictureDisplay: "mqcqc_formal_picture",
      birthCertificateDisplay: "mqcqc_birth_certificate",
      goodMoralDisplay: "mqcqc_good_moral",
      form137Display: "mqcqc_card_tor_coc",
      dismissalCertificateDisplay: "mqcqc_diploma",
      proof_paymentDisplay: "mqcqc_proof_payment",
    };

    Object.entries(filesMap).forEach(([displayId, inputId]) => {
      const input = document.getElementById(inputId);
      const link = document.getElementById(displayId);
      if (input.files.length > 0) {
        const file = input.files[0];
        link.href = URL.createObjectURL(file);
        link.textContent = file.name;
      } else {
        link.href = "#";
        link.textContent = "No file uploaded";
      }
    });

    

    const termsCheckbox = document.getElementById("Addmission_terms");
    if (!termsCheckbox.checked) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    // Show modal3
openModalBtn.addEventListener("click", function () {
    const modalContent = modal.querySelector(".ADD_content");
    if (modalContent) modalContent.scrollTop = 0;

    // rest of your code...
    modal.classList.add("show");
    modal.style.display = "flex";
});


  });



  // Cancel or close modal
  ["ADD_closeModalBtn", "cancelModalBtn"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      modal.classList.add("fade-out");
      modal.addEventListener("animationend", function handler() {
        modal.classList.remove("fade-out");
        modal.style.display = "none";
        modal.removeEventListener("animationend", handler);
      });
    });
  });

  // Final submit when "Proceed" is clicked (now a submit button)
  finalSubmitBtn.addEventListener("click", () => {
    // you can do ajax or actual form submission here
    form.submit();
  });

  // Close modal by clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("fade-out");
      modal.addEventListener("animationend", function handler() {
        modal.classList.remove("fade-out");
        modal.style.display = "none";
        modal.removeEventListener("animationend", handler);
      });
    }
  });
});
