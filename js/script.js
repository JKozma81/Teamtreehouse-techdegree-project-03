/*
<i class="far fa-check-circle"></i>  OK
<i class="fas fa-exclamation-triangle"></i> Error

border-bottom: 3px solid #1e06f8; input field border style on focus
border-bottom: 3px solid #4bf806; input field border style on ok
border: 3px solid #f80606; input field border style on error

*/

// DOM Ready event handler
$(() => {
// Selecting form elements for further work
const $userNameField = $('#name');
const $userEmail = $('#mail');
const $jobTitle = $('#title');
const $jobRoleField = $('#other-title');

const $shirtSize = $('#size');
const $shirtdesignContainer = $('.shirt div').eq(1);
const $shirtDesign = $('#design');
const $shirtColorContainer = $('#colors-js-puns')
const $shirtColor = $('#color');
const $colors = $('#color option');

const $activities = $('.activities');

const $payment = $('#payment');
const $crediCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $expMonth = $('#exp-month');
const $expYear = $('#exp-year');

const $submit = $('button');


// Listening to change event and if the other option is chosen then the textfield shows to enter job role
$jobTitle.on('change', () => {
   if ($jobTitle.val() === 'other') {
    $jobRoleField.show();
   } else {
    $jobRoleField.hide();
   }
});

$shirtDesign.on('change', () => {
    $shirtColorContainer.show();

});



// On DOM Ready event the focus is set to the input for the User name
$userNameField.focus();
$jobRoleField.hide();
$shirtColorContainer.hide();

if ($shirtDesign.val() === 'Select Theme') {

    $colors.eq(0).text('Please select a T-shirt theme');
} else if ($shirtDesign.val() === 'js puns') {
    $colors.eq(0).show();
    $colors.eq(1).show();
    $colors.eq(2).show();
} else {
    $colors.eq(3).show();
    $colors.eq(4).show();
    $colors.eq(5).show();
}



// Preventing the form default submit function with the preventDefault methode
$submit.on('click', (e) => {
    e.preventDefault();
})

})

