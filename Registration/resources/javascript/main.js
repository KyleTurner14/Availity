const registrationForm = document.getElementById("registrationForm");
const registrationButton = document.getElementById("registrationFormSubmit");
const errorMessage = document.getElementById("errorMessage");
var errors = new Array();

/**
This defines the action taken when the submit button is clicked.
**/
registrationButton.addEventListener("click", (e) =>
{
  var firstNm = registrationForm.firstNm.value;
  var lastNm = registrationForm.lastNm.value;
  var npiNo = registrationForm.npiNo.value;
  var phone = registrationForm.phone.value;
  var email = registrationForm.email.value;

  e.preventDefault();

  // reset error messages
  errors.length = 0;
  errorMessage.innerHTML = '';

  // validate that the fields are not empty and are correct
  if(validateFields(firstNm, lastNm, npiNo, phone, email))
  {
    // go to success page
    location.replace("success.html");
  }
  else
  {
    errorMessage.appendChild(makeErrorArray());
    errorMessage.style.opacity = 1;
  }
});

/**
This function will validate all the fields
**/
function validateFields(firstNm, lastNm, npiNo, phone, email)
{
  isFirstNm(firstNm);
  isLastNm(lastNm);
  isNpiNo(npiNo);
  isPhoneNo(phone);
  isEmail(email);

  return errors.length == 0;
}

/**
This function will check if a string passed in is Empty
**/
function isEmpty(str)
{
  return str === "";
}

/**
This method will determine if the first name is valid.
**/
function isFirstNm(firstNm)
{
  if(isEmpty(firstNm))
  {
    errors.push("First Name is Empty.");
    console.log("First Name is Empty.");
    return false;
  }
}

/**
This method will determine if the last name is valid.
**/
function isLastNm(lastNm)
{
  if(isEmpty(lastNm))
  {
    errors.push("Last Name is Empty.");
    console.log("Last Name is Empty.");
    return false;
  }
}

/**
This method will determine if the npiNo passed in is valid
**/
function isNpiNo(npiNo)
{
  // check for Empty
  if(isEmpty(npiNo))
  {
    errors.push("NPI Number is Empty.");
    console.log("NPI Number is Empty.");
    return false;
  }
  // Check for length 10 and if it's a number
  if(npiNo.length == 10 && !isNaN(npiNo))
  {
    return true;
  }
  else
  {
    errors.push("NPI Number is Invalid.");
    console.log("NPI Number is Invalid.");
    return false;
  }
}

/**
This method will determine if the phone number passed in is valid
**/
function isPhoneNo(phone)
{
  // check for empty
  if(isEmpty(phone))
  {
    errors.push("Phone Number is Empty.");
    console.log("Phone Number is Empty.");
    return false;
  }
  // Check against regex for phone number
  if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone))
  {
    return true;
  }
  else
  {
    errors.push("Phone Number is Invalid.");
    console.log("Phone Number is Invalid.");
    return false;
  }
}

/**
This method will determine if the email passed in is valid
**/
function isEmail(email)
{
  // check for empty
  if(isEmpty(email))
  {
    errors.push("Email is Empty.");
    console.log("Email is Empty.");
    return false;
  }
  // Check against regex for email
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    return true;
  }
  else
  {
    errors.push("Email is Invalid.");
    console.log("Email is Invalid.");
    return false;
  }
}

/**
This method will add the strings to the error list on the screen
**/
function makeErrorArray()
{
  var size = errors.length;

  var list = document.createElement('ul');
  for(var i = 0; i < size; i++)
  {
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(errors[i]));
    list.appendChild(item);
  }

  return list;
}
