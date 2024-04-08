// Deklarasi variable
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const phoneEl = document.querySelector("#phone"); // Menambahkan referensi ke input nomor telepon
const genderEl = document.querySelector("#gender"); // Menambahkan referensi ke input jenis kelamin
const websiteEl = document.querySelector("#website"); // Menambahkan referensi ke input alamat situs web
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirmPassword");
const form = document.querySelector("#signup");

// Validasi wajib diisi
const isRequired = (value) => (value === "" ? false : true);
// Fungsi bettwen
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

// Tampilkan error
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.innerText = message;
};

// Tampilkan success
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.innerText = "";
};

// Cek username
const checkUsername = () => {
  let valid = false;
  const min = 5,
    max = 15;
  const username = usernameEl.value.trim();
  if (!isRequired(username)) {
    showError(usernameEl, "Username harus diisi");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username minimal ${min} karakter dan maksimal ${max} karakter`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

// Cek nomor telepon
const checkPhone = () => {
  let valid = false;
  const phone = phoneEl.value.trim();
  const regex = /^\d{10,13}$/; // Format yang diizinkan: 10 hingga 12 digit angka
  if (!isRequired(phone)) {
    showError(phoneEl, "Nomor telepon harus diisi");
  } else if (!regex.test(phone)) {
    showError(phoneEl, "Format nomor telepon tidak valid");
  } else {
    showSuccess(phoneEl);
    valid = true;
  }
  return valid;
};

// Cek jenis kelamin
const checkGender = () => {
  let valid = false;
  const gender = genderEl.value.trim();
  if (!isRequired(gender)) {
    showError(genderEl, "Jenis kelamin harus dipilih");
  } else {
    showSuccess(genderEl);
    valid = true;
  }
  return valid;
};

// Cek alamat situs web
const checkWebsite = () => {
  let valid = false;
  const website = websiteEl.value.trim();
  const regex = /^(http|https):\/\/[^ "]+$/; // Format URL yang diizinkan
  if (!isRequired(website)) {
    showError(websiteEl, "Alamat situs web harus diisi");
  } else if (!regex.test(website)) {
    showError(websiteEl, "Format alamat situs web tidak valid");
  } else {
    showSuccess(websiteEl);
    valid = true;
  }
  return valid;
};

// Cek email (tidak perlu diubah)
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email harus diisi");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email tidak valid");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// Cek keamanan password (tidak perlu diubah)
const isPasswordSecure = (password) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return regex.test(password);
};

const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, "Password harus diisi");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password harus lebih dari 8 karakter, kombinasi huruf besar ,kecil dan Karakter"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  const confirmPassword = confirmPasswordEl.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Password harus diisi");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Password tidak sama");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

// Validasi email (tidak perlu diubah)
const isEmailValid = (email) => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
};

// Event listener untuk validasi saat submit formulir
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPhoneValid = checkPhone(); // Menambahkan validasi nomor telepon
  let isGenderValid = checkGender(); // Menambahkan validasi jenis kelamin
  let isWebsiteValid = checkWebsite(); // Menambahkan validasi alamat situs web
  let isPasswordValid = checkPassword();
  let isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPhoneValid &&
    isGenderValid &&
    isWebsiteValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
  if (isFormValid) {
    //lakukan action submit
  }
});

// Debounce untuk menunda pemanggilan fungsi validasi saat input (tidak perlu diubah)
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// Event listener untuk validasi saat input (tidak perlu diubah)
form.addEventListener(
  "input",
  debounce((e) => {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "phone": // Menambahkan validasi saat input nomor telepon
        checkPhone();
        break;
      case "gender": // Menambahkan validasi saat input jenis kelamin
        checkGender();
        break;
      case "website": // Menambahkan validasi saat input alamat situs web
        checkWebsite();
        break;
      case "password":
        checkPassword();
        break;
      case "confirmPassword":
        checkConfirmPassword();
        break;
    }
  })
);