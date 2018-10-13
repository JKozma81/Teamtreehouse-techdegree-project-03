/*
<i class="far fa-check-circle"></i>  OK
<i class="fas fa-exclamation-triangle"></i> Error
<i class="fas fa-info-circle"></i> info

border-bottom: 3px solid #1e06f8; input field border style on focus
border-bottom: 3px solid #4bf806; input field border style on ok
border: 3px solid #f80606; input field border style on error

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

const $activity = $('.activities');
const $activityTitle = $('.activities legend');
const $activities = $('.activities input');


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
        color: col
    });
    return $('#' + id);
}



// Creating messages for name validation with the helper function i created above
const $nameError = generateLabel('Not a valid name or field is empty', 
                                 '<i class="fas fa-exclamation-triangle"></i>', 
                                 $nameLabel, 
                                 'none', 
                                 'nameError', 
                                 '#f80606');

$nameError.prev().css('display', 'inline-block');

const $nameOk = generateLabel('Ok', 
                              '<i class="far fa-check-circle"></i>', 
                              $nameLabel, 
                              'none', 
                              'nameOk', 
                              '#4bf806');

// Creating messages for email validation with the helper function i created above
const $emailError = generateLabel('Not a valid email address or field is empty', 
                                  '<i class="fas fa-exclamation-triangle"></i>', 
                                  $emailLabel, 
                                  'none', 
                                  'emailError', 
                                  '#f80606');

$emailError.prev().css('display', 'inline-block');

const $emailOk = generateLabel('Ok', 
                               '<i class="far fa-check-circle"></i>', 
                               $emailLabel, 
                               'none', 
                               'emaillOk', 
                               '#4bf806');

// Creating messages for activity validation with the helper function i created above
const $activityError = generateLabel('No activity selected, please chose one', 
                                     '<i class="fas fa-exclamation-triangle"></i>', 
                                     $activityTitle, 
                                     'none', 
                                     'activityError', 
                                     '#f80606');

$activityError.prev().css('display', 'inline-block');

const $activityOk = generateLabel('Ok', 
                                  '<i class="far fa-check-circle"></i>', 
                                  $activityTitle, 
                                  'none', 
                                  'activityOk', 
                                  '#4bf806');


// Helper functions to display and hide messages
const hideErrorMessage = (message) => {
    message.css('display', 'none');
}

const showErrorMessage = (message) => {
    message.css('display', 'inline-block')
    message.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
}

const showOkMessage = (message) => {
    message.css('display', 'inline-block');
}

const hideOkMessage = (message) => {
    message.css('display', 'none');
}


// Helper function to validate
/*
    Parameters:
        'name': validates the name and displays the appropriate message to the user
        'email': validates the email and displays the appropriate message to the user
        'color': validates the T-Shirt Info section, if no design selected hides the color selection option
        'activity': validates the Activities section, if no activity selected displays a message to the user
*/
const validating = (targetToValidate) => {

    switch (targetToValidate) {
        case 'name' : const isValidName = () => /\w+\s\w+/i.test($userNameField.val());
                    
                      if (isValidName() === true) {
                          hideErrorMessage($nameError);
                          showOkMessage($nameOk);
                          $userNameField.css('borderBottom', '3px solid #4bf806');
                      } else {
                          showErrorMessage($nameError);
                          hideOkMessage($nameOk);
                          $userNameField.css('border', '3px solid #f80606');
                      }
                      
                      break;
    
        case 'email' : const isValidEmail = () => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test($userEmail.val());
                    
                       if (isValidEmail() === true) {
                           hideErrorMessage($emailError);
                           showOkMessage($emailOk);
                           $userEmail.css('borderBottom', '3px solid #4bf806');
                       } else {
                           showErrorMessage($emailError);
                           hideOkMessage($emailOk);
                           $userEmail.css('border', '3px solid #f80606');
                       }
                       break;

        case 'color' : if ($shirtDesign.val() === 'Select Theme') {
                           $shirtColorContainer.hide();
                       }
                       break;

        case 'activity' : 
                       let counter = 0;
                       $activities.each(function() {
                            if ($(this).is(':checked') === true) {
                                counter += 1;
                            }
                       })

                       if (counter === 0) {
                            showErrorMessage($activityError);
                            hideOkMessage($activityOk);
                       } else {
                            showOkMessage($activityOk);
                            hideErrorMessage($activityError);
                       }
                       break
    }
}



// Event listeners

$userNameField.on('blur', () => validating('name'));
$userEmail.on('blur', () => validating('email'));


$userNameField.on('focus', () => {
    hideErrorMessage($nameError);
    hideOkMessage($nameOk);
    $userNameField.css({
        border: '',
        borderBottom: '3px solid #1e06f8'
    })
})

$userEmail.on('focus', () => {
    hideErrorMessage($emailError);
    hideOkMessage($emailOk);
    $userEmail.css({
        border: '',
        borderBottom: '3px solid #1e06f8'
    })
})


// Listening to change event and if the other option is selectef the textfield appears to enter job role
$jobTitle.on('change', () => {
   if ($jobTitle.val() === 'other') {
    $jobRoleField.show();
   } else {
    $jobRoleField.hide();
   }
});

// Showing the appropriate color when the design is selected
$shirtDesign.on('change', () => {
    $shirtColorContainer.show();

    switch ($shirtDesign.val()) {
        case 'js puns' :
                $colors.each(function() {
                    let puns = $(this).text();
                    if (puns.indexOf("JS Puns") > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                $colors.eq(0).prop('selected', true)
                break;

        case 'heart js':
                $colors.each(function() {
                    let heart = $(this).text();
                    if (heart.indexOf('JS shirt only') > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                $colors.eq(3).prop('selected', true)
                break;
    }
    validating('color');
    
});






// Preventing the form default submit function with the preventDefault methode
$submit.on('click', (e) => {
    e.preventDefault();
    validating('activity');
})
