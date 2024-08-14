const deleteBtn = document.getElementById('delete-profile');
const deletePostBtn = document.querySelectorAll('.delete-post-btn');


//delete entire profile
deleteBtn.addEventListener('click', async function() {
    const confirmation = confirm("Are you sure you want to delete your profile? This action cannot be undone.");

    if (confirmation) {
      try {
        const response = await fetch('/profile/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert('Profile deleted successfully.');
          window.location.href = '/'; // Redirect to the home page or a goodbye page
        } else {
          alert('Failed to delete profile.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while trying to delete your profile.');
      }
    }
  });

//delete posts
  deletePostBtn.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', async function() {
      const postId = this.getAttribute('data-id');
      const confirmation = confirm("Are you sure you want to delete this post?");

      if (confirmation) {
        try {
          const response = await fetch(`/profile/post/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            alert('Post deleted successfully.');
            location.reload(); // Reload the page to reflect the changes
          } else {
            alert('Failed to delete the post.');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('An error occurred while trying to delete the post.');
        }
      }
    });
  });
