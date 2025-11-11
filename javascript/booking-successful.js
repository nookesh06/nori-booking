// ✅ Display Booking Details on Page
window.addEventListener("DOMContentLoaded", function () {
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  if (!bookingData) return;

  // Generate unique Booking ID and Room Number
  const bookingId = "NORI-" + new Date().getTime();
  const roomNumber = Math.floor(Math.random() * 50) + 1; // Random room number 1–50

  // Fill in booking details on the page
  document.getElementById("booking-id").textContent = bookingId;
  document.getElementById("guest-name").textContent = `${bookingData.firstName} ${bookingData.lastName}`;
  document.getElementById("checkin-date").textContent = bookingData.checkin;
  document.getElementById("checkout-date").textContent = bookingData.checkout;
  document.getElementById("guest-email").textContent = bookingData.email;
  document.getElementById("guest-phone").textContent = bookingData.phone;
  document.getElementById("total-amount").textContent = bookingData.totalAmount;
  document.getElementById("total-rooms").textContent = `${bookingData.totalRooms} Room(s)`;
  document.getElementById("total-guests").textContent = `${bookingData.totalGuests} Guest(s)`;

  // ✅ Show Room Number
  document.getElementById("room-number").textContent = `#${roomNumber}`;

  // Save updated info with room number (optional)
  bookingData.roomNumber = roomNumber;
  bookingData.bookingId = bookingId;
  localStorage.setItem("bookingData", JSON.stringify(bookingData));
});

// ✅ PDF Download
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("download-receipt");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get details from page
    const bookingId = document.getElementById("booking-id").textContent;
    const name = document.getElementById("guest-name").textContent;
    const email = document.getElementById("guest-email").textContent;
    const phone = document.getElementById("guest-phone").textContent;
    const checkin = document.getElementById("checkin-date").textContent;
    const checkout = document.getElementById("checkout-date").textContent;
    const amount = document.getElementById("total-amount").textContent;
    const rooms = document.getElementById("total-rooms").textContent;
    const guests = document.getElementById("total-guests").textContent;
    const roomNumber = document.getElementById("room-number").textContent;

    // 🧾 Generate PDF Receipt
    doc.setFontSize(18);
    doc.text("NORI.com - Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingId}`, 20, 35);
    doc.text(`Name: ${name}`, 20, 45);
    doc.text(`Email: ${email}`, 20, 55);
    doc.text(`Phone: ${phone}`, 20, 65);
    doc.text(`Check-in: ${checkin}`, 20, 75);
    doc.text(`Check-out: ${checkout}`, 20, 85);
    doc.text(`${rooms}`, 20, 95);
    doc.text(`${guests}`, 20, 105);
    doc.text(`Room Number: ${roomNumber}`, 20, 115);
    doc.text(`Total Amount: ${amount}`, 20, 125);
    doc.text("Thank you for booking with NORI.com!", 20, 145);

    doc.save("Booking_Receipt.pdf");
  });
});
