document.addEventListener("DOMContentLoaded", function() {
document.getElementById("Tesda_registration_form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting

    if (!runErrorChecks()) {             // Error for Emergency Contact
    return;  
                  }

  if (!runErrorChecks_Mobilenum()) {   // Error for Mobile number
    return;                      
  }

  if (!runErrorChecks_Email()) {   // Error for Email
    return;                      
  }

  if (!runErrorChecks_Zip()) {   // Error for Zip Code
    return;                      
  }



  const applicationType = document.getElementById("tesda_application_type").value;
  // Basic Info
  document.getElementById("applicationTypeDisplay").value = applicationType;
  document.getElementById("surnameDisplay").value = document.getElementById("tesda_surname").value;
  document.getElementById("firstNameDisplay").value = document.getElementById("tesda_first_name").value;
  document.getElementById("middleNameDisplay").value = document.getElementById("tesda_middle_name").value;
  document.getElementById("suffixDisplay").value = document.getElementById("tesda_suffix").value;
  document.getElementById("sexDisplay").value = document.getElementById("tesda_sex").value;
  document.getElementById("nationalityDisplay").value = document.getElementById("tesda_nationality").value;
  document.getElementById("dobDisplay").value = document.getElementById("tesda_date_of_birth").value;

  // Address
  document.getElementById("houseNoDisplay").value = document.getElementById("tesda_house_no").value;
  document.getElementById("streetDisplay").value = document.getElementById("tesda_street").value;
  document.getElementById("barangayDisplay").value = document.getElementById("tesda_barangay").value;
  document.getElementById("cityDisplay").value = document.getElementById("tesda_city").value;
  document.getElementById("regionDisplay").value = document.getElementById("tesda_region").value;
  document.getElementById("provinceDisplay").value = document.getElementById("tesda_province").value;
  document.getElementById("zipCodeDisplay").value = document.getElementById("tesda_zipcode").value;

  // Contact
  document.getElementById("emailDisplay").value = document.getElementById("tesda_email_address").value;
  document.getElementById("mobileNoDisplay").value = document.getElementById("tesda_mobile_no").value;
  document.getElementById("parentGuardianDisplay").value = document.getElementById("tesda_parent_guardian").value;
  document.getElementById("emergencyContactNoDisplay").value = document.getElementById("tesda_emergency_contact_no").value;

  // Training fields
  if (applicationType === "assessment") {
    // Set training fields to N/A for assessment application type
    document.getElementById("reasonDisplay").value = "N/A";
    document.getElementById("fundingDisplay").value = "N/A";
    document.getElementById("programDisplay").value = "N/A";
    document.getElementById("schoolNameDisplay").value = "N/A";
    document.getElementById("yearGraduatedDisplay").value = "N/A";

  } else {
    // Copy actual values for training application type
    document.getElementById("reasonDisplay").value = document.getElementById("tesda_reason").value;
    document.getElementById("fundingDisplay").value = document.getElementById("tesda_funding_source").value;
    document.getElementById("programDisplay").value = document.getElementById("tesda_programs").value;
    document.getElementById("schoolNameDisplay").value = document.getElementById("tesda_name_of_school").value;
    document.getElementById("yearGraduatedDisplay").value = document.getElementById("tesda_year_graduated").value;

  }

  // Assessment fields
  if (applicationType === "training") {
    // Set assessment fields to N/A for training application type
    document.getElementById("relatedQualificationDisplay").value = "N/A";
    document.getElementById("equivalentExperienceDisplay").value = "N/A";
    document.getElementById("renewalDisplay").value = "N/A";
  } else {
    // Copy actual values for assessment application type
    document.getElementById("relatedQualificationDisplay").value = document.getElementById("tesda_related_qualification").value;
    document.getElementById("equivalentExperienceDisplay").value = document.getElementById("tesda_equivalent_experiece").value;
    document.getElementById("renewalDisplay").value = document.getElementById("tesda_renewal").value;
  }

  // Uploaded Files – Show file names and preview links
  const setFileLink = (inputId, linkId) => {
    const fileInput = document.getElementById(inputId);
    const link = document.getElementById(linkId);
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);
      link.href = url;
      link.textContent = file.name;
    } else {
      link.href = "#";
      link.textContent = "No file uploaded";
    }
  };

  setFileLink("tesda_birth_certificate", "birthCertificateDisplay");
  setFileLink("tesda_form137", "form137Display");
  setFileLink("tesda_valid_id", "validIdDisplay");
  setFileLink("tesda_marriage_contract", "marriageContractDisplay");
  setFileLink("tesda_passport", "passportDisplay");


  const termsCheckbox = document.getElementById("tesda_terms");
if (!termsCheckbox.checked) {
  alert("You must agree to the terms and conditions to proceed.");
  return;
}

  // Show modal
  document.getElementById("confirmationModal").style.display = "flex";
});

// Show modal function
function showModal() {
  const modal = document.getElementById("confirmationModal");
  modal.classList.add("show"); // Add the 'show' class to trigger fade-in
  modal.style.display = "block"; // Ensure display is set to block
}

// Close modal on "X" or Cancel button with fade-out animation
document.getElementById("ADD_closeModalBtn").addEventListener("click", () => {
  const modal = document.getElementById("confirmationModal");

  // Trigger the fade-out animation
  modal.classList.add("fade-out");

  // After the fade-out animation ends, hide the modal and reset its state
  modal.addEventListener("animationend", function handler() {
    // Remove the fade-out class after animation ends
    modal.classList.remove("fade-out");

    // Hide the modal completely
    modal.style.display = "none";

    // Clean up the event listener
    modal.removeEventListener("animationend", handler);
  });
});

// Cancel modal button (same logic for the Cancel button)
document.getElementById("cancelModalBtn").addEventListener("click", () => {
  const modal = document.getElementById("confirmationModal");

  // Trigger the fade-out animation
  modal.classList.add("fade-out");

  // After the fade-out animation ends, hide the modal and reset its state
  modal.addEventListener("animationend", function handler() {
    // Remove the fade-out class after animation ends
    modal.classList.remove("fade-out");

    // Hide the modal completely
    modal.style.display = "none";

    // Clean up the event listener
    modal.removeEventListener("animationend", handler);
  });
});
});