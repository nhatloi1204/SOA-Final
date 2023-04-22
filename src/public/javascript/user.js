export const loginFetch = async (email, password) => {
    const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
        $('.error-container').html(`<strong>⚠ ${json} </strong>`);
        return;
    }

    // * save user and token to session storage in order to
    // * send the token along with request which require authenticated
    sessionStorage.setItem('token', JSON.stringify(json.token));
    sessionStorage.setItem('user', JSON.stringify(json.user));

    // * redirect user to home page after login
    location.href = 'http://localhost:3000/';
};

export const registerFetch = async (name, email, password) => {
    const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
        $('.error-container').html(`<strong> ⚠ ${json} </strong>`);
        return;
    }

    // * save user and token to session storage in order to
    // * send the token along with request which require authenticated
    sessionStorage.setItem('token', JSON.stringify(json.token));
    sessionStorage.setItem('user', JSON.stringify(json.user));

    // * redirect user to home page after login
    location.href = 'http://localhost:3000/';
};

export const logout = async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
};
