async function submitToAPI(e) {
  e.preventDefault();
  console.log(e);
  const form = document.getElementById("contact-form");
  const fd = new FormData(form);

  try {
    const response = await fetch(
      // add actions secret
      "{{ENDPOINT}}",
      {
        method: "POST",
        body: fd,
      }
    );

    console.log("This is the response: ", response);

    const data = await response.json();

    console.log("This is the data: ", data["message"]);

    if (response.status === 200) {
      alert("Successful");
      form.reset();
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
