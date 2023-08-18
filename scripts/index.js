const menuIcon = document.querySelector('.menu-icon');
const closeMenuIcon = document.querySelector('.close-menu-icon');
const siteNavigations = document.querySelector('.site-navigations');
const loginIcon = document.querySelector('.login-icon');
const loginForm = document.querySelector('.login-form');
const closeLoginIcon = document.querySelector('.close-login-icon');
const closeTeacherInfoIcon = document.querySelector('.close-teacher-info-icon');
const closeClassInfoIcon = document.querySelector('.close-class-info-icon');
const closeWorkingHoursInfo = document.querySelector('.close-working-hours-icon');
const navLinks = document.querySelectorAll('.link');
const teachersInformation = document.querySelector('.teachers-information');
const classesInformation = document.querySelector('.classes-information');
const teachersCard = document.querySelector('.one');
const classesCard = document.querySelector('.two');
const hoursCard = document.querySelector('.three');
const teachersNames = document.querySelector('.teachers-names');
const allClasses = document.querySelector('.all-classes');
const schoolWorkingHours = document.querySelector('.working-hours-information');
const appearItems = document.querySelectorAll('.observe');
const learnMoreButton = document.querySelector('[learn-more]');
const learnLink = document.createElement('a');

function writeTeachersInformation() {
    teachersNames.innerHTML = '';

    for (var i = 0; i < teachersData.length; i++) {
        var info = document.createElement('div');

        info.innerHTML = `<div class="info">
        <img class="icon" src="${teachersData[i].image}">
        <div>
        <p>Name: <span class="bold">${teachersData[i].teacherName}</span></p>
        <p>Post: <span class="bold">${teachersData[i].post}</span></p>
        <p>Duty: <span class="bold">${teachersData[i].classes}</span></p></div>
        </div>`;

        teachersNames.appendChild(info);
    }
}

function writeClassesInformation() {
    allClasses.innerHTML = '';
    var info = document.createElement('div');
    var schoolClassesLenght = schoolClasses.length;

    for(var i = 0; i < schoolClassesLenght; i++) {
        var heading = document.createElement('h3');
        var classes = schoolClasses[i].classes;

        heading.innerText = schoolClasses[i].category;
        info.appendChild(heading);

        for (var j = 0; j < classes.length; j++) {
            var className = document.createElement('p');

            className.innerText = schoolClasses[i].classes[j];
            info.appendChild(className);
        }
    }

    allClasses.appendChild(info);
}

function horizontalCenter(content) {
    content.style.left = `${(window.innerWidth / 2) - (content.offsetWidth / 2)}px`;
}

function scaleClose(content) {
    content.style.transform = 'scale(0)';
}

function scaleOpen(content) {
    content.style.transform = 'scale(1)';
}

const p = document.querySelector('[window-width]');
p.textContent = window.innerWidth;

var appearInsersectionObserver  = new IntersectionObserver(items => {
    items.forEach(item => {
        if (item.isIntersecting) {
            item.target.classList.add('fade-in');
        } else {
            item.target.classList.remove('fade-in');
        }
    })
})

appearItems.forEach(item => { 
    appearInsersectionObserver.observe(item)
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 1160)
            siteNavigations.style.transform = "translateY(-120%)";
    })
});

window.addEventListener('resize', function() {
    p.innerText = window.innerWidth;
    horizontalCenter(teachersInformation);
    horizontalCenter(classesInformation);
    horizontalCenter(schoolWorkingHours);
    
    if (window.innerWidth >= 1160) {
      siteNavigations.style.transform = 'translateY(0)';
    } else {
      siteNavigations.style.transform = 'translateY(-120%)';
    } 
});

teachersCard.addEventListener('click', function() {
    scaleClose(schoolWorkingHours);
    scaleClose(classesInformation);
    scaleOpen(teachersInformation);
    writeTeachersInformation();
    horizontalCenter(teachersInformation);
});

classesCard.addEventListener('click', function() {
    scaleClose(teachersInformation);
    scaleClose(schoolWorkingHours);
    scaleOpen(classesInformation);
    writeClassesInformation();
    horizontalCenter(classesInformation);
});

hoursCard.addEventListener('click', function() {
    scaleClose(teachersInformation);
    scaleClose(classesInformation);
    scaleOpen(schoolWorkingHours);
    horizontalCenter(schoolWorkingHours);
});

loginIcon.addEventListener('click', function() {
    loginForm.style.transform = 'translateX(0)';
    loginForm.style.opacity = '1';
});

menuIcon.addEventListener('click', function() {
    siteNavigations.style.transform = "translateY(0)";
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateX(150%)';
});

closeMenuIcon.addEventListener('click', function() {
    siteNavigations.style.transform = "translateY(-120%)";
});

closeLoginIcon.addEventListener('click', function() {
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateX(150%)';
});

closeTeacherInfoIcon.addEventListener('click', function() {
    scaleClose(teachersInformation);
});

closeClassInfoIcon.addEventListener('click', function() {
    scaleClose(classesInformation);
});

closeWorkingHoursInfo.addEventListener('click', function() {
    scaleClose(schoolWorkingHours);
})

learnMoreButton.addEventListener('click', function() {
    learnLink.href = 'school-calendar.pdf';
    learnLink.target = '_blank';
    learnLink.click();
})
