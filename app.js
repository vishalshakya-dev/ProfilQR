const form = document.getElementById("profileForm");
const qrCodeContainer = document.getElementById("qrCodeContainer");

// Add form submission event listener
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const message = document.getElementById("message").value;

  // Generate unique identifier (e.g., a hash of the user's data)
  const uniqueId = generateUniqueId(name, address, email);

  // Store user profile data in localStorage
  storeUserProfile(uniqueId, { name, email, address, message });

  // Generate QR code with unique identifier
  generateQRCode(uniqueId);
});

// Function to generate a unique identifier (e.g., a hash)
function generateUniqueId(name, address, email) {
  const data = `${name}${address}${email}`;
  const hash = Array.from(data).reduce((hash, char) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);
  return `${hash}`;
}

// Function to store user profile data in localStorage
function storeUserProfile(uniqueId, profileData) {
  localStorage.setItem(`profile_${uniqueId}`, JSON.stringify(profileData));
}

// Function to generate and display QR code
function generateQRCode(uniqueId) {
  const qr = new QRious({
    element: qrCodeContainer,
    value: `${window.location.origin}/profile.html?id=${uniqueId}`,
    size: 250,
  });

  // Create a container for the QR code image
  const qrCodeImage = document.createElement("div");
  qrCodeImage.classList.add("qr-code-image");

  // Append the QR code canvas to the container
  qrCodeImage.appendChild(qr.canvas);
  qrCodeContainer.appendChild(qrCodeImage);

  // Create a link to download the QR code
  const downloadLink = document.createElement("a");
  downloadLink.href = qr.toDataURL();
  downloadLink.download = `qrcode_${uniqueId}.png`;
  downloadLink.classList.add("create-profile-btn");
  downloadLink.style.marginTop = "1rem";
  downloadLink.style.marginBottom = "2rem";
  downloadLink.style.marginLeft = "0";
  downloadLink.textContent = "Download QR Code";
  qrCodeContainer.appendChild(downloadLink);
}
