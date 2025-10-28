function password_show(event) {
    const icon = event.target; // The icon that was clicked
    const input = icon.nextElementSibling.nextElementSibling; // The corresponding input after the label

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}
