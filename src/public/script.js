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
    console.log('user id:', event.path[0].attributes[2].value);
    console.log('review id:', event.path[0].attributes[3].value);
  }
}
