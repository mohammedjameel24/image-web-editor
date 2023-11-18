// public/js/gallery.js

// Function to fetch all images from the server
function fetchImages() {
  fetch('/images')
    .then(response => response.json())
    .then(data => {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';

      data.forEach(image => {
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.filename;

        gallery.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));
}

// Call fetchImages function when the page loads
window.addEventListener('load', fetchImages);
