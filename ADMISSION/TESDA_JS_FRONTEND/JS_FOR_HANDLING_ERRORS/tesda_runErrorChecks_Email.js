function runErrorChecks_Email() {
  let isValid = true;

  const emailEl = document.getElementById("tesda_email_address");
  const emailError = document.getElementById("emailError");

  // Defensive checks
  if (!emailEl) {
    console.error("Element with id tesda_email_address not found.");
    return false; // block form if input missing
  }
  if (!emailError) {
    console.error("Element with id emailError not found.");
    return false; // block form if error span missing
  }

  const email = (emailEl.value || "").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple but effective check

  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
    emailError.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    emailError.textContent = "";
  }

  return isValid;
}
