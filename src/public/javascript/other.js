// * Upload file avatar preview
export function uploadAvatar() {
    const image = document.getElementById('avatarImg'),
        input = document.getElementById('avatarFile');
    input.addEventListener('change', () => {
        image.src = URL.createObjectURL(input.files[0]);
    });
}
