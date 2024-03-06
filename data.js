async function submitToAPI(e) {
  e.preventDefault();
  const form = document.getElementById("contact-form");
  const fd = new FormData(form);

  try {
    const response = await fetch(
      "https://enyrcyxow4.execute-api.us-east-1.amazonaws.com/stage-1",
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      form.style.display = "none";
      var submitDeatils = document.getElementById("submit-details");
      submitDeatils.style.display = "none";
      var messageContainer = document.getElementById("messageContainer");
      var messageHeading = document.createElement("h1");
      messageHeading.textContent = "Message was sent!";
      messageContainer.appendChild(messageHeading);

    } else {
      alert("Unsuccessful");
      // Optionally, you might want to log the error or additional details from the response
      console.error(data.error); // Access the error message if provided in the response
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any unexpected errors here
    alert("An error occurred. Please try again later.");
  }
}
