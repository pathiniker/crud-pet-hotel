$(function() {
  getPets();

  $('#pets').on('submit', addPet);

  // $('#guests').on('click', '.save', updateBook);
  // $('#guests').on('click', '.delete', deleteBook);
});

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pet_app',
    success: displayBooks
  });
}

function displayBooks(response) {
  console.log(response);
  var $table = $('#guests');
  $table.empty();
  response.forEach(function(book) {
    var $tr = $('<tr></tr>');
    var $form = $('<form></form>');
    $form.append('<td><input type="text" name="title" value="' + book.title + '"/></td>');
    $form.append('<td><input type="text" name="author" value="' + book.author + '"/></td>');
    var date = new Date(book.published);

    // surely there must be a better way to format this date
    $form.append('<td><input type="date" name="published" value="' + date.toISOString().slice(0,10) + '"/></td>');

    // make a button and store the id data on it
    // var $saveButton = $('<button class="save">Save!</button>');
    // $saveButton.data('id', book.id);
    // $form.append($saveButton);
    //
    // var $deleteButton = $('<button class="delete">Delete</button>');
    // $deleteButton.data('id', book.id);
    // $form.append($deleteButton);


    $tr.append($form);
    $table.append($tr);
  });
}

function addPet(event) {
  event.preventDefault();

  var petData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/books',
    data: petData,
    success: getPets
  });

  $(this).find('input').val('');
}

function updateBook(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    type: 'PUT',
    url: '/pet_app/' + $button.data('id'),
    data: data,
    success: getPets
  });
}

function deleteBook(event) {
  event.preventDefault();

  var petId = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/pet_app/' + petId,
    success: getPets
  });
}
