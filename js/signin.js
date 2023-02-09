let user_email = document.getElementById('user_email');
let user_password = document.getElementById('user_password');
let form_required = document.getElementById('required');
let form_invalid = document.getElementById('invalid');
let form_notExist = document.getElementById('notExist');
let all_users = [];


(function () {
    if (localStorage.length && localStorage.getItem('users') != null) {
        all_users = JSON.parse(localStorage.getItem('users'));
    }
})()

function signin() {
    if (user_email.value && user_password.value) {
        clearValidation(1, 1, 1);
        let user_data = {
            user_email: user_email.value,
            user_password: user_password.value
        }

        if (!user_data.user_email.includes('@') || !user_data.user_email.includes('.com')) {
            form_invalid.innerHTML = 'Invalid Email format';
            return;
        }

        let exist = all_users.filter(el => el.user_email === user_data.user_email && el.user_password === user_data.user_password);
        if (exist && exist.length) {
            localStorage.setItem('current-user', JSON.stringify(user_data));
            clearForm();
            window.location.href = "../pages/home.html";
        }
        else {
            form_notExist.innerHTML = 'Incorrect email or password';
        }
    } else {
        form_required.innerHTML = 'All inputs is required';
        clearValidation(0, 1, 1);
    }
}

function clearForm() {
    user_email.value = '';
    user_password.value = '';
}



function clearValidation(required, invalid, notExist) {
    if (required) form_required.innerHTML = '';
    if (invalid) form_invalid.innerHTML = '';
    if (notExist) form_notExist.innerHTML = '';
}