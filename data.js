function validateForm() {
  let isValid = true;
  let actualName = document.getElementById("full-name").value;
  let actualEmail = document.getElementById("email").value;
  let actualMessage = document.getElementById("message").value

  if (!/^[a-zA-ZÀ-ÿ ,.'-]{1,30}$/.test(actualName) && actualName !== '') {
    document.getElementById("full-name").style.color = 'red';
    document.getElementById('name-error').innerText = 'Name must contain only letters and spaces!';
  } else {
    document.getElementById('name-error').innerText = '';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actualEmail) && actualEmail !== '') {
    document.getElementById("email").style.color = 'red';
    document.getElementById('email-error').innerText = 'Invalid email format.';
  } else {
    document.getElementById('email-error').innerText = '';
  }


  return isValid;
}

async function submitToAPI(e) {
  e.preventDefault();

  const form = document.getElementById("contact-form");
  const fd = new FormData(form);

  try {
    const response = await fetch(
      "https://enyrcyxow4.execute-api.us-east-1.amazonaws.com/stage-1",
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
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
