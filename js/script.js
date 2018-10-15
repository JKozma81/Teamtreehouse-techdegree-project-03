/*
<i class="far fa-check-circle"></i>  OK
<i class="fas fa-exclamation-triangle"></i> Error
<i class="fas fa-info-circle"></i> info

border-bottom: 3px solid #1e06f8; input field border style on focus
border-bottom: 3px solid #4bf806; input field border style on ok
border: 3px solid #f80606; input field border style on error

*/

// Selecting form elements for further work
// Basic info section
const $nameLabel = $('form fieldset label[for="name"]');
const $userNameField = $('#name');
const $emailLabel = $('form fieldset label[for="mail"]');
const $userEmail = $('#mail');
const $jobTitle = $('#title');
const $jobRoleField = $('#other-title');
// T-shirt section
const $shirtSize = $('#size');
const $shirtdesignContainer = $('.shirt div').eq(1);
const $shirtDesign = $('#design');
const $shirtColorContainer = $('#colors-js-puns')
const $shirtColor = $('#color');
const $colors = $('#color option');
// Activity section
const $activity = $('.activities');
const $activityTitle = $('.activities legend');
const $activityDescriptions = $('.activities label');
const $activities = $('.activities input');
// Payment section
const $payment = $('#payment');
const $creditCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $expMonth = $('#exp-month');
const $expYear = $('#exp-year');
const $paypal = $('form fieldset:nth-of-type(4)>div:nth-of-type(2)');
const $bitcoin = $('form fieldset:nth-of-type(4)>div:nth-of-type(3)');

const $submit = $('button');

// Helper variables
let activityTime = [];
let priceToPay = 0;

// DOM Ready event handler
$(() => {
    // On DOM Ready event the focus is set to the input for the User name
    $userNameField.focus();
    $jobRoleField.hide();
    $shirtColorContainer.hide();
    createPriceDisplay();
    $('option[value="credit card"]').prop('selected', true);
    // Paypal
    $paypal.hide();
    // Bitcoin
    $bitcoin.hide();
})

/*
 Helper function to create labels for messages
    Parameters:
        icon: Icon for the message
        position: DOM element after witch the label is inserted
        displayType: CSS display propety
        id: ID that identifying the label
        col: CSS color
*/
const generateLabel = (icon, position, displayType, id, col) => {
    const $fieldInfo = $(`<label id=${id}>${icon}<i> <span></span></i></label>`);
    $fieldInfo.insertAfter(position);
    $('#' + id).css({
        display: displayType,
        color: col
    });
    return $('#' + id);
}

// Creating messages for name validation with the helper function i created above
const $nameError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                 $nameLabel, 
                                 'none', 
                                 'nameError', 
                                 '#f80606');

$nameError.prev().css('display', 'inline-block');

const $nameOk = generateLabel('<i class="far fa-check-circle"></i>', 
                              $nameLabel, 
                              'none', 
                              'nameOk', 
                              '#4bf806');

// Creating messages for email validation with the helper function i created above
const $emailError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                  $emailLabel, 
                                  'none', 
                                  'emailError', 
                                  '#f80606');

$emailError.prev().css('display', 'inline-block');

const $emailOk = generateLabel('<i class="far fa-check-circle"></i>', 
                               $emailLabel, 
                               'none', 
                               'emailOk', 
                               '#4bf806');

// Creating messages for activity validation with the helper function i created above
const $activityError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                     $activityTitle, 
                                     'none', 
                                     'activityError', 
                                     '#f80606');

$activityError.prev().css('display', 'inline-block');

const $activityOk = generateLabel('<i class="far fa-check-circle"></i>', 
                                  $activityTitle, 
                                  'none', 
                                  'activityOk', 
                                  '#4bf806');

// Creating messages for CVV number validation with the helper function i created above
const $cvvError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                $payment, 
                                'none', 
                                'cvvError', 
                                '#f80606');

const $cvvOk = generateLabel('<i class="far fa-check-circle"></i>', 
                             $payment, 
                             'none', 
                             'cvvOk', 
                             '#4bf806');

// Creating messages for Zip number validation with the helper function i created above
const $zipError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                $payment, 
                                'none', 
                                'zipError', 
                                '#f80606');

const $zipOk = generateLabel('<i class="far fa-check-circle"></i>', 
                             $payment, 
                             'none', 
                             'zipOk', 
                             '#4bf806');

// Creating messages for Credit card number validation with the helper function i created above
const $creditCardError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                     $payment, 
                                     'none', 
                                     'creditCardError', 
                                     '#f80606');

