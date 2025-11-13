document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const checkin = document.getElementById("checkin-date").value;
    const checkout = document.getElementById("checkout-date").value;
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const roomDetails = document.getElementById("room").value.trim();

    if (!firstName || !lastName || !email || !phone || !checkin || !checkout || !roomDetails) {
      alert("⚠️ Please fill in all required fields before confirming your booking.");
      return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit Indian phone number starting with 6-9.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkinDate < today) {
      alert("⚠️ Check-in date cannot be in the past.");
      return;
    }

    if (checkoutDate <= checkinDate) {
      alert("⚠️ Checkout date must be after the check-in date.");
      return;
    }

    let totalRooms = "1";
    let totalGuests = "0";

    if (roomDetails.includes("Rooms:")) {
      const match = roomDetails.match(/Rooms:\s*(\d+),\s*Guests:\s*(\d+)/);
      if (match) {
        totalRooms = match[1];
        totalGuests = match[2];
      }
    }

    const bookingData = {
      firstName,
      lastName,
      email,
      phone,
      checkin,
      checkout,
      totalRooms,
      totalGuests,
      totalAmount: document.getElementById("total-amount").textContent,
      roomType: "Luxe Stay PG — Private Room",
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "./booking-successful.html";
  });
});

// ✅ ROOM SELECTION DROPDOWN
document.addEventListener("DOMContentLoaded", () => {
  const roomInput = document.getElementById("room");
  const roomOptions = document.getElementById("room-options");
  const addRoomButton = document.getElementById("add-room");
  const doneButton = document.getElementById("done-button");
  const summaryDisplay = document.getElementById("summary-display");

  if (!roomInput || !roomOptions) return;

  let roomCount = 1;

  roomInput.addEventListener("click", (event) => {
    event.stopPropagation();
    roomOptions.style.display =
      roomOptions.style.display === "none" ? "block" : "none";
  });

  function setCounterListeners(roomDiv) {
    roomDiv.querySelectorAll(".count-button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault(); // prevents triggering form submit
        const countSpan = btn.parentElement.querySelector(".count");
        let count = parseInt(countSpan.textContent);
        if (btn.classList.contains("increase")) count++;
        else if (btn.classList.contains("decrease") && count > 0) count--;
        countSpan.textContent = count;
      });
    });
  }

  function updateRoomTitles() {
    const rooms = document.querySelectorAll(".room-option");
    rooms.forEach((room, index) => {
      room.querySelector(".room-title").textContent = `Room ${index + 1}`;
    });
    roomCount = rooms.length;
  }

  function createRoom() {
    roomCount++;
    const newRoom = document.createElement("div");
    newRoom.classList.add("room-option");
    newRoom.innerHTML = `
      <span class="room-title">Room ${roomCount}</span>
      <div class="guest-count">
        <div class="guest-group">
          <span class="label">Adults:</span>
          <div class="buttons">
            <button class="count-button decrease" type="button">-</button>
            <span class="count adult-count">0</span>
            <button class="count-button increase" type="button">+</button>
          </div>
        </div>
        <div class="guest-group">
          <span class="label">Children:</span>
          <div class="buttons">
            <button class="count-button decrease" type="button">-</button>
            <span class="count child-count">0</span>
            <button class="count-button increase" type="button">+</button>
          </div>
        </div>
        <button class="remove-room" type="button">Remove Room</button>
      </div>
    `;
    roomOptions.insertBefore(newRoom, addRoomButton);
    setCounterListeners(newRoom);

    newRoom.querySelector(".remove-room").addEventListener("click", (e) => {
      e.stopPropagation();
      newRoom.remove();
      updateRoomTitles();
    });
  }

  addRoomButton.addEventListener("click", createRoom);
  document.querySelectorAll(".room-option").forEach(setCounterListeners);

  doneButton.addEventListener("click", () => {
    roomOptions.style.display = "none";
    const rooms = document.querySelectorAll(".room-option");
    let totalAdults = 0;
    let totalChildren = 0;

    rooms.forEach((room) => {
      totalAdults += parseInt(room.querySelector(".adult-count").textContent);
      totalChildren += parseInt(room.querySelector(".child-count").textContent);
    });

    const totalRooms = rooms.length;
    const totalGuests = totalAdults + totalChildren;

    roomInput.value = `Rooms: ${totalRooms}, Guests: ${totalGuests}`;
 
  });

  document.addEventListener("click", (e) => {
    if (
      roomOptions.style.display === "block" &&
      !roomOptions.contains(e.target) &&
      e.target !== roomInput
    ) {
      roomOptions.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const cancelButton = document.getElementById("cancel-booking");

  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      // Directly redirect to the cancel animation page
      window.location.href = "cancel-confirm.html";
    });
  }
});
// Change main image when thumbnail is clicked
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("main-room-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            // Change the main image source
            mainImage.src = this.src;

            // Remove 'active' class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove("active"));

            // Add 'active' class to the clicked thumbnail
            this.classList.add("active");
        });
    });
});

