// * Upload file avatar preview
export function uploadAvatar() {
    const image = document.getElementById('avatarImg'),
        input = document.getElementById('avatarFile');
    input.addEventListener('change', () => {
        image.src = URL.createObjectURL(input.files[0]);
    });
}

// Get the button
let myButton = document.getElementById('btn-back-to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

export function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = 'block';
    } else {
        myButton.style.display = 'none';
    }
}
// When the user clicks on the button, scroll to the top of the document
myButton.addEventListener('click', backToTop);

export function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
