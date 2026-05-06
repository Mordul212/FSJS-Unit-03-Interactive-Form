// console.log('test');

const nameField = document.querySelector('input[type="text"]');
const otherJobRole = document.getElementById('other-job-role');
const jobRoleSelection = document.getElementById('title');
const shirtDesigns = document.getElementById('design'); // not the parent div, but the select element
const shirtColors = document.getElementById('color'); // not the parent div, but the select element
const registerFieldset = document.getElementById('activities');
let totalCost = 0; //initialize to 0
const paymentSelectionBox = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const form = document.querySelector('form');
const activityList = registerFieldset.querySelectorAll('input[type="checkbox"]'); // currently all input fields in the activites field set are checkboxes, but instructions mention checkboxes specifically, so I will be strict in selection

function errorMessageDisplayCheck(elementToAdjustClass, validData, hintLocation, e){ // need to call event since function has been moved to global scope
    if (validData) {
        document.getElementById(`${hintLocation}-hint`).style.display = 'none'; // hide error hint
        elementToAdjustClass.classList.add('valid');
        elementToAdjustClass.classList.remove('not-valid');
    } else {
        e.preventDefault(); // prevent form submission
        document.getElementById(`${hintLocation}-hint`).style.display = 'block'; // display error hint
        elementToAdjustClass.classList.add('not-valid');
        elementToAdjustClass.classList.remove('valid');
    }  
}

//initialize page
nameField.focus(); // focus on first required text field

otherJobRole.style.display = 'none'; // hide text field until needed
jobRoleSelection.addEventListener('change', () => {
    if (jobRoleSelection.value === 'other') {
        otherJobRole.style.display = 'inline-block'; //display additional text field
    } else {
        otherJobRole.style.display = 'none'; // hide additional text field
    }
});

shirtColors.setAttribute('disabled', '');
shirtDesigns.addEventListener('change', () => {
    shirtColors.removeAttribute('disabled');
    if (shirtDesigns.value === 'js puns') {
        document.querySelector('select[id="color"] option[selected]').removeAttribute('selected'); // remove previous selection IN THIS SELECTION BOX
        document.querySelector('option[data-theme="js puns"]').setAttribute('selected', '');// select first matching option
    } else if (shirtDesigns.value === 'heart js') {
        document.querySelector('select[id="color"] option[selected]').removeAttribute('selected'); // remove previous selection IN THIS SELECTION BOX
        document.querySelector('option[data-theme="heart js"]').setAttribute('selected', ''); // select first matching option
    }
    for (i = 0; i < shirtColors.length; i++) { //select has length property
        if (shirtDesigns.value === 'js puns') {
            if (shirtColors[i].dataset.theme === 'js puns') {
                shirtColors[i].removeAttribute('hidden'); // display matching options
            } else {
                shirtColors[i].setAttribute('hidden', ''); // hide non-matching options
            }
        } else if (shirtDesigns.value === 'heart js') {
            if (shirtColors[i].dataset.theme === 'heart js') {
                shirtColors[i].removeAttribute('hidden'); // display matching options
            } else {
                shirtColors[i].setAttribute('hidden', ''); // hide non-matching options
            }
        }
    }
});

registerFieldset.addEventListener('change', (e) => {
    const activityCost = e.target.dataset.cost;
    if (e.target.checked) {
        totalCost = totalCost + parseInt(activityCost); // global variable
        document.getElementById('activities-cost').firstChild.textContent = `Total: $${totalCost}`; 
    } else {
        totalCost = totalCost - parseInt(activityCost); // global variable
        document.getElementById('activities-cost').firstChild.textContent = `Total: $${totalCost}`; 
    }
});

paymentSelectionBox.firstElementChild.nextElementSibling.setAttribute('selected', ''); // initialize credit card as default payment method
paypalDiv.style.display = 'none'; //hide paypal fields when not selected
bitcoinDiv.style.display = 'none'; //hide bitcoin fields when not selected
paymentSelectionBox.addEventListener('change', (e) => {
    if (paymentSelectionBox.value === 'credit-card') {
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (paymentSelectionBox.value === 'paypal') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    } else if (paymentSelectionBox.value === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }
}); 

