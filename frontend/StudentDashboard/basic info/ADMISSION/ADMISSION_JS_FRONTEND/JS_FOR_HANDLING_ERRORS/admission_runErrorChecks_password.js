function runErrorChecks_Passwords() {
  let isValid = true;

  const passwordEl = document.getElementById("mqcqc_password");
  const confirmPasswordEl = document.getElementById("mqcqc_confirm_password");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  if (!passwordEl || !confirmPasswordEl || !passwordError || !confirmPasswordError) {
    console.error("Password input or error elements are missing.");
    return false;
  }

  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();

  // Clear previous errors
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  if (password === "" || confirmPassword === "") {
    confirmPasswordError.textContent = "Please fill out both password fields.";
    isValid = false;
    confirmPasswordError.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
    confirmPasswordError.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return isValid;
}