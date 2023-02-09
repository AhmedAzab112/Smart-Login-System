
let users_list = [];
let user = {};


(function () {
    if (localStorage.length && localStorage.getItem('users') != null && localStorage.getItem('current-user') != null) {
        user = JSON.parse(localStorage.getItem('current-user'));
        users_list = JSON.parse(localStorage.getItem('users'));
        let exist = users_list.filter(el => el.user_email === user.user_email)
        document.getElementById('welcome').innerHTML = exist[0].user_name ? `Welcome ${exist[0].user_name}` : `Undefined`;
    } else {
        document.getElementById('welcome').style = 'display: none';
        document.getElementById('logOut').style = 'display: none';
        showWarning(5);

        setTimeout(() => {
            window.location.href = "../pages/signin.html";
        }, 5000);
    }
})()






function logout() {
    if (user){
        user = null;
        localStorage.removeItem('current-user');
        window.location.href = "../pages/signin.html";
    }
}


function showWarning(second) {
    setInterval(()=> {
        if(second < 1)
            return;
        document.getElementById('warning').innerHTML = `undefined, redirect to signin after <b>${second--}</b>s`;
    }, 1000);
}