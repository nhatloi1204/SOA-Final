// Upload file avatar preview
function uploadAvatar() {
    const image = document.getElementById('avatarImg'),
        input = document.getElementById('avatarFile');
    input.addEventListener('change', () => {
        image.src = URL.createObjectURL(input.files[0]);
    });
}
uploadAvatar();
