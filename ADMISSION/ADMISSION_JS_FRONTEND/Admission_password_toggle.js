
  // First password toggle
  const togglePassword1 = document.getElementById('togglePassword1');
  const password1 = document.getElementById('mqcqc_password');
  const icon1 = togglePassword1.querySelector('i');

  togglePassword1.addEventListener('click', () => {
    const isPassword = password1.type === 'password';
    password1.type = isPassword ? 'text' : 'password';
    icon1.classList.toggle('fa-eye');
    icon1.classList.toggle('fa-eye-slash');
  });

  // Second password toggle
  const togglePassword2 = document.getElementById('togglePassword2');
  const password2 = document.getElementById('mqcqc_confirm_password');
  const icon2 = togglePassword2.querySelector('i');

  togglePassword2.addEventListener('click', () => {
    const isPassword = password2.type === 'password';
    password2.type = isPassword ? 'text' : 'password';
    icon2.classList.toggle('fa-eye');
    icon2.classList.toggle('fa-eye-slash');
  });



  const passwordInput = document.getElementById('mqcqc_password');
  const confirmPasswordInput = document.getElementById('mqcqc_confirm_password');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  function checkStrength(password) {
  const strong = /^(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const medium = /^(?=.*\d).{6,}$/;

    if (strong.test(password)) return 'strong';
    if (medium.test(password)) return 'medium';
    return 'weak';
  }

  function updatePasswordUI(strength) {
    passwordInput.classList.remove('weak', 'medium', 'strong');
    passwordError.classList.remove('weak', 'medium', 'strong');

    if (strength) {
      passwordInput.classList.add(strength);
      passwordError.classList.add(strength);
    }
  }

  function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Reset classes
    confirmPasswordInput.classList.remove('nomatch');
    confirmPasswordError.classList.remove('weak', 'strong');

    // Password strength check
    if (!password) {
      passwordError.textContent = "Password is required.";
      updatePasswordUI(null);
    } else {
      const strength = checkStrength(password);
      updatePasswordUI(strength);

      if (strength === 'weak') {
        passwordError.textContent = "Weak password. Try uppercase, number, and special character.";
      } else if (strength === 'medium') {
        passwordError.textContent = "Medium strength. Add more symbols or uppercase for a strong password.";
      } else {
        passwordError.textContent = "Strong password.";
      }
    }

    // Confirm password check
    if (!confirmPassword) {
      confirmPasswordError.textContent = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordInput.classList.add('nomatch');
      confirmPasswordError.classList.add('weak');
    } else {
      confirmPasswordError.textContent = "Passwords match.";
      confirmPasswordError.classList.add('strong');
    }
  }



  // Event listeners
  passwordInput.addEventListener('input', validatePasswords);
  confirmPasswordInput.addEventListener('input', validatePasswords);
