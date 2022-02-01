const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message) {
     const formControl = input.parentElement;
     formControl.className = 'form-control error';
     const small = formControl.querySelector('small');
     small.innerText = message;
}

form.addEventListener('submit', function(e) {
     e.preventDefault();

     if (username.value === '') {
          showError(username, 'Please enter a username');
     } else {
          showSuccess(username);
     }
});