const $creditCardOk = generateLabel('<i class="far fa-check-circle"></i>', 
                                  $payment, 
                                  'none', 
                                  'creditCardOk', 
                                  '#4bf806');

// Helper functions to display and hide messages
const hideErrorMessage = (message) => {
    message.css('display', 'none');
}

const showErrorMessage = (message) => {
    message.css('display', 'block')
    message.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
}

const showOkMessage = (message) => {
    message.css('display', 'block');
}

const hideOkMessage = (message) => {
    message.css('display', 'none');
}

// Function to validate name field
const validateName = () => {
    if ($userNameField.val().length === 0) {
        $('#nameError span').text('Field blank, please enter your name');
        showErrorMessage($nameError);
        hideOkMessage($nameOk);
        $userNameField.css('border', '3px solid #f80606');
    } else {
        const isValidName = () => /\w+\s\w+/i.test($userNameField.val());
                   
        if (isValidName() === true) {
            $('#nameOk span').text('Name OK');
            hideErrorMessage($nameError);
            showOkMessage($nameOk);
            $userNameField.css({border: '',
                            borderBottom: '3px solid #4bf806'});
        } else {
            $('#nameError span').text('Not a valide name');
            showErrorMessage($nameError);
            hideOkMessage($nameOk);
            $userNameField.css('border', '3px solid #f80606');
        }
    }
}

// Function to validate email address
const validateEmail = () => {

    if ($userEmail.val().length === 0) {
        $('#emailError span').text('Field blank, please enter your email');
        showErrorMessage($emailError);
        hideOkMessage($emailOk);
        $userEmail.css('border', '3px solid #f80606');
    } else {
        const isValidEmail = () => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test($userEmail.val());
                    
        if (isValidEmail() === true) {
            $('#emailOk span').text('Email address OK');
            hideErrorMessage($emailError);
            showOkMessage($emailOk);
            $userEmail.css({border: '',
                            borderBottom: '3px solid #4bf806'});
        } else {
            $('#emailError span').text('Not a valide email address');
            showErrorMessage($emailError);
            hideOkMessage($emailOk);
            $userEmail.css('border', '3px solid #f80606');
        }
    }
}

// Function to hide colors when no design selected
const validateColors = () => {
    if ($shirtDesign.val() === 'Select Theme') {
        $shirtColorContainer.hide();
    }
}

// Function to validate activity
const validateActivity = () => {
    let counter = 0;

    $activities.each(function() {
         if ($(this).is(':checked') === true) {
             counter += 1;
         }
    })

    if (counter === 0) {
        $('#activityError span').text('No activity selected');
         showErrorMessage($activityError);
         hideOkMessage($activityOk);
    } else {
        $('#activityOk span').text('Activity selected');
         showOkMessage($activityOk);
         hideErrorMessage($activityError);
    }
}

// Function to validate credit card
const validateCreditCard = () => {
    let cardNumberLength = $ccNum.val().length;
    let zipCodeLength = $zip.val().length;
    let cvvNumberLength = $cvv.val().length;
    let cardNumber = parseInt($ccNum.val());
    let zipCode = parseInt($zip.val());
    let cvvNumber = parseInt($cvv.val());

    if (cardNumberLength === 0) {
        showErrorMessage($creditCardError);
        $('#creditCardError span').text('Field blank, please enter the card number');
        $ccNum.css('border', '3px solid #f80606');
        hideOkMessage($creditCardOk);        
    } else if (!isNaN(parseInt(cardNumber)) && (cardNumberLength >= 13 && cardNumberLength <= 15)) {
        showOkMessage($creditCardOk);
        $('#creditCardOk span').text('Card number OK');
        $ccNum.css({border: '',
                    borderBottom: '3px solid #4bf806'});
        hideErrorMessage($creditCardError);
    } else {
        showErrorMessage($creditCardError);
        $('#creditCardError span').text('Not a valid card number');
        $ccNum.css('border', '3px solid #f80606');
        hideOkMessage($creditCardOk);
    }

    if (zipCodeLength === 0) {
        showErrorMessage($zipError);
        $('#zipError span').text('Field blank, please enter the your zip number');
        $zip.css('border', '3px solid #f80606');
        hideOkMessage($zipOk);        
    } else if (!isNaN(parseInt(zipCode)) && (zipCodeLength === 5)) {
        showOkMessage($zipOk);
        $('#zipOk span').text('Zip number OK');
        $zip.css({border: '',
                  borderBottom: '3px solid #4bf806'});
        hideErrorMessage($zipError);
    } else {
        showErrorMessage($zipError);
        $('#zipError span').text('Not a valid zip number');
        $zip.css('border', '3px solid #f80606');
        hideOkMessage($zipOk);
    }

    if (cvvNumberLength === 0) {
        showErrorMessage($cvvError);
        $('#cvvError span').text('Field blank, please enter the CVV number');
        $cvv.css('border', '3px solid #f80606');
        hideOkMessage($cvvOk);        
    } else if (!isNaN(parseInt(cvvNumber)) && (cvvNumberLength === 3)) {
        showOkMessage($cvvOk);
        $('#cvvOk span').text('CVV number OK');
        $cvv.css({border: '',
                  borderBottom: '3px solid #4bf806'});
        hideErrorMessage($cvvError);
    } else {
        showErrorMessage($cvvError);
        $('#cvvError span').text('Not a valid CVV number');
        $cvv.css('border', '3px solid #f80606');
        hideOkMessage($cvvOk);
    }
}

