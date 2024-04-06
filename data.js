function uploadFiles() {
  const fileInput = document.getElementById("file");
  const file = fileInput.files;
  console.log(file);

  if (file.length == 1) {
    document.getElementById("file-status").innerText = `${file.length} File Uploaded`;
    document.getElementById("file-name").style.color = '#46CDF7';
    document.getElementById("file-name").innerText = `${file[0].name}`;
  } else {
    document.getElementById("file-status").innerText = ``;
    document.getElementById("file-name").innerText = ``;
  }
}


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
    document.getElementById("full-name").style.color = 'black';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actualEmail) && actualEmail !== '') {
    document.getElementById("email").style.color = 'red';
    document.getElementById('email-error').innerText = 'Invalid email format.';
  } else {
    document.getElementById('email-error').innerText = '';
    document.getElementById("email").style.color = 'black';
  }


  return isValid;
}

async function submitToAPI(e) {
  e.preventDefault();

  const form = document.getElementById("contact-form");
  const fd = new FormData(form);

  const full_name = fd.get("name");
  const email = fd.get("email");

  if (full_name == "") {
    document.getElementById("full-name").style.color = 'red';
    document.getElementById('name-error').innerText = 'Please enter your full name.';
    return;
  }

  if (email == "") {
    document.getElementById("email").style.color = 'red';
    document.getElementById('email-error').innerText = 'Please enter a valid email.';
    return;
  }
  

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
      var submitDetails = document.getElementById("submit-details");
      submitDetails.style.display = "none";
      var messageContainer = document.getElementById("messageContainer");
      var messageHeading = document.createElement("h1");
      messageHeading.textContent = "Message was sent!";
      messageContainer.appendChild(messageHeading);
    } else {
      console.error(data.error);
      form.style.display = "none";
      var submitDetails = document.getElementById("submit-details");
      submitDetails.style.display = "none";
      var messageContainer = document.getElementById("messageContainer");
      var messageHeading = document.createElement("h1");
      messageHeading.textContent = "Your request could not be processed at this time. Please email us directly at preciseprintingcorp@gmail.com";
      messageContainer.appendChild(messageHeading);

    }
  } catch (error) {
    console.error("Error: ", error);
    form.style.display = "none";
    var submitDetails = document.getElementById("submit-details");
    submitDetails.style.display = "none";
    var messageContainer = document.getElementById("messageContainer");
    var messageHeading = document.createElement("h1");
    messageHeading.textContent = "Your request could not be processed at this time. Please email us directly at preciseprintingcorp@gmail.com";
    messageContainer.appendChild(messageHeading);
  }
}
