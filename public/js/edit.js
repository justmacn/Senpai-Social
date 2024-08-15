document.querySelector('#save-btn').addEventListener('click', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const bio = document.querySelector('#bio').value.trim();
  const profile_picture = document.querySelector('#profile_picture').value.trim();
  const favorite_anime = document.querySelector('#favorite_anime').value.trim();

  try {
      const response = await fetch('/profile/edit', {
          method: 'PUT',
          body: JSON.stringify({ 
            username, password, bio, profile_picture, favorite_anime 
          }),
          headers: { 
              'Content-Type': 'application/json' 
          },
      });

      if (response.ok) {
          alert('Profile updated successfully!');
          document.location.replace('/profile');
      } else {
          const errorText = await response.text(); // Read response text for more info
          console.error('Failed to update profile:', errorText);
          alert('Failed to update profile.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile.');
  }
});
