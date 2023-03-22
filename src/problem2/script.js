// get form and input elements
const form = document.querySelector('form');
const addressInput = document.querySelector('#eth-address');
const amountInput = document.querySelector('#amount');
const otpInput = document.querySelector('#otp');
const addressError = document.querySelector('#eth-address-error');
const amountError = document.querySelector('#amount-error');
const otpError = document.querySelector('#otp-error');
const submitButton = document.querySelector('button');

// regex pattern for ethereum address validation
const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/i;

// submit button is enabled only if all inputs are valid

let validAddress = false;
let validAmount = false;
let validOTP = false;

function canSubmit() {
    if (validAddress && validAmount && validOTP) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// add event listener for form submission
form.addEventListener('submit', (event) => {
  // prevent default form submission behavior
  event.preventDefault();

  // check if form is already submitting
  if (form.classList.contains('submitting')) {
    return;
  }

  // validate form inputs
  let isValid = true;

  // validate ethereum address
  if (!ethereumAddressRegex.test(addressInput.value)) {
    addressError.classList.add('error');
    isValid = false;
    validAddress = false;
  } else {
    addressError.classList.remove('error');
  }

  // validate amount
  if (isNaN(amountInput.value) || parseFloat(amountInput.value) < 0) {
    amountError.classList.add('error');
    isValid = false;
    validAmount = false;
  } else {
    amountError.classList.remove('error');
  }

  // validate otp
  if (isNaN(otpInput.value) || otpInput.value.length !== 6) {
    otpError.classList.add('error');
    isValid = false;
    validOTP = false;
  } else {
    otpError.classList.remove('error');
  }

  // if form is invalid, return
  if (!isValid) {
    canSubmit();
    return;
  }

  // show loading state
  form.classList.add('submitting');

  // simulate form submission delay
  setTimeout(() => {
    // hide form elements
    form.classList.remove('submitting');
    form.classList.add('submitted');
    form.reset();

    // show success overlay
    const successOverlay = document.querySelector('.success-overlay');
    successOverlay.style.display = 'flex';

    // reset form after success overlay is dismissed
    successOverlay.addEventListener('click', () => {
      form.classList.remove('submitted');
      successOverlay.style.display = 'none';
    });
  }, 2000);
});

// add event listener for input validation on change
addressInput.addEventListener('change', () => {
  if (ethereumAddressRegex.test(addressInput.value)) {
    addressError.classList.remove('error');
    validAddress = true;
  } else {
    addressError.classList.add('error');
    validAddress = false;
  }
  canSubmit();
});

amountInput.addEventListener('change', () => {
  if (!isNaN(amountInput.value) && parseFloat(amountInput.value) >= 0) {
    amountError.classList.remove('error');
    validAmount = true;
  } else {
    amountError.classList.add('error');
    validAmount = false;
  }
  canSubmit();
});

otpInput.addEventListener('change', () => {
  if (!isNaN(otpInput.value) && otpInput.value.length === 6) {
    otpError.classList.remove('error');
    validOTP = true;
  } else {
    otpError.classList.add('error');
    validOTP = false;
  }
  canSubmit();
});