// Create label for the total price to display
const createPriceDisplay = () => {
    $activity.append(`<label id="total">Total price: $<span id="price"></span></label>`);
    $('label#total').css({
        color : '#184f68',
        fontWeight: 'bold',
    });
    $('#total').hide();
}

// Event listeners
$userEmail.on('keyup', () => validateEmail());
$ccNum.on('keyup', () => validateCreditCard());
$zip.on('keyup', () => validateCreditCard());
$cvv.on('keyup', () => validateCreditCard());

$userNameField.on('focus', () => {
    hideErrorMessage($nameError);
    hideOkMessage($nameOk);
})

$userEmail.on('focus', () => {
    hideErrorMessage($emailError);
    hideOkMessage($emailOk);
})

$ccNum.on('focus', () => {
    hideErrorMessage($creditCardError);
    hideOkMessage($creditCardOk);
})

$zip.on('focus', () => {
    hideErrorMessage($zipError);
    hideOkMessage($zipOk);
})

$cvv.on('focus', () => {
    hideErrorMessage($cvvError);
    hideOkMessage($cvvOk);
})

// Disable the activity that is in the same time as the chosen
$activities.on('change', function() {
    let dayAndHour = $(this).parent().text().slice($(this).parent().text().indexOf('—') + 2, $(this).parent().text().indexOf('$'));
    $('#total').show();
    
    if (!activityTime.includes(dayAndHour)) {
        activityTime.push(dayAndHour);
                
    } else if ($(this).is(':checked') === false && activityTime.includes(dayAndHour) === true) {
        activityTime.splice(activityTime.indexOf(dayAndHour), 1);
    }

    let $cost = $(this).parent().text().slice($(this).parent().text().indexOf('$') + 1, $(this).parent().text().length);
    let dollars = $('#price').text();
    if ($(this).is(':checked') === true) {
        priceToPay += parseInt($cost);
        dollars = priceToPay;
    } else {
        priceToPay -= parseInt($cost);
        dollars = priceToPay;
    }
    $('#price').text(dollars);

    $activities.each(function() {
               
        if (!$(this).is(':checked') && activityTime.includes($(this).parent().text().slice($(this).parent().text().indexOf('—') + 2, $(this).parent().text().indexOf('$')))) {
                $(this).prop('disabled', true);
                $(this).parent().css({
                                      color: '#c1deeb',
                                      fontStyle: 'italic',
                                      textDecorationLine: 'line-through'
                                    });   
        } else {
            $(this).prop('disabled', false)
                            $(this).parent().css({
                                color: '',
                                fontStyle: '',
                                textDecorationLine: ''
                            });
        }
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

$payment.on('change', () => {

    switch ($payment.val()) {
        case 'credit card' : 
                            $creditCard.show();
                            $paypal.hide();
                            $bitcoin.hide();
                            break;

        case 'paypal' : 
                        $creditCard.hide();
                        $paypal.show();
                        $bitcoin.hide();
                        break;

        case 'bitcoin' :
                        $creditCard.hide();
                        $paypal.hide();
                        $bitcoin.show();
                        break;

        case 'select methode' :
                        $creditCard.hide();
                        $paypal.hide();
                        $bitcoin.hide();
                        break;
    }

})


// Preventing the form default submit function with the preventDefault methode
$submit.on('click', (e) => {
    e.preventDefault();
    validating('activity');
    validateCreditCard();
})
