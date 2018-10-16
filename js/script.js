// Selecting form elements for further work
const $form = $('form');
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
const $errorContainer = $('form fieldset:nth-of-type(4)');
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
        icon: Icon for the message from FontAwesome
        position: DOM element after witch the label is inserted
        displayType: CSS display propety none/block
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

// Creating error message for no payment option
const $paymentError = generateLabel('<i class="fas fa-exclamation-triangle"></i>', 
                                        $payment, 
                                        'none', 
                                        'paymentError', 
                                        '#f80606');

// Helper functions to display and hide messages
const hideErrorMessage = (message) => {
    message.css('display', 'none');
}

const showErrorMessage = (message) => {
    message.css('display', 'block');
}

const showOkMessage = (message) => {
    message.css('display', 'block');
}

const hideOkMessage = (message) => {
    message.css('display', 'none');
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

// Function to validate name field
const validateName = () => {
    if ($userNameField.val().length === 0) {
        $('#nameError span').text('Field blank, please enter your name');
        showErrorMessage($nameError);
        hideOkMessage($nameOk);
        $userNameField.css('border', '2px solid #f80606');
        return false;
    } else {
        $('#nameOk span').text('Name OK');
        hideErrorMessage($nameError);
        showOkMessage($nameOk);
        $userNameField.css({border: '',
                            borderBottom: '2px solid #4bf806'});
        return true;
    }
}

// Functions to validate email address
const isValidEmail = () => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test($userEmail.val());

const validateEmail = () => {
    if ($userEmail.val().length === 0) {
        $('#emailError span').text('Field blank, please enter your email');
        hideOkMessage($emailOk);
        showErrorMessage($emailError);
        $userEmail.css('border', '2px solid #f80606');
        return false;
    }
    
    if (isValidEmail() === true) {    
        $('#emailOk span').text('Email address OK');
        hideErrorMessage($emailError);
        showOkMessage($emailOk);
        $userEmail.css({border: '',
                        borderBottom: '2px solid #4bf806'});
        return true;
    }

    if (isValidEmail() === false || $userEmail.val().length === 0) {
        $('#emailError span').text('Not a valide email address');
        hideOkMessage($emailOk);
        showErrorMessage($emailError);
        $userEmail.css('border', '2px solid #f80606');
        return false;
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
             hideErrorMessage($activityError);
         }
    })

    if (counter === 0) {
        $('#activityError span').text('No activity selected');
         showErrorMessage($activityError);
         hideOkMessage($activityOk);
         return false;
    } else {
        $('#activityOk span').text('Activity selected');
         showOkMessage($activityOk);
         hideErrorMessage($activityError);
         return true;
    }
}

// Functions to validate credit card payment
const validCard = () => {
    let cardNumberLength = $ccNum.val().length;
    let cardNumber = parseInt($ccNum.val());
    if (cardNumberLength === 0) {
        showErrorMessage($creditCardError);
        $('#creditCardError span').text('Field blank, please enter the card number');
        $ccNum.prev().css('color', '#f80606');
        $ccNum.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($creditCardOk);
        return false;        
    } else if (!isNaN(parseInt(cardNumber)) && (cardNumberLength >= 13 && cardNumberLength <= 15)) {
        showOkMessage($creditCardOk);
        $('#creditCardOk span').text('Card number OK');
        $ccNum.prev().css('color', '');
        $ccNum.css({border: '',
                    borderBottom: '2px solid #4bf806',
                    marginBottom: '1em'});
        hideErrorMessage($creditCardError);
        return true;
    } else {
        showErrorMessage($creditCardError);
        $('#creditCardError span').text('Not a valid card number');
        $ccNum.prev().css('color', '#f80606');
        $ccNum.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($creditCardOk);
        return false
    }
}

const validZip = () => {
    let zipCodeLength = $zip.val().length;
    let zipCode = parseInt($zip.val());
    if (zipCodeLength === 0) {
        showErrorMessage($zipError);
        $('#zipError span').text('Field blank, please enter the your zip number');
        $zip.prev().css('color', '#f80606');
        $zip.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($zipOk); 
        return false;       
    } else if (!isNaN(parseInt(zipCode)) && (zipCodeLength === 5)) {
        showOkMessage($zipOk);
        $('#zipOk span').text('Zip number OK');
        $zip.prev().css('color', '');
        $zip.css({border: '',
                    borderBottom: '2px solid #4bf806',
                    marginBottom: '1em'});
        hideErrorMessage($zipError);
        return true;
    } else {
        showErrorMessage($zipError);
        $('#zipError span').text('Not a valid zip number');
        $zip.prev().css('color', '#f80606');
        $zip.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($zipOk);
        return false;
    }
}

