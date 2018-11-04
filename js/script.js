/* selected DOM ELEMENTS*/
$activities = $('.activities label');
const $design = $('#design');
const $color = $('#color');
const $title = $("#title");
const checkboxes = $('input[type="checkbox"]');
/* sum for activity prices */
let sumOfActiviesPrice = 0;
/* regular expression literals for validation*/
const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validZipCodeRegEx = /^\d{5}$/;
const validCVVRegEx = /^\d{3}$/;
const validCCNumRegEx = /^\d{13}$|^\d{14}$|^\d{15}$|^\d{16}$/;
/* input error messages */
const nameInputError = "<p class='nameError' style='color:red;'> please enter name </p>";
const emailInputError = "<p class ='emailError' style='color:red;'> please enter email in correct format: name@example.com </p>";
const cardNumInputError = "<p class ='cardError' style='color:red;'> please enter valid card number </p>";
const zipCodeInputError = "<p class='zip-code-error' style='color:red;'> please enter valid zip code </p>";
const cvvInputError = "<p class='cvv-error' style='color:red;'> please enter valid cvv </p>";
const activitiesInputError = "<p class='activities-error' style='color:red;'> please select an activity </p>";
//function to get price from activity label using regex
function getPrice(label) {
  let re = /\$\d\d\d$/g;
  return parseInt(re.exec(label).toString().substring(1, 4));
}
// validate name field returns true if name field is not empty false other wise
function validateName() {
  if ($('#name').val().length === 0 && $('.nameError').length === 0) {
    $('#name').after($(nameInputError));
    return false;
  }
  if ($('#name').val().length === 0 ) {
    return false;
  }
  if ($('#name').val().length > 0 && $('.nameError').length > 0) {
    $('.nameError').remove();
    return true;
  }
  return true;
}
// function to validate user email return bool
function validateEmail() {
  if (!validEmailRegEx.test($('#mail').val()) && $('.emailError').length === 0) {
    $('#mail').after($(emailInputError));
    return false;
  }
  if (!(validEmailRegEx.test($('#mail').val()))) {
    return false;
  }
  if ($('#mail').val().length > 0 && $('.emailError').length > 0) {
    $('.emailError').remove();
    return true;
  }
  return true;
}
// function to validate if user has chosen an activity return bool
function validateActivities() {
  let count = 0
  $.each($('.activities input'), function( index, value ) {
    if($(value).prop('checked') === true) {
      count ++;
    }
  });
    if (count === 0 && $('.activities-error').length === 0) {
      $('.activities').append($(activitiesInputError));
      return false;
    }
    if (count === 0) {
      return false;
    }
    if (count > 0 && $('.activities-error').length > 0) {
      $('.activities-error').remove();
      return true;
    }
    return true;
}
// function to validate credit card number returns bool
function validateCCNum() {
  if ($('#payment').prop('selectedIndex') != 1) {
    return true;
  }
  if(!(validCCNumRegEx.test($('#cc-num').val())) && $('.cardError').length === 0) {
    $('#cc-num').before($(cardNumInputError));
    return false;
  }
  if (!(validCCNumRegEx.test($('#cc-num').val()))) {
    return false;
  }
  if ((validCCNumRegEx.test($('#cc-num').val())) && $('.cardError').length > 0) {
    $('.cardError').remove();
    return true;
  }
  return true;
}
// function to validate zip code returns bool
function validateZipCode() {
  if ($('#payment').prop('selectedIndex') != 1) {
    return true;
  }
  if (!(validZipCodeRegEx.test($('#zip').val())) && $('.zip-code-error').length === 0) {
    $('#zip').before($(zipCodeInputError));
    return false;
  }
  if (!(validZipCodeRegEx.test($('#zip').val()))) {
    return false;
  }
  if ((validZipCodeRegEx.test($('#zip').val())) && $('.zip-code-error').length > 0) {
    $('.zip-code-error').remove();
    return true;
  }
  return true;
}
// function to validate cvv returns bool
function validateCVV() {
  if ($('#payment').prop('selectedIndex') != 1) {
    return true;
  }
  if (!(validCVVRegEx.test($('#cvv').val())) && $('.cvv-error').length === 0) {
    $('#cvv').before($(cvvInputError));
    return false;
  }
  if (!(validCVVRegEx.test($('#cvv').val()))) {
    return false;
  }
  if ((validCVVRegEx.test($('#cvv').val())) && $('.cvv-error').length > 0) {
    $('.cvv-error').remove('.cvv-error');
    return true;
  }
  return true;
}
// array of validation functions
const validateFunctions = [validateName, validateEmail, validateActivities, validateCCNum, validateZipCode, validateCVV  ];
//function to test whether all function in an array return true. calls all functions in array and returns true only if all functions return true
function allFuncsTrue(arrayOfFunctions) {
  let count = 0;
  for (var i = 0; i < arrayOfFunctions.length; i++) {
    if (arrayOfFunctions[i]() === true) {
      count ++
    }
  }
  if (count === arrayOfFunctions.length) {
    return true;
  }else {
    return false;
  }

}
//event handler to show input field if user selects other as job role
$title.on('change', event => {
  if ($title.prop('selectedIndex') == 5) {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});
//event handler hides or shows colors based on them selection
$design.on('change', (event) => {
  //select theme is selected
  if($design.prop('selectedIndex') == 0){
    $color.hide();
    $color.parent().hide();
  }else {
    $color.show();
    $color.parent().show();
  }
  //if js puns is selected
  if($('#design option:selected').val() == 'js puns') {
    $('#color option').each(function(index, element){
      $color.prop('selectedIndex', 1);
      if (index > 2 && element.style.display != 'none') {
        $(element).css('display', 'none');
      }else {
        $(element).css('display', '');
      };
    });
  };
  //if heart js is selected
  if($('#design option:selected').val() == 'heart js') {
    $('#color option').each(function(index, element){
      $color.prop('selectedIndex', 3);
      if (index <= 2 && element.style.display != 'none') {
        $(element).css('display', 'none');
      }else {
        $(element).css('display', '');
      };
    });
  };
});
//event handler for form submission validates all fields before allowing page reload
$('form').on('submit', function(event){
  event.preventDefault();
  if(allFuncsTrue(validateFunctions)) {
    location.reload();
  }
});
//checkbox event handler to dissallow time conflicts when checkmarking activities
checkboxes.change(event, function(){
  //display total based on checked items
  if (event.target.checked) {
    sumOfActiviesPrice += getPrice($(event.target).parent().text());
    $('.sum').text(`Total: $${sumOfActiviesPrice}`);
  }else {
    sumOfActiviesPrice -= getPrice($(event.target).parent().text());
    $('.sum').text(`Total: $${sumOfActiviesPrice}`);
  }
  // conditionals to disable checkboxes with time conflicts
  if (event.target.checked && $(event.target).attr('name') === 'js-frameworks' ) {  // if js-frameworks is checked
      $('input[type="checkbox"][name="express"]').prop('disabled', true);                                                                          //disable checkboxes with conflicting time
  }else if (event.target.checked && $(event.target).attr('name') === 'express' ) {  // if express is checked
      $('input[type="checkbox"][name="js-frameworks"]').prop('disabled', true);                                                                          //disable checkboxes with conflicting time
  }else if (event.target.checked && $(event.target).attr('name') === 'js-libs' ) {  // if js-libs is checked
      $('input[type="checkbox"][name="node"]').prop('disabled', true);                                                                          //disable checkboxes with conflicting time
  }else if (event.target.checked && $(event.target).attr('name') === 'node' ) {  // if node is checked
      $('input[type="checkbox"][name="js-libs"]').prop('disabled', true);                                                                          //disable checkboxes with conflicting time
  }else if (!event.target.checked && $(event.target).attr('name') === 'js-frameworks' ) {  // if js-frameworks is unchecked
      $('input[type="checkbox"][name="express"]').prop('disabled', false);                                                                          //disable checkboxes with conflicting time
  }else if (!event.target.checked && $(event.target).attr('name') === 'express' ) {  // if express is unchecked
      $('input[type="checkbox"][name="js-frameworks"]').prop('disabled', false);                                                                          //disable checkboxes with conflicting time
  }else if (!event.target.checked && $(event.target).attr('name') === 'js-libs' ) {  // if  js-libs is unchecked
      $('input[type="checkbox"][name="node"]').prop('disabled', false);                                                                          //disable checkboxes with conflicting time
  }else if (!event.target.checked && $(event.target).attr('name') === 'node' ) {     // if node is unchecked
      $('input[type="checkbox"][name="js-libs"]').prop('disabled', false);                                                                          //disable checkboxes with conflicting time
  }
});
//change event hanlder for payments options hides payment information based on users selected payment method
$('#payment').on('change', function(event){
  //if credit card show only credit Card
  if($('option[value="credit card"]').prop('selected') === true) {
    $('.credit-card').show();
    //hide paypal info
    $('.credit-card + div').hide();
    //hide bitcoin information
    $('.credit-card + div + div').hide();
  }
  //if paypal show only PayPal
  if($('option[value="paypal"]').prop('selected') === true) {
    //hide credit card information
    $('.credit-card').hide();
    //show paypal info
    $('.credit-card + div').show();
    //hide bitcoin information
    $('.credit-card + div + div').hide();
  }
  //if bitcoin show only Bitcoin
  if($('option[value="bitcoin"]').prop('selected') === true) {
    //hide credit card information
    $('.credit-card').hide();
    //show paypal info
    $('.credit-card + div').hide();
    //show bitcoin information
    $('.credit-card + div + div').show();
  }
});
//set focus on first input
$('#name').focus();
//hides other job role input field
$('#other-title').hide();
//hide color options until theme is selected
$color.hide();
$color.parent().hide();
// set payment method selection to credit Card
$('option[value="credit card"]').prop('selected', true);
// disable "select payment" option
$('option[value="select_method"]').prop('disabled', true);
//hide paypal info
$('.credit-card + div').hide();
//hide bitcoin information
$('.credit-card + div + div').hide();
$('.sum').text(`Total: $${sumOfActiviesPrice}`);
