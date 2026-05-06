# FSJS-Unit-03-Interactive-Form

This is a practice form that allows for simple validation of the inputs without relying on HTML5 validation or an external library

v1.0
added real-time error messages for required fields
this is in addition to validation check during form submission

added custom error message if email field has partial match

v1.1
updated my regex for email validation - /[^\W]+@[^\W]+\.[^\W]+/
previous regex had * inside brackets, causing the regex to only allow for a@a.a format instead of test@example.com format