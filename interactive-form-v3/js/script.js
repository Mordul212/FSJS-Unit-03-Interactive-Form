console.log('test');

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

paymentSelectionBox.firstElementChild.nextElementSibling.setAttribute('selected', '');
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';
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