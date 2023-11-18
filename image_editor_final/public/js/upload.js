// public/js/upload.js

// Function to handle image upload
const handleImageUpload = () => {
  const uploadForm = document.getElementById('upload-form');
  const uploadInput = document.getElementById('upload-input');

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', uploadInput.files[0]);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Image uploaded successfully!');
          window.location.reload();
        } else {
          alert('Failed to upload image!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to upload image!');
      });
  });
};

// Function to initialize the upload page
const initUploadPage = () => {
  handleImageUpload();
};

// Initialize the upload page
initUploadPage();
