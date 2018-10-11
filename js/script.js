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

const $activities = $('.activities');

const $payment = $('#payment');
const $crediCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $expMonth = $('#exp-month');
const $expYear = $('#exp-year');




const $submit = $('button');



// On DOM Ready event the focus is set to the input for the User name
$userNameField.focus();
$jobRoleField.hide();



// Preventing the form default submit function with the preventDefault methode
$submit.on('click', (e) => {
    e.preventDefault();
})
})