const validCvv = () => {
    let cvvNumberLength = $cvv.val().length;
    let cvvNumber = parseInt($cvv.val());
    if (cvvNumberLength === 0) {
        showErrorMessage($cvvError);
        $('#cvvError span').text('Field blank, please enter the CVV number');
        $cvv.prev().css('color', '#f80606');
        $cvv.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($cvvOk);
        return false;
    } else if (!isNaN(parseInt(cvvNumber)) && (cvvNumberLength === 3)) {
        showOkMessage($cvvOk);
        $('#cvvOk span').text('CVV number OK');
        $cvv.prev().css('color', '');
        $cvv.css({border: '',
                    borderBottom: '2px solid #4bf806',
                    marginBottom: '1em'});
        hideErrorMessage($cvvError);
        return true;
    } else {
        showErrorMessage($cvvError);
        $('#cvvError span').text('Not a valid CVV number');
        $cvv.prev().css('color', '#f80606');
        $cvv.css({
            borderBottom: '2px solid #f80606',
            marginBottom: '1em'
        });
        hideOkMessage($cvvOk);
        return false;
    }
}

// Checking that one payment option is selected or not
const validatePayment = () => {
    if ($('option[value="select_method"]').is(':selected')) {
        $('#paymentError span').text('No payment methode selected');
        showErrorMessage($paymentError);
        return false;
    } else {
        hideErrorMessage($paymentError);
        return true;
    }
}

// Event listeners
$userEmail.on('keyup blur', () => {
    isValidEmail();
    validateEmail();
});
$userNameField.on('blur keyup', () => validateName());
$ccNum.on('keyup blur', () => validCard());
$zip.on('keyup blur', () => validZip());
$cvv.on('keyup blur', () => validCvv());

// Disable the activity that is in the same time as the choosen one
/*
This function cuts out the day and time from the selected checkbox parent labels text and puts it in an array
if any other option has the same day and time in his text then disables it
*/
$activities.on('change', function() {
    //Cutting out the date and time from the labels text    
    let dayAndHour = $(this).parent().text().slice($(this).parent().text().indexOf('—') + 2, $(this).parent().text().indexOf('$'));
    $('#total').show();
    hideErrorMessage($activityError);

    if (!activityTime.includes(dayAndHour)) {
        activityTime.push(dayAndHour);      
    } else if ($(this).is(':checked') === false && activityTime.includes(dayAndHour) === true) {
        activityTime.splice(activityTime.indexOf(dayAndHour), 1);
    }
    // Cutting out the price from the end of the labels text
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

// Listening to change event and if the other option is selected the textfield appears to enter job role
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
    validateColors(); 
});

// Payment methodes, shows just the selected option
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
        case 'select_method' :
                        $creditCard.hide();
                        $paypal.hide();
                        $bitcoin.hide();
                        break;
    }

    if (!$('option[value="credit card"]').is(':selected')) {
        hideErrorMessage($creditCardError);
        hideErrorMessage($zipError);
        hideErrorMessage($cvvError);
        hideOkMessage($creditCardOk);
        hideOkMessage($zipOk);
        hideOkMessage($cvvOk);
        $ccNum.css('border', '');
        $zip.css('border', '');
        $cvv.css('border', '');
    }

    if (!$('option[value="select_method"]').is(':selected')) {
        hideErrorMessage($paymentError);
    }
})

// Validating the required fields and if everything is ok the form is submited,
// else preventDefault() methode is called
$submit.on('click', (e) => {
    let validName = validateName();
    let valiEmail = validateEmail();
    let validActivity = validateActivity();
    let validPayment = validatePayment();
    let validCCNumber = false;
    let validateZip = false;
    let validateCvv = false;

    if ($('option[value="credit card"]').is(':selected')) {
        validCCNumber = validCard();
        validateZip = validZip();
        validateCvv = validCvv();
    }

    if ((validName && valiEmail && validActivity && validPayment) ||
    (validName && valiEmail && validActivity && validCCNumber && validateZip && validateCvv)) {
        $form.submit();
    } else {
        e.preventDefault(); 
    }
})
