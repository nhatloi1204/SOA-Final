import { qs } from '../utils/domUtils';

// * Upload file avatar preview
export function uploadAvatar() {
    const image = document.getElementById('avatarImg'),
        input = document.getElementById('avatarFile');
    input.addEventListener('change', () => {
        image.src = URL.createObjectURL(input.files[0]);
    });
}

export function scrollFunction() {
    const myButton = qs('#btn-back-to-top');
    if (window.scrollY > 100) {
        const myButton = qs('#btn-back-to-top');
        $(myButton).removeClass('invisible');
        $(myButton).addClass('visible');

        $(myButton).click(() => {
            document.body.scrollIntoView({
                behavior: 'smooth',
            });
        });
    } else {
        $(myButton).addClass('invisible');
    }
}
