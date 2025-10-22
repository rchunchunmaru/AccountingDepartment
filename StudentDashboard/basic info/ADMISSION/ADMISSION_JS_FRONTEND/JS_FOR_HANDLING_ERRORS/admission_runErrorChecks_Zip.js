function runErrorChecks_Zip() {
  let isValid = true;

  const zipEl = document.getElementById("mqcqc_zipcode");
  const zipError = document.getElementById("zipError");

  // Defensive checks
  if (!zipEl) {
    console.error("Element with id tesda_zipcode not found.");
    return false; // block form if input missing
  }
  if (!zipError) {
    console.error("Element with id zipError not found.");
    return false; // block form if error span missing
  }

  const raw = zipEl.value || "";
  const digits = raw.replace(/\D/g, "").trim(); // allow only digits

  // Zip code must be exactly 4 digits
  if (!/^\d{4}$/.test(digits)) {
    zipError.textContent = "Zip code must be exactly 4 digits.";
    isValid = false;
    zipError.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    zipError.textContent = "";
  }

  return isValid;
}
