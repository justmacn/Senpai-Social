// LOGIN MODAL
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('login_container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});
// END OF LOGIN MODAL

const loginFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document
    .querySelector("#username-input-login")
    .value.trim();
  const passwordEl = document
    .querySelector("#password-input-login")
    .value.trim();

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl,
      password: passwordEl,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert("Failed to login");
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);