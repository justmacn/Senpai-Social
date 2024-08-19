const newFormHandler = async function (event) {
  event.preventDefault();

  const anime_title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-content').value.trim();

  // Reminder- We were able to look at out project-2-setup-guide/controllers/api/exampleDataRoutes.js file to determine what our route is for this request
  try {
    const response = await fetch('/api/post', {
      method: "POST",
      body: JSON.stringify({
        anime_title, text
      }),
      headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    alert('Post created successfully!');
    document.location.replace('/profile');
} else {
    const errorText = await response.text(); // Read response text for more info
    console.error('Failed to create post:', errorText);
    alert('Failed to create post.');
}
} catch (error) {
console.error('Error:', error);
alert('An error occurred while creating the post.');
}
};

document
  .querySelector("#new-posts-form")
  .addEventListener("submit", newFormHandler);
