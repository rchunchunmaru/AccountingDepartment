document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("Admission_acc_registration_form");

  form.addEventListener("submit", function (e) {
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

  if (!runErrorChecks_Passwords()) {
  return;
}


    // Applicant Information
    document.getElementById("surnameDisplay").value = document.getElementById("mqcqc_surname").value;
    document.getElementById("firstnameDisplay").value = document.getElementById("mqcqc_first_name").value;
    document.getElementById("middlenameDisplay").value = document.getElementById("mqcqc_middle_name").value;
    document.getElementById("suffixDisplay").value = document.getElementById("mqcqc_suffix").value;
    document.getElementById("sexDisplay").value = document.getElementById("mqcqc_sex").value;
    document.getElementById("nationalityDisplay").value = document.getElementById("mqcqc_nationality").value;
    document.getElementById("dobDisplay").value = document.getElementById("mqcqc_date_of_birth").value;

    // Address
    document.getElementById("houseNoDisplay").value = document.getElementById("mqcqc_house_no").value;
    document.getElementById("streetDisplay").value = document.getElementById("mqcqc_street").value;
    document.getElementById("barangayDisplay").value = document.getElementById("mqcqc_barangay").value;
    document.getElementById("cityDisplay").value = document.getElementById("mqcqc_city").value;
    document.getElementById("regionDisplay").value = document.getElementById("mqcqc_region").value;
    document.getElementById("provinceDisplay").value = document.getElementById("mqcqc_province").value;
    document.getElementById("zipCodeDisplay").value = document.getElementById("mqcqc_zipcode").value;

    // Contact
    document.getElementById("emailDisplay").value = document.getElementById("mqcqc_email_address").value;
    document.getElementById("mobileNoDisplay").value = document.getElementById("mqcqc_mobile_no").value;
    document.getElementById("parentGuardianDisplay").value = document.getElementById("mqcqc_parent_guardian").value;
    document.getElementById("emergencyContactNoDisplay").value = document.getElementById("mqcqc_emergency_contact_no").value;

    // Account Details
    document.getElementById("usernameDisplay").value = document.getElementById("mqcqc_username").value;
    document.getElementById("roleDisplay").value = document.getElementById("mqcqc_role").value;
    document.getElementById("passwordDisplay").value = document.getElementById("mqcqc_password").value;
     

 

    // Check terms checkbox
   const termsCheckbox = document.getElementById("Addmission_acc_terms");
    if (!termsCheckbox.checked) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    // Show modal
    const modal = document.getElementById("confirmationModal");
    modal.classList.add("show");
    modal.style.display = "flex";
  });

  // Close modal with fade-out animation
  ["ADD_closeModalBtn","cancelModalBtn"].forEach(btnId => {
    document.getElementById(btnId).addEventListener("click", () => {
      const modal = document.getElementById("confirmationModal");
      modal.classList.add("fade-out");
      modal.addEventListener("animationend", function handler() {
        modal.classList.remove("fade-out");
        modal.style.display = "none";
        modal.removeEventListener("animationend", handler);
      });
    });
  });

  // Close modal if clicked outside modal content
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("confirmationModal");
    if (e.target === modal) {
      modal.classList.add("fade-out");
      modal.addEventListener("animationend", function handler() {
        modal.classList.remove("fade-out");
        modal.style.display = "none";
        modal.removeEventListener("animationend", handler);
      });
    }
  });

  // Final submission
  const finalSubmitBtn = document.getElementById("FINALconfirmModalBtn");
  finalSubmitBtn.addEventListener("click", () => {
    alert("Form submitted successfully!");
    form.submit(); // Actual form submission
  });
});
