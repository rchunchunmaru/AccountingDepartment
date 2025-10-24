function runErrorChecks() {
  let isValid = true;

  const emergencyEl = document.getElementById("tesda_emergency_contact_no");
  const emergencyError = document.getElementById("emergencyError");

  if (!emergencyEl) {
    console.error("Element with id tesda_emergency_contact_no not found.");
    return false; // stop validation
  }
  if (!emergencyError) {
    console.error("Element with id emergencyError not found.");
    return false; // stop validation
  }

  const raw = emergencyEl.value || "";
  const digits = raw.replace(/\D/g, "").trim();

  if (!/^09\d{9}$/.test(digits)) {
    emergencyError.textContent = "Emergency contact must start with 09 and be exactly 11 digits.";
    isValid = false;
    emergencyError.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    emergencyError.textContent = "";
  }

  return isValid;
}
