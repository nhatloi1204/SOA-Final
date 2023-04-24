export const adminLoginFetch = async (name, password) => {
    await fetch(`http://localhost:3000/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
        redirect: 'follow'
    }).then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    });
};
