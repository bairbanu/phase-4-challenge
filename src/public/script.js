window.onload = function () {
  const deleteButtons = document.querySelectorAll('.delete-button');

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteReview);
  }
}

function deleteReview(event) {
  const confirmResult = confirm('Are you sure you want to delete this review?');

  if (confirmResult) {
    // make fetch call:: 2 and 3 are the attributes I need

    const userID = event.target.getAttribute('data-user-id');
    const reviewID = event.target.getAttribute('data-review-id');

    // fetch('http://localhost:3000/reviews', {
    //   method: "GET",
    //   data: [userID, reviewID]
    // });

    fetch(`/reviews`, {method: 'delete', credentials: 'include'})
      .then(location.reload())
      .catch((error) => {
        console.error(error)
      })
  }
}
