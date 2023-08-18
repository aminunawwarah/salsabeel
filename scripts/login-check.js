const userNameField = document.querySelector('[username-field]');
const passowrdField = document.querySelector('[password-field]');
const loginButton = document.querySelector('[login-button]');
const externalLink = document.createElement('a');

var currentUser;
var userPassword;
var userData;
var arrayIndices;
var arrayIndex;
var recordLength = records.length;

externalLink.href = 'dashboard.html';
loginButton.addEventListener('click', function() {
    arrayIndex = 0;
    arrayIndices = [];
    currentUser = userNameField.value;
    userPassword = passowrdField.value;
    
    if (currentUser === '') {
        alert('Please enter your user name.');
        return;
    }

    for (var index = 0; index < recordLength; index++) {
        if (records[index].username === currentUser.toLowerCase()) {
            arrayIndices[arrayIndex] = index;
            arrayIndex++;
        }
    }

    userData = records.filter((record, index) => {
        return record.username === currentUser.toLowerCase();
    });

    if (userData.length === 0) {
        alert(`${currentUser} is not found in our records.`);
    } else if (userPassword === ''){
        alert('Please enter your password.');
    } else if (userData[0].password === userPassword){
        console.log(arrayIndices);
        sessionStorage.setItem('arrayData', JSON.stringify(arrayIndices));
        externalLink.click();
    } else {
        alert('The password you entered is incorrect.');
    }
}); 
