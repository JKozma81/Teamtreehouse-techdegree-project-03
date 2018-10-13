/*
<i class="far fa-check-circle"></i>  OK
<i class="fas fa-exclamation-triangle"></i> Error
<i class="fas fa-info-circle"></i> info

border-bottom: 3px solid #1e06f8; input field border style on focus
border-bottom: 3px solid #4bf806; input field border style on ok
border: 3px solid #f80606; input field border style on error

name regexp \w*\s\w*
email regexp ^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$

*/


// Selecting form elements for further work
const $nameLabel = $('form fieldset label[for="name"]');
const $userNameField = $('#name');
const $emailLabel = $('form fieldset label[for="mail"]');
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

// DOM Ready event handler
$(() => {
    // On DOM Ready event the focus is set to the input for the User name
    $userNameField.focus();
    $jobRoleField.hide();
    $shirtColorContainer.hide();
    $nameInfo.css('display', 'none');
})

/*
 Helper function to create labels for messages
    Parameters:
        text: Text to display
        icon: Icon for the message
        position: DOM element after witch the label is inserted
        displayType: CSS display propety
        id: ID that identifying the label
        col: CSS color
*/
const generateLabel = (text, icon, position, displayType, id, col) => {
    const $fieldInfo = $(`<label id=${id}>${icon}<i> ${text}</i></label>`);

    $fieldInfo.insertAfter(position);
    $('#' + id).css({
        display: displayType,
        paddingLeft: '10px',
        color: col
    });

    return $('#' + id);
}



const $nameInfo = generateLabel('Only letters are allowed', 
                                '<i class="fas fa-info-circle"></i>', 
                                $nameLabel, 
                                'none', 
                                'nameInform', 
                                '#c0dceb');

$nameInfo.prev().css('display', 'inline-block');

const $nameError = generateLabel('Not a valid name or field is empty', 
                                 '<i class="fas fa-exclamation-triangle"></i>', 
                                 $nameLabel, 
                                 'none', 
                                 'nameError', 
                                 '#f80606');

const $nameOk = generateLabel('Ok', 
                              '<i class="far fa-check-circle"></i>', 
                              $nameLabel, 
                              'none', 
                              'nameOk', 
                              '#4bf806');



/////
const $emailInfo = generateLabel('Only letters are allowed', 
                                '<i class="fas fa-info-circle"></i>', 
                                $emailLabel, 
                                'none', 
                                'nameInform', 
                                '#c0dceb');

$emailInfo.prev().css('display', 'inline-block');

const $emailError = generateLabel('Not a valid name or field is empty', 
                                 '<i class="fas fa-exclamation-triangle"></i>', 
                                 $emailLabel, 
                                 'none', 
                                 'nameError', 
                                 '#f80606');

const $emailOk = generateLabel('Ok', 
                              '<i class="far fa-check-circle"></i>', 
                              $emailLabel, 
                              'none', 
                              'nameOk', 
                              '#4bf806');

// Adding validation to the basic info section
const validateName = () => {
    const isValidName = () => /\w*\s\w*/.test($userNameField.val());

    if (isValidName === true) {
        $nameError.css('display', 'none')
        $nameOk.css('display', 'inline-block');
        $nameInfo.css('display', 'none');

    } else {
        $nameError.css('display', 'inline-block')
        $nameOk.css('display', 'none');
        $nameInfo.css('display', 'none');
    }
}



// Event listeners

$userNameField.on('blur', validateName);

$userNameField.on('focus', () => {
    $nameError.css('display', 'none')
    $nameOk.css('display', 'none');
    $nameInfo.css('display', 'inline-block');
})



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

    $colors.each(function() {
        $(this).wrap('<span></span>').hide();
    });
});






// Preventing the form default submit function with the preventDefault methode
$submit.on('click', (e) => {
    e.preventDefault();
})
