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
      console.error(data.error);
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("An error occurred. Please try again later.");
  }
}
