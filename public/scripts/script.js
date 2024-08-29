
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pdp-add-to-cart-form');
  const variantButtons = document.querySelectorAll('.pdp-option-button');
  const priceElement = document.getElementById('pdp-current-price');
  const mainImage = document.getElementById('pdp-main-image');
  const thumbnails = document.querySelectorAll('.pdp-thumbnail');
  const arrowLeft = document.querySelector('.pdp-arrow-left');
  const arrowRight = document.querySelector('.pdp-arrow-right');
  const descriptionToggle = document.getElementById('pdp-description-toggle');
  const descriptionContent = document.getElementById('pdp-description');
  const addToCartButton = document.getElementById('pdp-add-to-cart-button');

  let currentImageIndex = 0;
  const totalImages = thumbnails.length;

  variantButtons.forEach(button => {
    button.addEventListener('click', () => handleVariantSelection(button));
  });
  
  const handleVariantSelection = (clickedButton) => {
    variantButtons.forEach(button => button.classList.remove('selected'));
    clickedButton.classList.add('selected');

    const price = clickedButton.dataset.variantPrice;
    priceElement.textContent = `$${price}`;

    document.getElementById('pdp-variant-id').value = clickedButton.dataset.variantId;
    
    addToCartButton.disabled = false;
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'items': [data]}),
      })
      .then(response => response.json())
      .then(result => {
        console.error('Result:', result);
        const messageElement = document.getElementById('pdp-add-to-cart-message');
        messageElement.textContent = 'Product added to cart successfully!';
        messageElement.classList.add('success');
        messageElement.style.display = 'block';
        setTimeout(() => {
          messageElement.style.display = 'none';
          messageElement.classList.remove('success');
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('pdp-add-to-cart-message');
        messageElement.textContent = 'Error adding product to cart. Please try again.';
        messageElement.classList.add('error');
        messageElement.style.display = 'block';
      });
    });
  }

  const showImage = (index) => {
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;
    mainImage.src = thumbnails[index].dataset.fullImgUrl;
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    currentImageIndex = index;
  }

  arrowLeft.addEventListener('click', () => showImage(currentImageIndex - 1));
  arrowRight.addEventListener('click', () => showImage(currentImageIndex + 1));

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => showImage(index));
  });

  descriptionToggle.addEventListener('click', function() {
      descriptionContent.classList.toggle('collapsed');
      const toggleIcon = this.querySelector('.toggle-icon');
      toggleIcon.textContent = descriptionContent.classList.contains('collapsed') ? '+' : '-';
    });
});
