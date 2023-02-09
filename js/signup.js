let user_name = document.getElementById('user_name');
let user_email = document.getElementById('user_email');
let user_password = document.getElementById('user_password');
let form_required = document.getElementById('required');
let form_exist = document.getElementById('exist');
let form_invalid = document.getElementById('invalid');
let form_valid = document.getElementById('valid');

let all_users = [];
let id = 0;

(function () {
    if (localStorage.length && localStorage.getItem('users') != null) {
        all_users = JSON.parse(localStorage.getItem('users'));
        id = all_users[all_users.length - 1].user_id;
    }
})()

function signup() {
    if (user_name.value && user_email.value && user_password.value) {
        clearValidation(1, 0, 0, 0);
        let user_data = {
            user_id: ++id,
            user_name: user_name.value,
            user_email: user_email.value,
            user_password: user_password.value
        }
        let exist = all_users.filter(el => el.user_email === user_data.user_email);
        if ((exist && exist.length)) {
            form_exist.innerHTML = 'Email already exists';
            id--;
        } else if (!user_data.user_email.includes('@') || !user_data.user_email.includes('.com')) {
            form_invalid.innerHTML = 'Invalid Email format';
        } else {
            all_users.push(user_data);
            localStorage.setItem('users', JSON.stringify(all_users));
            form_valid.innerHTML = 'Success';
            clearValidation(1, 1, 1, 0);
            clearForm();
        }
    } else {
        form_required.innerHTML = 'All inputs is required';
        clearValidation(0, 1, 1, 1);
    }
}

function clearForm() {
    user_name.value = '';
    user_email.value = '';
    user_password.value = '';
    setTimeout(() => {
        form_valid.innerHTML = '';
    }, 1000);
    setTimeout(() => {
        form_valid.innerHTML = '';
        window.location.href = "../pages/signin.html";
    }, 1500);
}



function clearValidation(required, exist, invalid, valid) {
    if (required) form_required.innerHTML = '';
    if (exist) form_exist.innerHTML = '';
    if (invalid) form_invalid.innerHTML = '';
    if (valid) form_valid.innerHTML = '';
}