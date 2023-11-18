// main.js

// Function to handle image upload
const handleImageUpload = () => {
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-input');

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Image uploaded successfully!');
        } else {
          alert('Failed to upload image.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};

// Function to handle image cropping
const handleImageCrop = () => {
  const image = document.getElementById('uploaded-image');
  const cropButton = document.getElementById('crop-button');

  const cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    autoCropArea: 1,
    cropBoxResizable: false,
    crop: () => {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL('image/jpeg');

      document.getElementById('cropped-image').src = croppedImage;
    }
  });

  cropButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImage = croppedCanvas.toDataURL('image/jpeg');

    fetch('/crop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: croppedImage })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Image cropped successfully!');
        } else {
          alert('Failed to crop image.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};

// Function to initialize the main script
const init = () => {
  handleImageUpload();
  handleImageCrop();
};

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
