 const mainImage = document.getElementById('main-room-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function () {
        // Change main image
        mainImage.src = this.src;

        // Remove active class from all thumbnails
        thumbnails.forEach(img => img.classList.remove('active'));

        // Add active class to clicked thumbnail
        this.classList.add('active');
      });
    });