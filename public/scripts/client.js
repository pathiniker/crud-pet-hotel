$(function() {
  getOwner();
  getPets();

  $('#pets').on('submit', addPet);
  $('#owner').on('submit', addOwner);
  $('#guests').on('click', '.save', updatePet);
  $('#guests').on('click', '.delete', deletePet);
  // $('#guests').on('click', '.check', updateStatus);
});

function getOwner() {
  $('select').empty();
  $.ajax({
    type: 'GET',
    url: '/owner_reg',
    success: function(owners) {
      owners.forEach(function(owner){
        console.log(owner);
        var fullName = (owner.first_name + ' ' + owner.last_name);
        $('select').append('<option value="' + owner.id + '">' + fullName + '</option>');
      });
    }
  });
}

function addOwner(event) {
  event.preventDefault();

  var ownerData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/owner_reg',
    data: ownerData,
    success: getOwner
  });

  $(this).find('input').val('');
}

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pet_app',
    success: displayPets
  });
}




function displayPets(response) {
  console.log(response);
  var $table = $('#table-rows');
  $table.empty();
  response.forEach(function(pet) {
    var $tr = $('<tr></tr>');
    var $form = $('<form></form>');

    $form.append('<td id="' + pet.owner_id + '">' + pet.first_name + ' ' + pet.last_name + '</td>');
    // $form.append('<td>' + pet.first_name + ' ' + pet.last_name + '</td>');
    $form.append('<td><input type="text" name="name" value="' + pet.name + '"/></td>');
    $form.append('<td><input type="text" name="animal" value="' + pet.animal + '"/></td>');
    $form.append('<td><input type="text" name="color" value="' + pet.color + '"/></td>');

    var $saveButton = $('<button class="save">Save</button>');
    $saveButton.data('id', pet.id);
    $form.append($saveButton);

    var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', pet.id);
    $form.append($deleteButton);

    var $checkButton = $('<button class="check">CHECK IN</button>');
    $checkButton.data('id', pet.id);
    $form.append($checkButton);


    // var date = new Date(pet.published);

    // surely there must be a better way to format this date
    // $form.append('<td><input type="date" name="published" value="' + date.toISOString().slice(0,10) + '"/></td>');

    // make a button and store the id data on it






    $tr.append($form);
    $table.append($tr);
  });
}
//
function addPet(event) {
  event.preventDefault();

  var petData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/pet_app',
    data: petData,
    success: getPets
  });

  $(this).find('input').val('');
}

function updatePet(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();
  console.log('data', data);
  $.ajax({
    type: 'PUT',
    url: '/pet_app/' + $button.data('id'),
    data: data,
    success: getPets
  });
}

function deletePet(event) {
  event.preventDefault();

  var petId = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/pet_app/' + petId,
    success: getPets
  });
}

// function updateStatus(event) {
//   event.preventDefault();
//
// var date = new Date();
//   // date = date.toISOString().slice(0,10);
//
//   var status = $(this).text();
//   var petId = $(this).data('id');
//   var data = {};
//
//   data.date = date;
//   // data.id = petId;
//   data.status = status;
//
//   console.log('data', data);
//
// console.log('date', date);
// console.log('pet id', petId);
//
//
//
//   $.ajax({
//     type: 'PUT',
//     url: '/status/' + status +'/'+ petId,
//     data: data,
//     success: $('.check').text('CHECK OUT')
//
//
//
//   })
//
//
// }
