const leftSideItems = document.querySelectorAll('.item');
const leftSideSection = document.querySelector('.left-side');
const paymentSection = document.querySelector('.payment');
const menuIcon = document.querySelector('.menu-icon');
const mainContent = document.querySelector('.main-content');
const closeLeftSideIcon = document.querySelector('.close-left-side-icon'); 
const userName = document.querySelector('.welcome-user');
const studentsInfoSection = document.querySelector('.student-information');
const pageBody = document.querySelector('body');
const closeIcons = document.querySelectorAll('[close-section]');
const sections = document.querySelectorAll('[section]');
const downloadCalendar = document.querySelector('[download-calendar]');

var indices;

try {
    indices = JSON.parse(sessionStorage.arrayData);
} catch(e) {
    
}

if (!indices) {
    pageBody.style.fontFamily = 'Nunito';
    pageBody.style.fontSize = '2rem';
    pageBody.style.padding = '15rem 7rem';
    pageBody.innerHTML = `You're not logged in. Please, go to the <a href="index.html">homepage</a> and login with your account details.`;
} else {
    userName.innerText += ` ${records[indices[0]].username.toUpperCase()}`;

    var showPayment = false;

    function displayLeftAbsoluteItem(item) {
        item.style.left = '0';
    }

    function hideLeftAbsoluteItem(item) {
        item.style.left = '-200%';
    }

    function createStudentInformation(indices) {
        var heading = document.createElement('h2');

        studentsInfoSection.innerHTML = '';
        studentsInfoSection.appendChild(heading);
        heading.setAttribute('class', 'subhead');
        heading.innerText = 'Student Information';

        for (var index = 0; index < indices.length; index++) {
            var div = document.createElement('div');
            var studentName = document.createElement('p');
            var studentClass = document.createElement('p');
            var admissionDate = document.createElement('p');
            var offenses = document.createElement('p');

            studentName.innerHTML = `Student name: <span class="bold">
                                    ${records[indices[index]].studentData.studentName}`;
            studentClass.innerHTML = `Student class: <span class="bold">
                                    ${records[indices[index]].studentData.studentClass}`;
            admissionDate.innerHTML = `Admission date: <span class="bold">
                                    ${records[indices[index]].studentData.admissionDate}`;
            offenses.innerHTML = `Offenses: <span class="bold">
                                    ${records[indices[index]].studentData.offenses}`;
            div.appendChild(studentName);
            div.appendChild(studentClass);
            div.appendChild(admissionDate);
            div.appendChild(offenses);
            studentsInfoSection.appendChild(div);
        }
    }

    function showPaymentStatus() {
        if (showPayment) return;
        var section = document.createElement('div');
        var heading = document.createElement('h2');

        heading.setAttribute('class', 'subhead');
        heading.innerText = 'Payment Status';
        section.appendChild(heading);

        for (var index = 0; index < indices.length; index++) {
            var status = document.createElement('p')
            if (records[indices[index]].studentData.payment === 'Paid') {
                status.innerText = `The payment for ${records[indices[index]].studentData.studentName} is complete.`;
            } else {
                status.innerText = `Please pay the school fees of ${records[indices[index]].studentData.studentName}.`;
            }
            section.appendChild(status);
        }

        paymentSection.appendChild(section);
        showPayment = true;
    }

    function showSection(section) {
        section.style.display = 'block';
    }

    createStudentInformation(indices);

    downloadCalendar.addEventListener('click', function() {
        var link = document.createElement('a');
        link.href = 'school-calendar.pdf';
        link.target = '_blank';
        link.download = 'Calendar.pdf';
        link.click();
    });

    menuIcon.addEventListener('click', function() {
        displayLeftAbsoluteItem(leftSideSection);
    });

    closeLeftSideIcon.addEventListener('click', function() {
        hideLeftAbsoluteItem(leftSideSection);
    });

    closeIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            sections[index].style = 'display: none';
        })
    });

    leftSideItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            switch (index) {
                case 0: 
                    showSection(sections[index]);
                    break;
                case 1:
                    showSection(sections[index]);
                    break;
                case 2:
                    showPaymentStatus();
                    showSection(sections[index]);
                    break;
                case 3:
                    showSection(sections[index]);
                    break;
                case 4:
                    showSection(sections[index]);
                    break;
                case 5:
                    showSection(sections[index]);
                    break;
                case 6:
                    showSection(sections[index]);
                    break;
            }

            hideLeftAbsoluteItem(leftSideSection);
        })
    });
 }