


document.addEventListener("DOMContentLoaded", () => {
  const roomInput = document.getElementById("room");
  const roomOptions = document.getElementById("room-options");
  const addRoomButton = document.getElementById("add-room");
  const doneButton = document.getElementById("done-button");
  const summaryDisplay = document.getElementById("summary-display");

  // Start with 1 room by default
  let roomCount = 1;

  // Toggle visibility of room options
  roomInput.addEventListener("click", () => {
    roomOptions.style.display =
      roomOptions.style.display === "none" ? "block" : "none";
  });

  // Handle + and - for each room
  function setCounterListeners(roomDiv) {
    roomDiv.querySelectorAll(".count-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const countSpan = btn.parentElement.querySelector(".count");
        let count = parseInt(countSpan.textContent);

        if (btn.classList.contains("increase")) count++;
        else if (btn.classList.contains("decrease") && count > 0) count--;

        countSpan.textContent = count;
      });
    });
  }

  // Function to update room titles after any removal
  function updateRoomTitles() {
    const rooms = document.querySelectorAll(".room-option");
    rooms.forEach((room, index) => {
      const title = room.querySelector(".room-title");
      title.textContent = `Room ${index + 1}`;
    });
    roomCount = rooms.length; // Update room count to actual visible count
  }

  // Create new room dynamically
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
            <button class="count-button decrease">-</button>
            <span class="count adult-count">0</span>
            <button class="count-button increase">+</button>
          </div>
        </div>
        <div class="guest-group">
          <span class="label">Children:</span>
          <div class="buttons">
            <button class="count-button decrease">-</button>
            <span class="count child-count">0</span>
            <button class="count-button increase">+</button>
          </div>
        </div>
        <button class="remove-room">Remove Room</button>
      </div>
    `;

    roomOptions.insertBefore(newRoom, addRoomButton);
    setCounterListeners(newRoom);

    // Handle remove button
    const removeBtn = newRoom.querySelector(".remove-room");
    removeBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent closing the room box
  newRoom.remove();
  updateRoomTitles(); // Recalculate numbering and count
});

  }

  addRoomButton.addEventListener("click", createRoom);

  document.querySelectorAll(".room-option").forEach(setCounterListeners);

  // Done button: calculate totals & hide
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
    summaryDisplay.innerHTML = `
      🏠 <strong>Total Rooms:</strong> ${totalRooms} &nbsp;&nbsp;
      👥 <strong>Total Guests:</strong> ${totalGuests}
      <br>Adults: ${totalAdults}, Children: ${totalChildren}
    `;
  });

  // Hide options when clicking outside (only if visible)
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
