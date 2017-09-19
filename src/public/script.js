window.onload = function() {
  const deleteButtons = document.querySelectorAll('.delete-button');

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteReview);
  }
}

function deleteReview(event) {
  const confirmResult = window.confirm('Are you sure you want to delete this review?');

  if (confirmResult) {
    const userID = event.target.getAttribute('data-user-id');
    const reviewID = event.target.getAttribute('data-review-id');

    fetch(`/reviews/${userID}/${reviewID}`, {
      method: 'DELETE',
    })
    // .then(() => {
    //   window.location.reload();
    // })
  }
}
