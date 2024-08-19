
const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document
    .querySelector("#username-input-signup")
    .value.trim();
  const passwordEl = document
    .querySelector("#password-input-signup")
    .value.trim();

  if (passwordEl.length >= 8 && usernameEl) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
        profile_picture: "https://filestore.community.support.microsoft.com/api/images/8a86b79d-4e94-4c61-ace1-837ffd763978?upload=true",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to sign up");
    }
  } else {
    alert(
      "Please include both a username and password, and make sure your password is at least 8 characters long"
    );
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
