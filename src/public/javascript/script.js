import { loginFetch, registerFetch } from './user.js';

$(document).ready(() => {
    // * handle login functionality
    $("form[id='login']").submit((e) => {
        e.preventDefault();
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
});
