// public/js/cropper.js

// Initialize Cropper.js
const image = document.getElementById('image');
const cropper = new Cropper(image, {
  aspectRatio: 1,
  viewMode: 1,
  crop: function(event) {
    // Update crop data
    const cropData = {
      x: event.detail.x,
      y: event.detail.y,
      width: event.detail.width,
      height: event.detail.height
    };
    document.getElementById('cropData').value = JSON.stringify(cropData);
  }
});

// Handle crop button click
const cropButton = document.getElementById('cropButton');
cropButton.addEventListener('click', function() {
  // Get cropped image data
  const croppedCanvas = cropper.getCroppedCanvas();
  const croppedImage = croppedCanvas.toDataURL();

  // Display cropped image
  const preview = document.getElementById('preview');
  preview.src = croppedImage;

  // Update hidden input value with cropped image data
  document.getElementById('croppedImage').value = croppedImage;
});
