import { loginFetch, registerFetch } from './user.js';
import { adminLoginFetch } from './admin.js';
import { scrollFunction } from './other.js';

$(document).ready(() => {
    // * handle login functionality
    $("form[id='login']").submit((e) => {
        e.preventDefault();
        console.log('hhh');
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        loginFetch(email, password);
    });

    // * handle register functionality
    $("form[id='register']").submit((e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPass = form.get('confirm-password');

        if (password !== confirmPass) {
            $('.error-container').html(`<strong> ⚠ please make sure your confirm password match </strong>`);
            return;
        }
        registerFetch(name, email, password);
    });

    //* handle admin login functionality
    $("form[id='adminLogin']").submit((e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('adminName');
        const password = form.get('adminPassword');
        adminLoginFetch(name, password);
    });

    $(window).scroll(() => {
        scrollFunction();
    });
});
