import swal from 'sweetalert';

export const adminLoginFetch = async (name, password) => {
    await fetch(`http://localhost:3000/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
        redirect: 'follow',
    }).then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    });
};

$('.view-post').click(function () {
    const title = $(this).prevAll()[1];
    const name = $(this).prevAll()[2];
    // $(title).text(), $(name).text()
    location.href = `http://localhost:3000/${$(name).text()}/${$(title).text().replace(' ', '-')}`;
});

$("input[type='checkbox']").click(async function () {
    const parent = $(this).parent();
    const id = $(parent).prevAll()[4];

    if ($(this).is(':checked')) {
        await fetch(`http://localhost:3000/admin/post/${$(id).text()}/approval`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
    }
});