form.addEventListener('submit', (e) => {
    const validateText = /[^\W*]/; // simple word regex - exclude whitespace and special characters
    const validateEmail = /[^\W*]@[^\W*]\.[^\W*]/; // simple email regex
    let activityCheckedCount = 0;

    errorMessageDisplayCheck(nameField.closest('label'), validateText.test(nameField.value),'name', e); // check required name field
    errorMessageDisplayCheck(document.getElementById('email').closest('label'), validateEmail.test(document.getElementById('email').value),'email', e); // check required email field
    
    for (i=0; i < activityList.length; i++) { // how many possible checkboxes
        if (activityList[i].checked) {
            activityCheckedCount++;
        }
    }
    errorMessageDisplayCheck(registerFieldset, activityCheckedCount,'activities', e); // check required activity field has at least one activity checked
    if (paymentSelectionBox.value === 'credit-card') {
        errorMessageDisplayCheck(document.getElementById('cc-num').closest('label'), /\d{13,16}/.test(document.getElementById('cc-num').value), 'cc', e); // check if credit card number is between 13 and 16 digits
        errorMessageDisplayCheck(document.getElementById('zip').closest('label'), /\d{5}/.test(document.getElementById('zip').value), 'zip', e); // check if zip code is 5 digits
        errorMessageDisplayCheck(document.getElementById('cvv').closest('label'), /\d{3}/.test(document.getElementById('cvv').value), 'cvv', e); // check if cvv is 3 digits
    }
});

nameField.addEventListener('keyup', (e) => {
    const validateText = /[^\W*]/; // simple word regex - exclude whitespace and special characters
    errorMessageDisplayCheck(nameField.closest('label'), validateText.test(nameField.value),'name', e); // check required name field
});

document.getElementById('email').addEventListener('keyup', (e) => {
    const validateEmail = /[^\W*]@[^\W*]\.[^\W*]/; // simple email regex
    const partialEmail = /[^@]/;
    if (validateEmail.test(document.getElementById('email').value)) {
        errorMessageDisplayCheck(document.getElementById('email').closest('label'), validateEmail.test(document.getElementById('email').value),'email', e); // check required email field
        document.getElementById('email-hint').textContent = 'Email address must be formatted correctly';
    } else if (partialEmail.test(document.getElementById('email').value)) {
        errorMessageDisplayCheck(document.getElementById('email').closest('label'), false,'email', e); // fail email check
        document.getElementById('email-hint').textContent = 'Please use "test@example.com" format';
    }
    
});

registerFieldset.addEventListener('change', (e) => {
    let activityCheckedCount =0;
    for (i=0; i < activityList.length; i++) { // how many possible checkboxes
        if (activityList[i].checked) {
            activityCheckedCount++;
        }
    }
    errorMessageDisplayCheck(registerFieldset, activityCheckedCount,'activities', e); // check required activity field has at least one activity checked
});

document.getElementById('cc-num').addEventListener('keyup', (e) => {
    errorMessageDisplayCheck(document.getElementById('cc-num').closest('label'), /\d{13,16}/.test(document.getElementById('cc-num').value), 'cc', e);
});

document.getElementById('zip').addEventListener('keyup', (e) => {
    errorMessageDisplayCheck(document.getElementById('zip').closest('label'), /\d{5}/.test(document.getElementById('zip').value), 'zip', e);
});

document.getElementById('cvv').addEventListener('keyup', (e) => {
    errorMessageDisplayCheck(document.getElementById('cvv').closest('label'), /\d{3}/.test(document.getElementById('cvv').value), 'cvv', e);
});

activityList.forEach(individualActivity => {
    individualActivity.addEventListener('focus', () => {
        individualActivity.closest('label').classList.add('focus');
    })
    individualActivity.addEventListener('blur', () => {
        individualActivity.closest('label').classList.remove('focus');
    })
}); // focus on label matches the rest of the webpages focus on element - nice

//Main Conference activity does not have a time? is this supposed to be a fee to simply enter the conference which would make it required?
// document.getElementById('activities-box').firstElementChild.firstElementChild.checked = true; // initialize this checkbox as required
// document.getElementById('activities-box').firstElementChild.firstElementChild.setAttribute('disabled', ''); // disable checkbox to not allow deselection

// nice, exact same data-day-and-time for overlapping for direct comparison
activityList.forEach(individualActivity => {
    individualActivity.addEventListener('change', (e) => { // add listeners
        activityList.forEach(conflictingCheck => { // compare target of listener to each activity
            if (e.target !== conflictingCheck && e.target.dataset.dayAndTime === conflictingCheck.dataset.dayAndTime) {
                if (e.target.checked) {
                    conflictingCheck.setAttribute('disabled', '');
                    conflictingCheck.closest('label').setAttribute('disabled', '');
                } else {
                    conflictingCheck.removeAttribute('disabled');
                    conflictingCheck.closest('label').removeAttribute('disabled');
                }
            }        
        })
    })
});