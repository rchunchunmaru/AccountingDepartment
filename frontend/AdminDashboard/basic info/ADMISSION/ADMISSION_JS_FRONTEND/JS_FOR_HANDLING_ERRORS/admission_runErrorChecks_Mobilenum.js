function runErrorChecks_Mobilenum() {
  let isValid = true;

  const mobileEl = document.getElementById("mqcqc_mobile_no");
  const mobileError = document.getElementById("mobileError");

  // Defensive checks
  if (!mobileEl) {
    console.error("Element with id tesda_mobile_no not found.");
    return false; // block form if missing
  }
  if (!mobileError) {
    console.error("Element with id mobileError not found.");
    return false; // block form if missing
  }

  const raw = mobileEl.value || "";
  const digits = raw.replace(/\D/g, "").trim();

  // Validate: must start with 09 and be exactly 11 digits
  if (!/^09\d{9}$/.test(digits)) {
    mobileError.textContent = "Mobile number must start with 09 and be exactly 11 digits.";
    isValid = false;
    mobileError.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    mobileError.textContent = "";
  }

  return isValid;
}
